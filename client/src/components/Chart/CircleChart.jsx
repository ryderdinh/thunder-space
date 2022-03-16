import { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'

function CircleChart({ label, value }) {
  const [options, setOptions] = useState({
    chart: {
      width: '100%',
      height: '100%',
      type: 'radialBar'
    },
    colors: ['#2c9c6a'],
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 225,
        hollow: {
          size: '80%'
        },
        track: {
          background: '',
          strokeWidth: '100%',
          margin: 0
        },
        dataLabels: {
          showOn: 'always',
          name: {
            color: '#fff'
          },
          value: {
            formatter: function (val) {
              return val + '%'
            },
            color: '#d2d2d9'
          },
          style: {
            fontFamily: "'Be Vietnam Pro', sans-serif"
          }
        }
      }
    },
    stroke: {
      lineCap: 'round'
    },
    labels: ['aaa']
  })
  const [series, setSeries] = useState([0])

  useEffect(() => {
    setSeries([(value / 8) * 100 > 100 ? 100 : (value / 8) * 100])
    setOptions((prevData) => ({
      ...prevData,
      labels: [label]
    }))
  }, [value, label])

  return (
    <Chart
      options={options}
      series={series}
      type='radialBar'
      width={'100%'}
      height={'100%'}
    />
  )
}

export default CircleChart
