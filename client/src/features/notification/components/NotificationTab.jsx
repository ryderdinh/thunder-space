import queryString from 'query-string'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const tag = [
  {
    type: 'all',
    title: 'All'
  },
  {
    type: 'unread',
    title: 'Unread'
  }
]

const NotificationTab = () => {
  //? Connect router
  const location = useLocation()

  //? State
  const [currentTag, setCurrentTag] = useState(
    queryString.parse(location.search)?.tag || tag[0].type
  )

  useEffect(() => {
    setCurrentTag(queryString.parse(location.search)?.tag || tag[0].type)
  }, [location.search])

  return (
    <ul className='space-y-1'>
      {tag.map((item) => (
        <li
          key={item.type}
          className={`max-w-[220px] rounded-md p-2 transition-all
          duration-100 ease-in-out hover:bg-neutral-600
          hover:text-neutral-200 ${
            item.type === currentTag
              ? 'bg-neutral-600 text-neutral-200'
              : 'bg-transparent text-neutral-500'
          }`}
        >
          <Link
            to={(location) => ({
              ...location,
              search: `tag=${item.type}`
            })}
          >
            <p className='text-sm text-neutral-300'>{item.title}</p>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default NotificationTab
