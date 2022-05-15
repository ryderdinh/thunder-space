import 'assets/css/login.css'
import LoginForm from 'components/SignIn/LoginForm'
import OnBoardingSlide from 'components/SignIn/OnBoardingSlide'
import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'

export default function Login() {
  const { auth } = useSelector((state) => state._checkLogin)
  const history = useHistory()

  useEffect(() => {
    document.title = 'Login'
  }, [])

  useEffect(() => {
    // console.log(history.goBack())
    auth && history.goBack()
  }, [auth, history])

  return (
    <div className='login-container'>
      <LoginForm />
      <OnBoardingSlide />
      <Toaster position='top-right' reverseOrder={true} />
    </div>
  )
}
