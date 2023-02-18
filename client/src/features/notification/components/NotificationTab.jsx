import { Link } from 'react-router-dom'

const NotificationTab = ({ tags, currentTag }) => {
  return (
    <ul className='space-y-1'>
      {tags.map((tag) => (
        <li
          key={tag.type}
          className={`max-w-[220px] rounded-md transition-all
          duration-100 ease-in-out hover:bg-neutral-600
          hover:text-neutral-200 ${
            tag.type === currentTag
              ? 'bg-neutral-600 text-neutral-200'
              : 'bg-transparent text-neutral-500'
          }`}
        >
          <Link
            to={(location) => ({
              ...location,
              search: `tag=${tag.type}`
            })}
          >
            <p className='p-2 text-sm text-neutral-300'>{tag.title}</p>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default NotificationTab
