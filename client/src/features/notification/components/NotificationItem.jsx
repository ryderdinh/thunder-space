import { BellIcon } from '@heroicons/react/solid'
import ButtonNormal from 'components/Button/ButtonNormal'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import detectNotification from '../services/detectNotification'

const NotificationItem = ({ data, setRead }) => {
  const [icon, setIcon] = useState(<BellIcon className='w-5' />)
  const [link, setLink] = useState(null)
  const [mouseEnter, setMouseEnter] = useState(false)

  const history = useHistory()

  const onClick = () => {
    if (link) {
      history.push(link, data)
    }
  }

  const onMouseEnter = () => {
    setMouseEnter(true)
  }

  const onMouseLeave = () => {
    setMouseEnter(false)
  }

  useEffect(() => {
    const { icon, link } = detectNotification(data.type, data.data)

    setIcon(icon)
    setLink(link)
  }, [data.data, data.type])

  return (
    <li
      className={`${
        data?.read
          ? ''
          : 'bg-neutral-700/50 before:absolute before:left-0 before:top-0 before:h-full before:w-[2px] before:bg-emerald-600'
      }
      relative flex w-full cursor-pointer items-center justify-between px-6 py-3
      text-neutral-50/80
      hover:bg-neutral-700`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className='flex items-center space-x-2'>
        {icon}
        <div className=''>
          <p className='text-xs font-bold line-clamp-1'>{data.title}</p>
          <p className='text-sm line-clamp-1'>{data.content}</p>
        </div>
      </div>

      {(data?.read || !mouseEnter) && (
        <p className='ml-2 text-right text-xs'>{moment(data.time).fromNow()}</p>
      )}

      {!data?.read && mouseEnter && (
        <ButtonNormal
          onClick={(e) => {
            e.stopPropagation()
            setRead(data.id)
          }}
        >
          Read
        </ButtonNormal>
      )}
    </li>
  )
}

export default NotificationItem
