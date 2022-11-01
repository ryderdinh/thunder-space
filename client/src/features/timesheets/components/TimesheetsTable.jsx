import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Center, Panel } from 'components/Layouts'

const dayLabel = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const TimesheetsTable = ({ days, day, month, setDay }) => {
  const [tbRef] = useAutoAnimate()

  const isToday = (value) =>
    month === new Date().getMonth() + 1 && value === new Date().getDate()

  const isSelected = (value) => day === value

  const chooseDate = (day) => {
    day > 0 && setDay(day)
  }

  return (
    <Panel>
      <div
        className='grid grid-cols-7 gap-y-2 overflow-hidden pb-1'
        ref={tbRef}
      >
        {dayLabel.map((item) => (
          <Center
            key={item}
            className='border-b border-b-neutral-700/50 py-3 font-bold 
            text-neutral-200'
          >
            {item}
          </Center>
        ))}

        {days.map((item) => (
          <Center
            key={item}
            className={`mx-1 select-none rounded border border-transparent
            py-5 text-neutral-300 transition-all duration-200
            ${item > 0 ? 'cursor-pointer hover:bg-neutral-600' : ''} 
            ${isToday(item) ? 'border-dashed border-neutral-600' : ''}
            ${isSelected(item) ? 'bg-neutral-600' : ''}`}
            onClick={() => chooseDate(item)}
          >
            {item > 0 ? item : ' '}
          </Center>
        ))}
      </div>
    </Panel>
  )
}

export default TimesheetsTable
