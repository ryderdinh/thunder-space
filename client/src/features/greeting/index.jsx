import { MapPinIcon } from '@heroicons/react/24/outline'
import { OutApisContext } from 'context/OutApisContext'
import { motion } from 'framer-motion'
import { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import RFDate from 'utilities/date'
import { getSessionName } from './services/getSessionName'
import { getFahrenheit } from './services/getTemp'

const getNow = () => new RFDate(new Date().getTime()).time

const GreetingFeature = ({ variants }) => {
  const { region, temp, getInfoLocation } = useContext(OutApisContext)

  const {
    _data: { name }
  } = useSelector((state) => state._staffInfomation)

  const [now, setNow] = useState(getNow())
  const [sesionName, setSesionName] = useState(getSessionName())

  console.log(sesionName)

  useEffect(() => {
    let a = setInterval(() => {
      setNow(getNow())
    }, 1000)

    return () => {
      clearInterval(a)
    }
  }, [])

  useEffect(() => {
    getInfoLocation()
  }, [getInfoLocation])

  useEffect(() => {
    const interval = setInterval(() => {
      setSesionName(getSessionName())
    }, 10000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <motion.div
      className=''
      variants={variants}
      initial='hidden'
      animate='visible'
      exit='exit'
    >
      <h3 className='text-lg font-bold text-neutral-50 md:text-3xl lg:text-4xl'>
        {sesionName}, <span className='text-emerald-500'>{name}</span>
      </h3>
      <p className='mt-3 mb-2 flex items-center text-sm text-neutral-300 md:text-[18px]'>
        {now},{' '}
        {region && (
          <div className='flex items-center'>
            <MapPinIcon className='w-5 text-emerald-500' />
            {region}
          </div>
        )}
      </p>
      <p className='text-sm text-neutral-300 md:text-[18px]'>
        Today's temperature:{' '}
        <span
          className={`${
            temp > 16
              ? 'text-emerald-500'
              : temp > 27
              ? 'text-yellow-500'
              : temp > 37
              ? 'text-red-500'
              : 'text-blue-500'
          } font-medium`}
        >
          {temp} °C / {getFahrenheit(temp).toFixed(1)} °F
        </span>
      </p>
    </motion.div>
  )
}

export default GreetingFeature
