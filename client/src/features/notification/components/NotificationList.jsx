import { useAutoAnimate } from '@formkit/auto-animate/react'
import queryString from 'query-string'
import { useLocation } from 'react-router-dom'
import NotificationItem from './NotificationItem'

const NotificationList = ({ data, setRead }) => {
  //? Connect router
  const location = useLocation()

  const [parent] = useAutoAnimate()

  const sortByTime = () => {
    return data?.sort((a, b) => b.time - a.time) || []
  }

  const checkTag = () => {
    const tag = queryString.parse(location.search)?.tag || 'all'

    return tag === 'all'
      ? sortByTime()
      : sortByTime().filter((noti) => noti.read === false)
  }

  return (
    <ul ref={parent} className='divide-y-2 divide-[#282828] py-2'>
      {checkTag()?.map((noti) => (
        <NotificationItem key={noti._id} data={noti} setRead={setRead} />
      ))}

      {checkTag().length === 0 && (
        <li className='py-2'>
          <p className='text-center text-xs font-light text-neutral-500'>
            No notifictions available.
          </p>
        </li>
      )}
    </ul>
  )
}

export default NotificationList
