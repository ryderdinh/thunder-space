import { getCheckinStatus } from '../services/getCheckinStatus'
import { getPercent } from '../services/getPercent'
import { actSendLocationToServer } from 'actions'
import ButtonSuccess from 'components/Button/ButtonSuccess'
import { OutApisContext } from 'context/OutApisContext'
import { useContext, useState } from 'react'
import { useDispatch } from 'react-redux'
import RFDate from 'utilities/date'
import { errorToast } from 'utilities/toast'

const Checkin = ({ date, allowCheckin, totalHour }) => {
  const {
    location: { latitude, longitude, error }
  } = useContext(OutApisContext)

  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useDispatch()

  const getLocation = () => {
    const onSuccess = () => {
      setIsLoading(false)
    }

    const onError = () => {
      setIsLoading(false)
    }

    if (!error) {
      setIsLoading(true)
      dispatch(
        actSendLocationToServer([latitude, longitude], onSuccess, onError)
      )
    } else errorToast(error)
  }

  return (
    <div className='flex flex-col justify-between px-6 py-4 md:flex-row'>
      <div className='hidden space-y-[1px] md:block'>
        <p className='text-xs text-neutral-200 md:text-sm'>
          {new RFDate(date).date}
        </p>
        <h4 className='text-lg font-bold text-neutral-50 md:text-2xl'>
          Attendance
        </h4>
        <p className='text-xs font-medium text-neutral-400 md:text-sm'>
          {getCheckinStatus(totalHour)}
        </p>
      </div>

      <div
        className='flex w-full max-w-full flex-row items-end
        justify-between md:w-1/4 md:max-w-[231px] md:flex-col 
        md:justify-end'
      >
        {allowCheckin && (
          <ButtonSuccess
            loading={isLoading}
            onClick={getLocation}
            className={'w-max'}
          >
            <p>Check in</p>
          </ButtonSuccess>
        )}

        <div className='mt-3 w-1/2 md:w-full'>
          <div className='mb-[1px] flex items-center justify-between'>
            <p className='text-sm text-neutral-200'>0 h</p>
            <p className='text-sm text-neutral-200'>
              <span className='text-emerald-500 font-bold'>{totalHour}</span>
              {`/${8}`} h
            </p>
          </div>
          <ProgressBar percent={getPercent(totalHour, 8)} />
        </div>
      </div>
    </div>
  )
}

export default Checkin

const ProgressBar = ({ percent = 0 }) => (
  <div className='relative h-1 w-full rounded-sm bg-neutral-700'>
    <div
      className='absolute top-0 left-0 z-10 h-full rounded-sm bg-emerald-500 
      transition-all duration-500 ease-in'
      style={{ width: `${percent}%` }}
    ></div>
  </div>
)
