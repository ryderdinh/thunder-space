import Logo from 'components/Icon/Logo'
import { LayoutContext } from 'context/LayoutContext'
import { motion, useAnimation } from 'framer-motion'
import { useContext, useEffect, useState } from 'react'

const Loading = ({ load }) => {
  const { setLoading } = useContext(LayoutContext)

  const circleTextControl = useAnimation()
  const [step, setStep] = useState(0)

  useEffect(() => {
    const timeOut0 = setTimeout(() => {
      setStep(1)
    }, 500)

    const timeOut1 = setTimeout(() => {
      setStep(2)
    }, 1000)

    return () => {
      clearInterval(timeOut0)
      clearInterval(timeOut1)
    }
  }, [])

  useEffect(() => {
    const animate =
      step === 0
        ? {
            scale: 1,
            opacity: 1,
            transition: {
              duration: 0.5
            }
          }
        : step === 1
        ? {
            rotate: 360,
            opacity: 1,
            transition: {
              repeat: Infinity,
              ease: 'linear',
              duration: 5
            }
          }
        : {
            rotate: 360,
            scale: 10,
            opacity: 0,
            transition: {
              repeat: Infinity,
              ease: 'linear',
              duration: 0.5
            }
          }
    circleTextControl.start(animate)
  }, [circleTextControl, step])

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setLoading(false)
    }, 1200)

    return () => {
      clearTimeout(timeOut)
    }
  }, [setLoading])

  return (
    <div className='relative h-screen text-center' key={'big-load'}>
      <svg
        className='pointer-events-none will-change-[transform]'
        width='100%'
        height='100%'
        viewBox='0 0 1400 1400'
      >
        <def>
          <path
            id='circle-4'
            d='M567.5,700.5A133,133 0 1 1833.5,700.5A133,133 0 1 1567.5,700.5'
          />
        </def>
        <motion.text
          className='circles__text circles__text--4 origin-[50%_50%
          fill-neutral-300 font-bold'
          initial={{ scale: 1.9, opacity: 0 }}
          animate={circleTextControl}
          exit={{
            rotate: 360,
            scale: 10,
            opacity: 0,
            transition: {
              repeat: Infinity,
              duration: 0.5
            }
          }}
        >
          <textPath
            className='circles__text-path uppercase'
            xlinkHref='#circle-4'
            ariaLabel=''
            textLength='836'
          >
            thunderspace&nbsp;
          </textPath>
        </motion.text>
      </svg>
      <Logo
        className={'absolute inset-0 left-0 right-0 m-auto aspect-square w-20'}
      />
    </div>
  )
}

export default Loading
