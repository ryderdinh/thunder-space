import 'assets/css/card.css'
import ProgressLightStyle from 'components/Progress-bar/progress-light-style'
import { useEffect, useState } from 'react'

function WorkflowContainer() {
  //? Create State
  const [cards] = useState([
    {
      title: 'Công việc của bạn',
      max: 20,
      now: 12,
      data: [
        {
          name: 'Công việc',
          value: 20
        },
        {
          name: 'Đang làm',
          value: 12
        }
      ]
    },
    {
      title: 'Dự án của bạn',
      max: 25,
      now: 10,
      data: [
        {
          name: 'Dự án',
          value: 20
        },
        {
          name: 'Công việc',
          value: 25
        },
        {
          name: 'Đang làm',
          value: 10
        }
      ]
    }
  ])
  //? Create effect
  useEffect(() => {
    document.title = `Tổng quan`
  }, [])

  return (
    <div className='wf-container -wf-card'>
      <div className='row'>
        {cards.map((card, i) => (
          <div className='card' key={i}>
            <div className='card-body'>
              <div className='card-row'>
                <h3 className='card-title'>{card.title}</h3>
              </div>

              <div className='card-row'>
                <ProgressLightStyle now={(card.now / card.max) * 100} />
              </div>

              <div className='card-row'>
                {card.data.map((item, j) => (
                  <div className='card-col' key={j}>
                    <div className='card-name'>{item.name}</div>
                    <h4 className='card-value'>{item.value}</h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WorkflowContainer
