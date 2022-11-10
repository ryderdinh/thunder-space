import { Popover, Transition } from '@headlessui/react'
import { actGetNotification, setNotificationsReadAll } from 'actions'
import ButtonSuccess from 'components/Button/ButtonSuccess'
import BallTriangle from 'components/Loading/BallTriangle'
import detectNotification from 'features/notification/services/detectNotification'
import moment from 'moment'
// import { useFetch } from 'hooks'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { capitalizeFirstLetter } from 'utilities'
import { errorToast } from 'utilities/toast'

const NotificationOverview = () => {
  const { _data, isLoading, error } = useSelector(
    (state) => state._notification
  )
  const dispatch = useDispatch()

  const history = useHistory()

  const [notificationListRef] = useAutoAnimate()

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

  const onClick = (link, data) => {
    console.log(data)
    if (link) {
      history.push(link, data)
    }
  }

  useEffect(() => {
    const onSuccess = (data) => {}

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
        className='lg:max-w-3 absolute right-0 z-20 mt-1 w-screen
        max-w-sm px-4 sm:px-0'
      >
        <div
          className='divide-y divide-neutral-600/50 rounded-md border 
          border-neutral-600/50
          bg-neutral-800'
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

          <ul
            ref={notificationListRef}
            className={`custom-scrollbar relative max-h-64 overflow-y-scroll`}
          >
            {isLoading && (
              <div
                className='flex w-full items-center justify-center
                border-t-2 border-[#282828] py-5'
              >
                <BallTriangle w={30} h={30} stroke={'#059669'} />
              </div>
            )}

            {_data.map((_, i) => (
              <li
                key={_._id}
                className={`${
                  _?.read
                    ? ''
                    : 'bg-neutral-700/50 before:absolute before:left-0 before:top-0 before:h-full before:w-[2px] before:bg-emerald-600'
                } 
                  relative flex w-full cursor-pointer items-center justify-between px-6 py-3
                  text-neutral-50/80
                  hover:bg-neutral-700`}
                onClick={() =>
                  onClick(detectNotification(_.type, _.data)?.link || null, {
                    ..._,
                    content: detectNotification(_.type, _.data).content
                  })
                }
              >
                <div className='flex items-center'>
                  <div className='h-5 w-5'>
                    {detectNotification(_.type, _.data)?.icon || null}
                  </div>
                  <div className='pl-6'>
                    <p className='text-xs'>{moment(_.time).fromNow()}</p>
                    <p className='text-sm font-light line-clamp-1'>
                      {capitalizeFirstLetter(
                        detectNotification(_.type, _.data).content || ''
                      )}
                    </p>
                  </div>
                </div>
              </li>
            ))}

            {/* {Array.from({ length: 1 }).map((_, i) => (
              <li
                key={i}
                className={`${
                  true
                    ? ''
                    : 'bg-neutral-700/50 before:absolute before:left-0 before:top-0 before:h-full before:w-[2px] before:bg-emerald-600'
                }
                  relative flex w-full cursor-pointer items-center justify-between px-6 py-3
                  text-neutral-50/80
                  hover:bg-neutral-700`}
                onClick={() => customToast()}
              >
                <div className='flex items-center'>
                  <BellIcon className='h-5 w-5' />
                  <div className='pl-6'>
                    <p className='text-xs'>one time ago</p>
                    <p className='text-sm font-light line-clamp-1'>
                      {'You have a new notification'}
                    </p>
                  </div>
                </div>
              </li>
            ))} */}

            {!isLoading && (!_data || _data.length < 1) && (
              <p className='p-3 text-center text-xs font-light text-neutral-500'>
                No notifictions available.
              </p>
            )}
          </ul>

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
