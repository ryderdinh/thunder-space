import { AnimatePresence, motion } from 'framer-motion'
import { useInput } from 'hooks'
import { useEffect, useRef, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import OtpInput from 'react-otp-input'
import { useInterval, useQueryParams } from 'react-recipes'
import { successToast } from 'utilities/toast'

const ForgotPassword = () => {
  const { getParams, setParams } = useQueryParams()
  const { step } = getParams()
  const idxUpdateRef = useRef(0)

  const handleStep = (stepNumber) => {
    stepNumber < 4 && setParams({ step: stepNumber })
  }

  useEffect(() => {
    !step && setParams({ step: 1 })
    idxUpdateRef.current === 0 && setParams({ step: 1 })

    idxUpdateRef.current++
  }, [step, setParams])

  return (
    <AnimatePresence>
      <motion.div className='flex min-h-full w-full flex-col items-center justify-center gap-5'>
        {Number(step) < 3 && (
          <Step1 handleStep={handleStep} step={Number(step)} />
        )}

        {Number(step) === 2 && <Step2 handleStep={handleStep} />}

        {Number(step) === 3 && <Step3 handleStep={handleStep} />}

        <Toaster position='top-right' reverseOrder={true} />
      </motion.div>
    </AnimatePresence>
  )
}

export default ForgotPassword

const Step1 = ({ handleStep, step }) => {
  const [error, setError] = useState(null)
  const [btnContent, setBtnContent] = useState('Send me otp')
  const [btnDisable, setBtnDisable] = useState(false)
  const { value, bind } = useInput('')

  const handleSendOTP = () => {
    if (!value) {
      setError('Please enter your email!')
      return
    }

    successToast('Sent OTP to your email')
    setError(null)
    setBtnDisable(true)
    handleStep(2)

    let sec = 60
    setBtnContent(`01:00`)
    let timeInterval = setInterval(() => {
      if (sec < 1) {
        setBtnContent('Resend')
        setBtnDisable(false)
        clearInterval(timeInterval)
        return
      }

      --sec
      setBtnContent(
        `00:${'00'.substring(0, '00'.length - `${sec}`.length) + sec}`
      )
    }, 1000)
  }

  useInterval(() => {}, 60000, false, [])

  useEffect(() => {
    step > 1 && setBtnDisable(true)
  }, [step])

  return (
    <motion.form
      className={`max-w-[90%] space-y-6 rounded-lg border border-[#2a2a2a] 
      bg-[#1f1f1f] px-8 py-5 pb-8 transition-all duration-300 md:w-[500px]
      md:max-w-md`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, duration: 300 }}
      exit={{ opacity: 0 }}
    >
      <h1 className='text-2xl font-bold text-neutral-50'>
        Forgot your password?
      </h1>

      <div className='flex w-full flex-col space-y-3'>
        <label htmlFor='email' className='text-sm text-neutral-50'>
          Email <span className='text-md text-emerald-600'>*</span>
        </label>

        <input
          type='text'
          placeholder='email@website.com'
          id='email'
          className='rounded-lg border border-neutral-700 bg-transparent 
          px-5 py-3 text-sm font-medium text-neutral-50 outline-none
          transition-all duration-200 ease-linear placeholder:font-light
          placeholder:text-neutral-500 focus:border-emerald-600'
          {...bind}
          onKeyDown={() => {
            setError(null)
          }}
        ></input>

        {error ? (
          <p className='text-xs font-light italic text-red-500'>{error}</p>
        ) : null}
      </div>

      <button
        type='submit'
        className='flex w-full items-center justify-center rounded-lg 
        bg-emerald-600 py-3 px-5 text-neutral-50
        transition-all
        duration-150 ease-in-out hover:bg-emerald-700
        disabled:cursor-wait disabled:bg-emerald-700'
        onClick={(e) => {
          e.preventDefault()
          handleSendOTP()
        }}
        disabled={btnDisable}
      >
        {btnContent}
      </button>
    </motion.form>
  )
}

const Step2 = ({ handleStep }) => {
  const [otp, setOtp] = useState({
    data: '',
    placeholder: '000000',
    numInputs: 6
  })

  const handleOtpInputChange = (otp) => {
    setOtp((prev) => ({
      ...prev,
      data: otp
    }))
  }

  return (
    <motion.form
      className='max-w-[90%] space-y-6 rounded-lg border border-[#2a2a2a] 
      bg-[#1f1f1f] px-8
      py-5 pb-8 md:w-[500px] md:max-w-md'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, duration: 300 }}
      exit={{ opacity: 0 }}
    >
      <h1 className='text-2xl font-bold text-neutral-50'>Enter OTP number</h1>

      <div className='flex w-full flex-col space-y-3'>
        <OtpInput
          value={otp.data}
          onChange={handleOtpInputChange}
          numInputs={otp.numInputs}
          inputStyle={{
            width: '70%',
            aspectRatio: '1 / 1',
            fontSize: '1rem',
            borderRadius: 4,
            border: '1px solid rgba(0,0,0,0.3)',
            margin: '15%'
          }}
          isInputNum={true}
          shouldAutoFocus={true}
        />
      </div>

      <button
        type='submit'
        className='flex w-full items-center justify-center rounded-lg 
          bg-emerald-600 py-3 px-5 text-neutral-50
          transition-all
          duration-150 ease-in-out hover:bg-emerald-700'
        disabled={otp.data.length < otp.numInputs}
        onClick={(e) => {
          e.preventDefault()
          handleStep(3)
        }}
      >
        Submit
      </button>
    </motion.form>
  )
}

const Step3 = ({ handleStep }) => {
  const { value: password, bind: bindForPass } = useInput('')
  const { value: confirmPassword, bind: bindForConfPass } = useInput('')

  const [error, setError] = useState({
    password: null,
    confirmPassword: null
  })

  const handleError = () => {
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
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    !handleError() && handleStep(4)
  }

  useEffect(() => {
    return () => {}
  })

  return (
    <motion.form
      className='max-w-[90%] space-y-6 rounded-lg border border-[#2a2a2a] 
      bg-[#1f1f1f] 
      px-8 py-5 pb-8 md:w-[500px] md:max-w-md'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, duration: 300 }}
      exit={{ opacity: 0 }}
      onSubmit={handleSubmit}
    >
      <h1 className='text-2xl font-bold text-neutral-50'>
        Change your password
      </h1>

      <div className='flex w-full flex-col space-y-3'>
        <label htmlFor='password' className='text-sm text-neutral-50'>
          New password <span className='text-md text-emerald-600'>*</span>
        </label>

        <input
          type='password'
          placeholder='Enter new password'
          id='password'
          className='rounded-lg border border-neutral-700 bg-transparent 
          px-5 py-3 text-sm font-medium text-neutral-50 outline-none
          transition-all duration-200 ease-linear placeholder:font-light
          placeholder:text-neutral-500 focus:border-emerald-600'
          {...bindForPass}
        ></input>

        {error.password ? (
          <p className='text-xs font-light italic text-red-500'>
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
          className='rounded-lg border border-neutral-700 bg-transparent 
          px-5 py-3 text-sm font-medium text-neutral-50 outline-none
          transition-all duration-200 ease-linear placeholder:font-light
          placeholder:text-neutral-500 focus:border-emerald-600'
          {...bindForConfPass}
        ></input>

        {error.confirmPassword ? (
          <p className='text-xs font-light italic text-red-500'>
            {error.confirmPassword}
          </p>
        ) : null}
      </div>

      <button
        type='submit'
        className='flex w-full items-center justify-center rounded-lg 
        bg-emerald-600 py-3 px-5 text-neutral-50
        transition-all
        duration-150 ease-in-out hover:bg-emerald-700'
        onClick={handleSubmit}
      >
        Submit
      </button>
    </motion.form>
  )
}
