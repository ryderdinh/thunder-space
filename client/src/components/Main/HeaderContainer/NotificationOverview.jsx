import { Popover, Transition } from '@headlessui/react'
import { actGetNotification, setNotificationsReadAll } from 'actions'
import ButtonSuccess from 'components/Button/ButtonSuccess'
import BallTriangle from 'components/Loading/BallTriangle'
// import { useFetch } from 'hooks'
import { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getCookie } from 'units/cookieWeb'
import { errorToast } from 'utilities/toast'

const NotificationOverview = () => {
  const { _data, isLoading, error } = useSelector(
    (state) => state._notification
  )
  const dispatch = useDispatch()
  console.log(getCookie().token)
  // const fetchData = useFetch()
  // useEffect(() => {
  //   const onSuccess = (data) => {
  //     console.log(data?.message)
  //   }

  //   const onError = (error) => {
  //     console.log(error)
  //   }

  //   fetchData(notificationApi.get, onSuccess, onError)
  // }, [fetchData])

  useEffect(() => {
    const onSuccess = (data) => {
      console.log(data)
    }

    const onError = (error) => {
      console.log(error)
    }
    dispatch(actGetNotification(null, onSuccess, onError))
  }, [dispatch])

  useEffect(() => {
    if (error) errorToast(error)
  }, [error])

  return (
    <Transition
      as={Fragment}
      enter='transition ease-out duration-200'
      enterFrom='opacity-0 translate-y-1'
      enterTo='opacity-100 translate-y-0'
      leave='transition ease-in duration-150'
      leaveFrom='opacity-100 translate-y-0'
      leaveTo='opacity-0 translate-y-1'
    >
      <Popover.Panel
        className='lg:max-w-3 absolute right-0 
        z-10 z-20 mt-1 w-screen
        max-w-sm px-4 sm:px-0'
      >
        <div
          className='divide-y divide-neutral-600/50 rounded-md border 
          border-neutral-600/50
          bg-neutral-800/80'
        >
          <div className='flex items-center justify-between px-5 py-2'>
            <h5 className='text-base text-neutral-50/75'>Notifications</h5>
            <ButtonSuccess
              onClick={() => {
                dispatch(setNotificationsReadAll())
              }}
            >
              Read all
            </ButtonSuccess>
          </div>

          <div>
            {isLoading && (
              <div
                className='flex w-full items-center justify-center
                  border-t-2 border-[#282828] px-6 py-10'
              >
                <BallTriangle w={30} h={30} stroke={'#059669'} />
              </div>
            )}

            {!isLoading &&
              _data &&
              _data.map((_, i) => (
                <div className='px-5 py-2' key={i}>
                  <p className='text-xs font-light text-neutral-50/75'>
                    Notification {i + 1}
                  </p>
                </div>
              ))}

            {!isLoading && (!_data || _data.length < 1) && (
              <p className='p-3 text-center text-xs font-light text-neutral-500'>
                No notifictions available.
              </p>
            )}
          </div>

          <div className='px-5 py-2'>
            <Link to='/notifications'>
              <p
                className='cursor-pointer text-center text-xs text-neutral-50/75 
                hover:underline'
              >
                See all notifications
              </p>
            </Link>
          </div>
        </div>
      </Popover.Panel>
    </Transition>
  )
}

export default NotificationOverview
