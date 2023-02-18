import 'assets/css/login.css'
import LoginForm from 'components/SignIn/LoginForm'
import OnBoardingSlide from 'components/SignIn/OnBoardingSlide'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import variantGlobal from 'units/variantGlobal'

export default function Login() {
  const { auth } = useSelector((state) => state._checkLogin)
  const history = useHistory()

  useEffect(() => {
    document.title = 'Login'
  }, [])

  useEffect(() => {
    let previousPath = localStorage.getItem('previousPath')

    if (previousPath !== '/home' && previousPath !== '/') {
      auth && history.goBack()
    } else {
      auth && history.push('/home')
    }
  }, [auth, history])

  return (
    <motion.div
      className='login-container'
      initial='initial'
      animate='enter'
      exit='exit'
      variants={variantGlobal(4, 0.5)}
    >
      <LoginForm />
      <OnBoardingSlide />
    </motion.div>
  )
}
