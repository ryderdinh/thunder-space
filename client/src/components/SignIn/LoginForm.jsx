import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { actSignIn } from 'actions'
import ButtonSuccess from 'components/Button/ButtonSuccess'
import GoogleIcon from 'components/Icon/GoogleIcon'
import Logo from 'components/Icon/Logo'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { errorToast } from 'utilities/toast'

export default function LoginForm() {
  // Create state
  const [email, setEmail] = useState('ryderdinh@gmail.com')
  const [password, setPassword] = useState({
    text: '123456',
    isShow: false,
    isReadOnly: true
  })

  const history = useHistory()

  // Create dispatch
  const dispatch = useDispatch()

  // Create function
  const handleUsername = (e) => {
    setEmail(e.target.value)
  }

  const handlePassword = (e) => {
    setPassword((prevState) => ({ ...prevState, text: e.target.value }))
  }

  const handleShowPassword = () => {
    setPassword((prevState) => ({
      ...prevState,
      isShow: !prevState.isShow
    }))
  }

  const handleUnReadOnlyPassword = () => {
    setPassword((prevState) => ({
      ...prevState,
      isReadOnly: false
    }))
  }

  const handleSignIn = () => {
    if (email && password.text) {
      dispatch(
        actSignIn({ email: email.trim(), password: password.text.trim() })
      )
      return
    }

    errorToast('Missing user authentication information!', 'login')
  }

  const handleKeyUp = (event) => {
    if (event.key === 'Enter') {
      handleSignIn()
    }
  }

  const redirectToForgotPassword = () => {
    history.push('/forgot-password')
  }

  return (
    <div className='login-form'>
      <div className='login-form-inner'>
        <div className='logo'>
          <Logo />
        </div>
        <h1 className='text-2xl font-bold'>Login</h1>
        <p className='body-text'>Join us in your space!</p>

        <div
          className='rounded-button google-login-button'
          onClick={() =>
            toast('Comming soon ☄️', {
              id: 'sign-in-with-google',
              duration: 1000000,
              className: '!font-bevn'
            })
          }
        >
          <span className='google-icon'>
            <GoogleIcon />
          </span>
          <span className='select-none'>Login with Google</span>
        </div>

        <div className='sign-in-seperator'>
          <span>or Login with Email</span>
        </div>

        <div className='login-form-group'>
          <label htmlFor='email'>
            Email <span className='required-star'>*</span>
          </label>
          <div className='login-input-group'>
            <input
              type='text'
              placeholder='email@website.com'
              id='email'
              value={email}
              onChange={handleUsername}
            />
          </div>
        </div>
        <div className='login-form-group'>
          <label htmlFor='pwd'>
            Password <span className='required-star'>*</span>
          </label>
          <div className='login-input-group'>
            <input
              className='password-input'
              autoComplete='false'
              type={password.isShow ? 'text' : 'password'}
              placeholder='Minimum 6 characters'
              id='pwd'
              value={password.text}
              onFocus={handleUnReadOnlyPassword}
              onChange={handlePassword}
              onKeyUp={handleKeyUp}
              readOnly={password.isReadOnly}
            />
            <FontAwesomeIcon
              icon={
                password.isShow
                  ? 'fa-solid fa-eye-low-vision'
                  : 'fa-solid fa-eye'
              }
              className='eye-icon'
              color='rgba(224, 224, 224, 1)'
              onClick={handleShowPassword}
            />
          </div>
        </div>

        <div className='login-form-group single-row'>
          {/* <div className='custom-check'>
            <input autoComplete='off' type='checkbox' id='remember' />
            <label htmlFor='remember'>Remember me</label>
          </div> */}
          <div className='link forgot-link' onClick={redirectToForgotPassword}>
            <p className='hover-underline-animation after:bg-emerald-600'>
              Forgot Password ?
            </p>
          </div>
        </div>

        <div className='w-full'>
          <ButtonSuccess
            className='rounded-button w-full'
            onClick={handleSignIn}
          >
            Go
          </ButtonSuccess>
        </div>

        {/* <div className='register-div'>
          Not registered yet?
          <div className='link create-account'>Create an account ?</div>
        </div> */}
      </div>
    </div>
  )
}
