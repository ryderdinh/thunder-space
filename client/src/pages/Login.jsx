import 'assets/css/login.css'
import LoginForm from 'components/SignIn/LoginForm'
import OnBoardingSlide from 'components/SignIn/OnBoardingSlide'
import { LayoutContext } from 'context/LayoutContext'
import { useContext, useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'

export default function Login() {
  const { auth } = useSelector((state) => state._checkLogin)
  const history = useHistory()
  const { previousPath, setPreviousPath } = useContext(LayoutContext)

  useEffect(() => {
    document.title = 'Login'
  }, [])

  useEffect(() => {
    if (previousPath !== '/') {
      auth && history.goBack()
    } else {
      auth && history.push('/home')
    }
  }, [auth, history])

  return (
    <div className='login-container'>
      <LoginForm />
      <OnBoardingSlide />
      <Toaster position='top-right' reverseOrder={true} />
    </div>
  )
}
