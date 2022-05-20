import { Link } from 'react-router-dom'

export const BreadcumbItem = ({ link, name }) => {
  return (
    <Link to={link}>
      <p
        className='rounded-md bg-neutral-800 p-2 text-xs font-semibold 
        leading-3 text-neutral-50 transition-all duration-300 ease-in-out
        hover:bg-neutral-700 focus:ring-0 md:text-base'
      >
        {name}
      </p>
    </Link>
  )
}
