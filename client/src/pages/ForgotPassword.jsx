import { userApi } from 'api'
import ButtonSuccess from 'components/Button/ButtonSuccess'
import Logo from 'components/Icon/Logo'
import ConfettiGenerator from 'confetti-js'
import { AnimatePresence, motion } from 'framer-motion'
import { useInput } from 'hooks'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import OtpInput from 'react-otp-input'
import { useQueryParams } from 'react-recipes'
import { Link, useHistory } from 'react-router-dom'
import variantGlobal from 'units/variantGlobal'
import { errorToast, loadingToast, successToast } from 'utilities/toast'

const ForgotPassword = () => {
  const { getParams, setParams } = useQueryParams()
  const { step } = getParams()
  const idxUpdateRef = useRef(0)

  const handleStep = useCallback(
    (stepNumber, moreParams) => {
      stepNumber < 5 && setParams({ ...moreParams, step: stepNumber })
    },
    [setParams]
  )

  useEffect(() => {
    !step && setParams({ ...getParams(), step: 1 })
    idxUpdateRef.current === 0 && setParams({ ...getParams(), step: 1 })
    idxUpdateRef.current++
  }, [step, setParams, getParams])

  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        className='flex min-h-full w-full flex-col items-center 
        justify-center gap-5'
        initial='initial'
        animate='enter'
        exit='exit'
        variants={variantGlobal(4, 0.3)}
      >
        <Link to='/login' className='z-[1]'>
          <motion.div
            className='flex flex-col items-center gap-1'
            transition={{ delay: 0.3 }}
          >
            <Logo />
            <h2 className='!font-bold text-neutral-50'>Thunder Space</h2>
          </motion.div>
        </Link>
        <motion.div
          className='flex h-max w-full flex-col items-center 
          justify-center gap-5'
        >
          <AnimatePresence exitBeforeEnter>
            {Number(step) < 3 && (
              <Step1
                handleStep={handleStep}
                step={Number(step)}
                key='forgot-password-step-1'
              />
            )}

            {Number(step) === 2 && (
              <Step2 handleStep={handleStep} key='forgot-password-step-2' />
            )}

            {Number(step) === 3 && (
              <Step3 handleStep={handleStep} key='forgot-password-step-3' />
            )}

            {Number(step) === 4 && <Step4 key='forgot-password-step-4' />}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default ForgotPassword

const StepForm = ({ title, children, step, onSubmit }) => {
  useEffect(() => {
    let confettiSettings = {
      target: 'confetti-canvas',
      props: ['circle', 'square'],
      respawn: false,
      rotate: true
    }

    const confetti = new ConfettiGenerator(confettiSettings)
    step === 4 ? confetti.render() : confetti.clear()

    return () => confetti.clear()
  }, [step])

  return (
    <>
      <motion.form
        className={`relative z-[1] max-w-[90%] space-y-6 rounded 
        border border-[#2a2a2a] bg-[#1f1f1f] px-8 py-5 pb-8 transition-all
        duration-300 md:w-[500px] md:max-w-md`}
        initial={{ scale: 0 }}
        animate={{
          scale: 1,
          transition: { delay: 1 },
          transformOrigin: 'top'
        }}
        exit={{ scale: 0 }}
        onSubmit={onSubmit}
      >
        <motion.div
          className='space-y-6'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, duration: 300, transition: { delay: 2 } }}
          exit={{ opacity: 0 }}
        >
          <h1 className='text-2xl font-bold text-neutral-50'>{title}</h1>
          {children}
        </motion.div>
      </motion.form>
      <canvas
        id='confetti-canvas'
        className='fixed top-0 left-0 z-0 h-screen w-screen'
      ></canvas>
    </>
  )
}

const Step1 = ({ handleStep, step }) => {
  //? State
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [btnContent, setBtnContent] = useState('Send me otp')
  const [btnDisable, setBtnDisable] = useState(false)

  //? Var
  const emailRegex = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/, [])
  const { getParams } = useQueryParams()
  const { value, bind } = useInput(getParams()?.mail || '')
  const isEmail = useMemo(() => emailRegex.test(value), [emailRegex, value])

  const getOtp = async (onSuccess, onError) => {
    try {
      await userApi.getOtpInForgotPass(value)
      onSuccess()
    } catch (error) {
      onError(error)
    } finally {
      setLoading(false)
    }
  }

  const startCowndown = () => {
    const padTo2Digits = (num) => {
      return num.toString().padStart(2, '0')
    }

    let sec = 6 * 2
    let timeInterval = setInterval(() => {
      if (sec < 1) {
        setBtnContent('Resend')
        setBtnDisable(false)
        clearInterval(timeInterval)
        return
      }

      const minutes = Math.floor(sec / 60)
      const seconds = sec % 60
      setBtnContent(`${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`)

      --sec
    }, 1000)
  }

  const handleSendOTP = async () => {
    if (!value) {
      setError('Please enter your email!')
      return
    }

    if (!isEmail) {
      setError('Invalid email format!')
      return
    }

    const onSuccess = async () => {
      successToast('Sent OTP to your email', 'noti-forgot-password')
      setError(null)
      setBtnDisable(true)
      startCowndown()
      handleStep(2, { mail: value })
    }

    const onError = (error) => {
      errorToast(error.message, 'noti-forgot-password')
    }

    loadingToast('Sending', 'noti-forgot-password')
    setLoading(true)
    await getOtp(onSuccess, onError)
  }

  useEffect(() => {
    step > 1 && setBtnDisable(true)
  }, [step])

  return (
    <StepForm
      title='Forgot your password?'
      onSubmit={(e) => e.preventDefault()}
    >
      <div className='flex w-full flex-col space-y-3'>
        <label htmlFor='email' className='text-sm text-neutral-50'>
          Email <span className='text-md text-emerald-600'>*</span>
        </label>

        <input
          type='text'
          placeholder='email@website.com'
          id='email'
          className='rounded border border-neutral-700 bg-transparent 
          px-5 py-3 text-sm font-medium text-neutral-50 outline-none
          transition-all duration-200 ease-linear placeholder:font-light
          placeholder:text-neutral-500 focus:border-emerald-600'
          {...bind}
          onKeyDown={() => {
            setError(null)
          }}
        ></input>

        {error ? (
          <p className='!mt-1 text-xs font-light italic text-red-500'>
            {error}
          </p>
        ) : null}
      </div>

      <ButtonSuccess
        className='flex w-full items-center justify-center 
        bg-emerald-600 py-3 px-5 !text-base !font-medium 
        text-neutral-50 transition-all duration-150
        ease-in-out hover:bg-emerald-700 disabled:cursor-wait disabled:bg-emerald-700'
        disabled={btnDisable}
        loading={loading}
        onClick={handleSendOTP}
      >
        {btnContent}
      </ButtonSuccess>
    </StepForm>
  )
}

const Step2 = ({ handleStep }) => {
  //? State
  const [loading, setLoading] = useState(false)
  const [otp, setOtp] = useState({
    data: '',
    placeholder: '000000',
    numInputs: 6
  })

  //? Var
  const { getParams } = useQueryParams()

  //? Func
  const handleOtpInputChange = (otp) => {
    setOtp((prev) => ({
      ...prev,
      data: otp
    }))
  }

  const verifyOtp = async () => {
    const onSuccess = () => {
      handleStep(3, { mail: getParams()?.mail })
      successToast('Verified', 'noti-forgot-password')
    }

    const onError = (error) => {
      errorToast(error.message, 'noti-forgot-password')
    }

    loadingToast('Verifying...', 'noti-forgot-password')
    setLoading(true)
    try {
      await userApi.verifyOtpInForgotPass(getParams()?.mail, otp.data)
      onSuccess()
    } catch (error) {
      onError(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <StepForm title='Enter OTP number'>
      <div className='flex w-full flex-col space-y-3'>
        <OtpInput
          className='otp-input'
          value={otp.data}
          onChange={handleOtpInputChange}
          numInputs={otp.numInputs}
          inputStyle={{
            width: '70%',
            aspectRatio: '1 / 1',
            fontSize: '1rem',
            borderRadius: 4,
            border: '1px solid rgba(250,250,250,1)',
            margin: '15%'
          }}
          isInputNum={true}
          shouldAutoFocus={true}
        />
      </div>

      <ButtonSuccess
        className='flex w-full items-center justify-center 
        bg-emerald-600 py-3 px-5 !text-base !font-medium 
        text-neutral-50 transition-all duration-150
        ease-in-out hover:bg-emerald-700 disabled:cursor-wait disabled:bg-emerald-700'
        loading={loading}
        disabled={otp.data.length < otp.numInputs}
        onClick={verifyOtp}
      >
        Submit
      </ButtonSuccess>
    </StepForm>
  )
}

const Step3 = ({ handleStep }) => {
  //? State
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({
    password: null,
    confirmPassword: null
  })
  const { value: password, bind: bindForPass } = useInput('')
  const { value: confirmPassword, bind: bindForConfPass } = useInput('')

  //? Var
  const { getParams } = useQueryParams()

  //? Func
  const handleError = useCallback(() => {
    let errorUpdate = { ...error }

    let checkError = false
    if (password.length < 6) {
      errorUpdate = { ...errorUpdate, password: 'At least 6 characters' }
      checkError = true
    } else errorUpdate = { ...errorUpdate, password: null }

    if (confirmPassword.length < 6) {
      errorUpdate = { ...errorUpdate, confirmPassword: 'At least 6 characters' }
      checkError = true
    } else errorUpdate = { ...errorUpdate, confirmPassword: '' }

    if (!checkError && password !== confirmPassword) {
      checkError = true
      errorUpdate = {
        ...errorUpdate,
        confirmPassword: 'Confirm password does not match'
      }
    } else if (!checkError) {
      errorUpdate = { ...errorUpdate, confirmPassword: null }
    }

    setError({ ...errorUpdate })
    return checkError
  }, [confirmPassword, error, password])

  const handleSubmit = () => {
    !handleError() && resetPassword()
  }

  const resetPassword = async () => {
    setLoading(true)
    loadingToast('Reseting...', 'noti-forgot-password')

    const onSuccess = () => {
      successToast('Success', 'noti-forgot-password')
      handleStep(4, {})
    }

    const onError = (error) => {
      errorToast(error.message, 'noti-forgot-password')
    }

    try {
      await userApi.resetInForgotPass(getParams()?.mail, password)
      onSuccess()
    } catch (error) {
      onError(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <StepForm title='Change your password' onSubmit={handleSubmit}>
      <div className='flex w-full flex-col space-y-3'>
        <label htmlFor='password' className='text-sm text-neutral-50'>
          New password <span className='text-md text-emerald-600'>*</span>
        </label>

        <input
          type='password'
          placeholder='Enter new password'
          id='password'
          className='rounded border border-neutral-700 bg-transparent 
          px-5 py-3 text-sm font-medium text-neutral-50 outline-none
          transition-all duration-200 ease-linear placeholder:font-light
          placeholder:text-neutral-500 focus:border-emerald-600'
          {...bindForPass}
        ></input>

        {error.password ? (
          <p className='!mt-1 text-xs font-light italic text-red-500'>
            {error.password}
          </p>
        ) : null}

        <label htmlFor='conf-password' className='text-sm text-neutral-50'>
          Confirm password <span className='text-md text-emerald-600'>*</span>
        </label>

        <input
          type='password'
          placeholder='Enter confirm password'
          id='conf-password'
          className='rounded border border-neutral-700 bg-transparent 
          px-5 py-3 text-sm font-medium text-neutral-50 outline-none
          transition-all duration-200 ease-linear placeholder:font-light
          placeholder:text-neutral-500 focus:border-emerald-600'
          {...bindForConfPass}
        ></input>

        {error.confirmPassword ? (
          <p className='!mt-1 text-xs font-light italic text-red-500'>
            {error.confirmPassword}
          </p>
        ) : null}
      </div>

      <ButtonSuccess
        className='flex w-full items-center justify-center 
        bg-emerald-600 py-3 px-5 !text-base !font-medium 
        text-neutral-50 transition-all duration-150
        ease-in-out hover:bg-emerald-700 disabled:cursor-wait disabled:bg-emerald-700'
        loading={loading}
        onClick={handleSubmit}
      >
        Submit
      </ButtonSuccess>
    </StepForm>
  )
}

const Step4 = () => {
  //? Router
  const history = useHistory()

  //? State
  const [second, setSecond] = useState(7)

  //? Func
  const redirectToLogin = useCallback(() => {
    history.push('/login')
  }, [history])

  //? Effect
  useEffect(() => {
    const interval = setInterval(() => {
      setSecond((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    second < 1 && redirectToLogin()
  }, [redirectToLogin, second])

  return (
    <StepForm title='Congratulation! 🎉' step={4}>
      <p className='text-center text-emerald-500'>Your password is changed</p>

      <p className='text-center text-neutral-200'>
        Auto redirecting in
        <span className='font-bold text-emerald-500'>{` ${second} `}</span>
        seconds...
      </p>

      <ButtonSuccess
        className='flex w-full items-center justify-center 
        bg-emerald-600 py-3 px-5 !text-base !font-medium 
        text-neutral-50 transition-all duration-150
        ease-in-out hover:bg-emerald-700 disabled:cursor-wait disabled:bg-emerald-700'
        onClick={redirectToLogin}
      >
        Return to login page
      </ButtonSuccess>
    </StepForm>
  )
}
