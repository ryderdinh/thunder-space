import Footer from 'components/Landing/Footer'
import HeroSection from 'components/Landing/HeroSection'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import variantGlobal from 'units/variantGlobal'

export default function Landing() {
  useEffect(() => {
    localStorage.setItem('previousPath', '/')
  }, [])

  return (
    <motion.div
      className='w-full'
      initial='initial'
      animate='enter'
      exit='exit'
      variants={variantGlobal(4, 0.5)}
    >
      <div className='flex w-full flex-col'>
        <HeroSection />
        <Footer />
      </div>
    </motion.div>
  )
}
