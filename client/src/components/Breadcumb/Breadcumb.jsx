import { motion } from 'framer-motion'
import { Fragment } from 'react'
import { BreadcumbItem } from './BreadcumbItem'

const transition = { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96], delay: 0 }
const variants = (delay) => ({
  initial: { scale: 0.8, opacity: 0 },
  enter: { scale: 1, opacity: 1, transition: { ...transition, delay } },
  exit: {
    scale: 0.7,
    opacity: 0,
    transition: { duration: 1, ...transition }
  }
})

export const Breadcumb = ({ list }) => {
  return (
    <div className='flex items-center gap-2'>
      {list.map((item, index) =>
        index === list.length - 1 ? (
          <BreadcumbItem
            key={index}
            link={item.link}
            name={item.name}
            variants={variants(0.1)}
          />
        ) : (
          <Fragment key={index}>
            <BreadcumbItem link={item.link} name={item.name} />
            <motion.p
              className='text-xs text-neutral-50 md:text-base'
              variants={variants(0.1)}
              initial='initial'
              animate='enter'
              exit='exit'
            >
              /
            </motion.p>
          </Fragment>
        )
      )}
    </div>
  )
}
