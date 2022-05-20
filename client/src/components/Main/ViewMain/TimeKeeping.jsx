import CircleChart from 'components/Chart/CircleChart'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import BtnTimeKeeping from '../../Button/BtnTimeKeeping'

export default function TimeKeeping({ variants }) {
  const { _count: count, _status: status } = useSelector(
    (state) => state._timeOfAttendance
  )

  return (
    <motion.div
      className='view_item panel time-keeping'
      variants={variants}
      initial='hidden'
      animate='visible'
      exit='exit'
    >
      <div className='time-keeping_hour'>
        <CircleChart label={`${count}/8 hour`} value={count} />
      </div>
      <div className='time-keeping_label'>
        <p className='status-realtime'>
          {status === false
            ? 'No attendance'
            : count < 8.5
            ? 'Not enough time'
            : 'Enough time'}
        </p>
        <p className='status-hour'></p>
      </div>
      <BtnTimeKeeping className={'btn time-keeping_btn'} content={'Check'} />
    </motion.div>
  )
}
