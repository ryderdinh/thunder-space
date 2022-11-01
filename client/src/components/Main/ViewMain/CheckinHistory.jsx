import { useAutoAnimate } from '@formkit/auto-animate/react'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import RFDate from 'utilities/date'

const convertTime = (time) => {
  const date = new Date(time)
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

export default function CheckinHistory({ variants }) {
  const { _list: timeOfAttendance } = useSelector(
    (state) => state._timeOfAttendance
  )

  const [parent] = useAutoAnimate()

  return (
    <motion.div
      className='divide-y divide-neutral-700/50'
      variants={variants}
      initial='hidden'
      animate='visible'
      exit='exit'
    >
      <div className='px-6 py-4 text-base font-bold text-neutral-50'>
        <p>Check-in history</p>
      </div>

      <div className='flex items-center gap-1 px-6 py-4 text-base font-medium text-neutral-200'>
        <p className='w-[30%] text-xs md:text-sm'>Time</p>
        <p className='w-[70%] text-xs md:text-sm'>
          Range (away from the company)
        </p>
      </div>

      <div className='h-max w-full py-1 pr-1'>
        <div
          className='custom-scrollbar max-h-[210px] overflow-y-scroll'
          ref={parent}
        >
          {!timeOfAttendance?.length && (
            <div className='py-12'>
              <p className='text-center text-xs text-neutral-300 md:text-sm'>
                No data
              </p>
            </div>
          )}

          {timeOfAttendance.map((value) => (
            <HistoryItem
              key={`${value.time}`}
              time={value.time}
              rangeMetter={value.distance}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

const HistoryItem = ({ time, rangeMetter }) => {
  return (
    <div className='flex items-center gap-1 px-6 py-4 text-base text-neutral-300'>
      <p className='w-[30%] text-xs md:text-sm'>{new RFDate(time).time}</p>
      <p className='w-[70%] text-xs md:text-sm'>
        {rangeMetter.toLocaleString('en-US')} metter
      </p>
    </div>
  )
}
