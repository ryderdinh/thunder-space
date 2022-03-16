import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { actSignIn } from 'actions'
import GoogleIcon from 'components/Icon/GoogleIcon'
import ThunderSpaceIcon from 'components/Icon/ThunderSpaceIcon'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'

export default function LoginForm() {
  // Create state
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState({
    text: '',
    isShow: false,
    isReadOnly: true
  })

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
      dispatch(actSignIn({ username: email, password: password.text }))
      return
    }

    toast.error('Khum được để trống email hoặc mật khẩu')
  }

  const handleKeyUp = (event) => {
    if (event.key === 'Enter') {
      handleSignIn()
    }
  }

  return (
    <div className='login-form'>
      <div className='login-form-inner'>
        <div className='logo'>
          <ThunderSpaceIcon />
        </div>
        <h1>Login</h1>
        <p className='body-text'>See your growth and get consulting support!</p>

        <div className='rounded-button google-login-button'>
          <span className='google-icon'>
            <GoogleIcon />
          </span>
          <span>Sign in with Google</span>
        </div>

        <div className='sign-in-seperator'>
          <span>or Sign in with Email in Company</span>
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
          <div className='link forgot-link'>Forgot Password ?</div>
        </div>

        <div className='rounded-button login-cta' onClick={handleSignIn}>
          Login
        </div>

        {/* <div className='register-div'>
							Not registered yet?
							<div className='link create-account'>Create an account ?</div>
						</div> */}
      </div>
    </div>
  )
}