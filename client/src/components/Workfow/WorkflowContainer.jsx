import 'assets/css/card.css'
import ProgressLightStyle from 'components/Progress-bar/progress-light-style'
import { useEffect, useState } from 'react'

function WorkflowContainer() {
  //? Create State
  const [cards] = useState([
    {
      title: 'Your todos',
      max: 20,
      now: 12,
      data: [
        {
          name: 'Total',
          value: 20
        },
        {
          name: 'Doing',
          value: 12
        }
      ]
    },
    {
      title: 'Your projects',
      max: 25,
      now: 10,
      data: [
        {
          name: 'Total',
          value: 40
        },
        {
          name: 'Assigned to you',
          value: 25
        },
        {
          name: 'Doing',
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
      <div className='row view-row flex-wrap gap-0'>
        {cards.map((card, i) => (
          <div className='min-w-full basis-0 md:min-w-0 md:grow'>
            <div className='card !w-full' key={i}>
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
          </div>
        ))}
      </div>
    </div>
  )
}

export default WorkflowContainer
