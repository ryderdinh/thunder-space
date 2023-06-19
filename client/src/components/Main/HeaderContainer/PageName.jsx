import { LayoutGroup, motion } from 'framer-motion'

export const PageName = ({ name }) => {
  return (
    <LayoutGroup id='header-1'>
      <motion.p className='name' layoutId='page-title'>
        {name}
      </motion.p>
    </LayoutGroup>
  )
}
