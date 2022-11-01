import { actFetchEvents } from 'actions'
import { IntroduceContent } from 'components/View'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import EventTable from './components/EventTable'

const EventFeature = ({ variants }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(actFetchEvents())
  }, [dispatch])

  return (
    <motion.div
      className='block gap-5 lg:flex lg:justify-between'
      variants={variants}
      initial='hidden'
      animate='visible'
      exit='exit'
    >
      <div className='w-full max-w-full lg:w-1/3 lg:max-w-[250px]'>
        <IntroduceContent
          title={'Event'}
          description={'List of upcoming events'}
        />
      </div>
      <div className='w-full lg:w-2/3'>
        <EventTable />
      </div>
    </motion.div>
  )
}

export default EventFeature
