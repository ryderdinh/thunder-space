import { actSendLocationToServer } from 'actions'
import { OutApisContext } from 'context/OutApisContext'
import { motion } from 'framer-motion'
import { useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { errorToast } from 'utilities/toast'
import Checkin from './Checkin'
import CheckinHistory from './CheckinHistory'

export default function TimeKeeping({ variants }) {
  const {
    location: { latitude, longitude, error }
  } = useContext(OutApisContext)
  const { _count: count, _status: status } = useSelector(
    (state) => state._timeOfAttendance
  )

  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useDispatch()

  const getLocation = () => {
    const onSuccess = () => {
      setIsLoading(false)
    }

    const onError = () => {
      setIsLoading(false)
    }

    if (!error) {
      setIsLoading(true)
      dispatch(
        actSendLocationToServer([latitude, longitude], onSuccess, onError)
      )
    } else errorToast(error)
  }

  return (
    // <motion.div
    //   className='time-keeping'
    //   variants={variants}
    //   initial='hidden'
    //   animate='visible'
    //   exit='exit'
    // >
    //   <div className='time-keeping_hour'>
    //     <CircleChart label={`${count}/8 hour`} value={count} />
    //   </div>
    //   <div className='time-keeping_label'>
    //     <p className='status-realtime'>
    //       {status === false
    //         ? 'No attendance'
    //         : count < 8
    //         ? 'Not enough time'
    //         : 'Enough time'}
    //     </p>
    //     <p className='status-hour'></p>
    //   </div>
    //   <ButtonSuccess loading={isLoading} onClick={getLocation}>
    //     Check
    //   </ButtonSuccess>
    // </motion.div>
    <motion.div
      className='panel divide-y divide-neutral-700/50 rounded'
      style={{ padding: 0 }}
      variants={variants}
      initial='hidden'
      animate='visible'
      exit='exit'
    >
      <Checkin />
      <CheckinHistory />
    </motion.div>
  )
}
