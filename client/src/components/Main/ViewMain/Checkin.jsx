import { actSendLocationToServer } from 'actions'
import ButtonSuccess from 'components/Button/ButtonSuccess'
import { OutApisContext } from 'context/OutApisContext'
import { useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { errorToast } from 'utilities/toast'

const Checkin = () => {
  const {
    location: { latitude, longitude, error }
  } = useContext(OutApisContext)
  const { _count, _status } = useSelector((state) => state._timeOfAttendance)

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

  const getPercent = (_count / 8) * 100 > 100 ? 100 : (_count / 8) * 100

  const detectStatus = !_status
    ? "You haven't checked in today"
    : _count > 8
    ? 'Completed'
    : 'Not enough time'

  return (
    <div className='flex flex-col justify-between px-6 py-4 md:flex-row '>
      <div className='hidden space-y-[1px] md:block'>
        <p className='text-xs text-neutral-200 md:text-sm'>
          {new Date().toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          })}
        </p>
        <h4 className='text-lg font-bold text-neutral-50 md:text-2xl'>
          Attendance
        </h4>
        <p className='text-xs font-medium text-neutral-400 md:text-sm'>
          {detectStatus}
        </p>
      </div>

      <div className='flex w-1/4 max-w-[231px] flex-col items-end justify-end'>
        <ButtonSuccess loading={isLoading} onClick={getLocation}>
          Check in
        </ButtonSuccess>
        <div className='mt-3 w-full'>
          <div className='mb-[1px] flex items-center justify-between'>
            <p className='text-sm text-neutral-200'>0 h</p>
            <p className='text-sm text-neutral-200'>{`${_count}/${8}`} h</p>
          </div>
          <ProgressBar percent={getPercent} />
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
