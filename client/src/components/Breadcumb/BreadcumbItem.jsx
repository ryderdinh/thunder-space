import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export const BreadcumbItem = ({ link, name, variants }) => {
  return (
    <Link to={link}>
      <motion.p
        className='rounded-md bg-neutral-800 p-2 text-xs font-semibold 
        leading-3 text-neutral-50 transition-all duration-300 ease-in-out
        hover:bg-neutral-700 focus:ring-0 md:text-base'
        variants={variants}
        initial='initial'
        animate='enter'
        exit='exit'
      >
        {name}
      </motion.p>
    </Link>
  )
}
