import { setPopup } from 'actions'
import LoadingCard from 'components/Loading/LoadingCard'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'

export default function Event({ variants }) {
  const events = useSelector((state) => state._events._events)

  return (
    <motion.div
      className='view_item panel event'
      variants={variants}
      initial='hidden'
      animate='visible'
      exit='exit'
    >
      {!events.length ? (
        <LoadingCard text={'Đang tải sự kiện...'} />
      ) : (
        events.map((value) => (
          <EventItem key={value[0].date} dataEvent={value} />
        ))
      )}
    </motion.div>
  )
}

function EventItem({ dataEvent }) {
  const dispatch = useDispatch()

  return (
    <div className='event_item'>
      <div className='event-time'>{dataEvent[0].date}</div>
      <div className='event-detail'>
        {dataEvent.map((value, index) => (
          <div
            key={index}
            className='detail_item'
            onClick={() => {
              dispatch(
                setPopup({
                  isShow: true,
                  typePopup: 'event-popup',
                  dataPopup: value
                })
              )
            }}
          >
            <div className='detail-name'>{value.name}</div>
            <div className='detail-data'>Chi tiết</div>
          </div>
        ))}
      </div>
    </div>
  )
}
