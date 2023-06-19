import { setCookie } from 'actions/apps'
import ButtonSuccess from 'components/Button/ButtonSuccess'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

const CookieNotification = () => {
  const dispatch = useDispatch()

  const understand = () => {
    console.log(true)
    dispatch(setCookie(true))
  }

  return (
    <div
      className='w-[300px] space-y-2.5 rounded-5 border 
      border-emerald-500/50 bg-emerald-500/5 p-5'
    >
      <p className='text-sm text-emerald-200'>
        By continuing to use this website, you consent to the use of cookies in
        accordance with our{' '}
        <Link to='/login'>
          <span className='font-semibold text-white underline underline-offset-2'>
            Cookie Policy
          </span>
        </Link>
        .
      </p>

      <ButtonSuccess size='mid' onClick={understand}>
        <p className='text-xs'>Understand</p>
      </ButtonSuccess>
    </div>
  )
}

export default CookieNotification
