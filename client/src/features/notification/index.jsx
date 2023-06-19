import {
  actGetNotification,
  setNotificationsRead,
  setNotificationsReadAll
} from 'actions'

import queryString from 'query-string'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

import { TagIcon } from '@heroicons/react/24/solid'
import {
  NotificationAction,
  NotificationList,
  NotificationTab
} from './components'

const tags = [
  {
    type: 'all',
    title: 'All'
  },
  {
    type: 'unread',
    title: 'Unread'
  }
]

const Notification = () => {
  const { _data: data } = useSelector((state) => state._notification)
  const dispatch = useDispatch()

  //? Connect router
  const location = useLocation()

  //? State
  const [currentTag, setCurrentTag] = useState(
    queryString.parse(location.search)?.tag || tags[0].type
  )

  const setRead = (id, all = false) => {
    !all
      ? dispatch(setNotificationsRead(id))
      : dispatch(setNotificationsReadAll())
  }

  useEffect(() => {
    const onSuccess = (data) => {
      console.log(data)
    }

    const onError = (error) => {
      console.log(error)
    }
    dispatch(actGetNotification(null, onSuccess, onError))
  }, [dispatch])

  useEffect(() => {
    setCurrentTag(queryString.parse(location.search)?.tag || tags[0].type)
  }, [location.search])

  return (
    <div className='grid w-full grid-cols-5 gap-5'>
      <div className='col-span-1 hidden md:block'>
        <div className='space-y-3'>
          <div className='flex items-center space-x-2 text-neutral-50/80'>
            <TagIcon className='w-4' />
            <p className='text-xs font-bold'>Tags</p>
          </div>
          <NotificationTab tags={tags} currentTag={currentTag} />
        </div>
      </div>
      <div className='col-span-5 space-y-4 md:col-span-4'>
        <div className='flex items-center justify-end'>
          {/* <NotificationType
            tags={tags}
            currentTag={currentTag}
            setCurrentTag={setCurrentTag}
          /> */}

          <NotificationAction setRead={setRead} />
        </div>
        <div className='rounded-lg border-2 border-[#282828] bg-[#1f1f1f]'>
          <NotificationList data={data} setRead={setRead} />
        </div>
      </div>
    </div>
  )
}

export default Notification

// <ul ref={parent}>
//     {data.map((noti) => (
//       <NotificationItem key={noti.id} data={noti} />
//     ))}

//      <button
//       className='rounded-full bg-neutral-600/40 px-2.5 py-1 text-neutral-50/75'
//       onClick={() => {
//         setData([
//           ...data,
//           {
//             id: data.length + 1,
//             title: 'Issue change',
//             content:
//               "Pham Huu Thang has changed the issue's status to In Progress",
//             time: 1657853474056,
//             read: false,
//             type: 'change-status',
//             tab: 'issue',
//             data: {
//               iid: '1',
//               pid: '2'
//             }
//           }
//         ])
//       }}
//     >
//       +
//     </button>
//     <form
//       onSubmit={(e) => {
//         e.preventDefault()
//         let newData = data.filter((noti) => noti.id !== Number(value))

//         setData(newData)
//       }}
//     >
//       <input type='number' placeholder='enter id' {...bind} />
//       <button
//         type='submit'
//         className='rounded-md bg-neutral-600/40 px-2.5 py-1 text-neutral-50/75'
//       >
//         remove
//       </button>
//     </form> */
//   </ul>
