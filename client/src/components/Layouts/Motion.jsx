import { motion } from 'framer-motion'

const Motion = ({ children, variants, className }) => {
  return (
    <motion.div
      className={`w-full ${className}`}
      variants={variants}
      initial='hidden'
      animate='visible'
      exit='exit'
    >
      {children}
    </motion.div>
  )
}

export default Motion
