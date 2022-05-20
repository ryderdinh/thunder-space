import LoadingCard from 'components/Loading/LoadingCard'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'

export default function Event({ variants }) {
  const {
    data: events,
    isLoading
    // error
  } = useSelector((state) => state._events)

  return (
    <motion.div
      className='view_item panel event'
      variants={variants}
      initial='hidden'
      animate='visible'
      exit='exit'
    >
      {isLoading && <LoadingCard text={'Loading event...'} />}

      {!isLoading && !events?.length && <LoadingCard text={'No data'} />}

      {!isLoading &&
        events?.length > 0 &&
        events.map((value) => (
          <EventItem key={value[0].date} dataEvent={value} />
        ))}
    </motion.div>
  )
}

function EventItem({ dataEvent }) {
  // const dispatch = useDispatch()

  return (
    <div className='event_item'>
      <div className='event-time'>{dataEvent[0].date}</div>
      <div className='event-detail'>
        {dataEvent.map((value, index) => (
          <div key={index} className='detail_item' onClick={() => {}}>
            <div className='detail-name'>{value.name}</div>
            <div className='detail-data'>Chi tiết</div>
          </div>
        ))}
      </div>
    </div>
  )
}
