import { motion } from 'framer-motion'
import Checkin from './components/Checkin'
import CheckinHistory from './components/CheckinHistory'

const CheckinFeature = ({
  variants,
  date,
  allowCheckin,
  totalHour,
  history
}) => {
  return (
    <motion.div
      className='panel divide-y divide-neutral-700/50 rounded'
      style={{ padding: '0' }}
      variants={variants}
      initial='hidden'
      animate='visible'
      exit='exit'
    >
      <Checkin date={date} allowCheckin={allowCheckin} totalHour={totalHour} />
      <CheckinHistory data={history} />
    </motion.div>
  )
}

export default CheckinFeature
