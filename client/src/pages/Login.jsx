import 'assets/css/login.css'
import LoginForm from 'components/SignIn/LoginForm'
import OnBoardingSlide from 'components/SignIn/OnBoardingSlide'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'

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
    <div className='login-container'>
      <LoginForm />
      <OnBoardingSlide />
    </div>
  )
}
