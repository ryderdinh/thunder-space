import { Transition } from '@headlessui/react'
import { Fragment, useCallback, useMemo, useState } from 'react'

const Tooltip = ({
  children,
  className,
  component,
  title,
  showIconTitle = false,
  disable = false
}) => {
  const timeoutDuration = useMemo(() => 200, [])
  let timeout = useMemo(() => null, [])

  const [open, setOpen] = useState(false)

  const closePopover = useCallback(() => {
    setOpen(false)
  }, [])

  const onMouseEnter = useCallback(() => {
    clearTimeout(timeout)
    if (!open) setOpen(true)
  }, [open, timeout])

  const onMouseLeave = () => {
    if (!open) return
    closePopover()
  }

  if (disable) return <></>

  return (
    <div className='relative'>
      <div>
        <div
          className='cursor-pointer'
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {children}
        </div>

        <Transition
          as={Fragment}
          show={open}
          enter='transition ease-out duration-200'
          enterFrom='opacity-0 translate-y-1'
          enterTo='opacity-100 translate-y-0'
          leave='transition ease-in duration-150 delay-200'
          leaveFrom='opacity-100 translate-y-0'
          leaveTo='opacity-0 translate-y-1'
        >
          <div
            className={`absolute bottom-[calc(100%_+_10px)] left-1/2 z-10 w-max max-w-[300px] 
            -translate-x-1/2 transform px-4`}
          >
            <div
              className='space-y-4 overflow-hidden rounded-md shadow-lg 
              ring-1 ring-neutral-600 ring-opacity-5'
            >
              <div className='bg-white px-2 py-2'>
                {/* Tooltop title */}
                {title ? (
                  <div className='flex items-center gap-3'>
                    {showIconTitle ? (
                      <div
                        className='flex h-7 w-7 flex-shrink-0 items-center 
                      justify-center text-white'
                      >
                        <IconThree aria-hidden='true' />
                      </div>
                    ) : null}

                    <p className='text-sm font-medium text-gray-900'>{title}</p>
                  </div>
                ) : null}

                {/* Main content */}
                <div>{component}</div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  )
}

export default Tooltip

function IconThree() {
  return (
    <svg
      width='48'
      height='48'
      viewBox='0 0 48 48'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect width='48' height='48' rx='8' fill='#FFEDD5' />
      <rect x='13' y='32' width='2' height='4' fill='#FDBA74' />
      <rect x='17' y='28' width='2' height='8' fill='#FDBA74' />
      <rect x='21' y='24' width='2' height='12' fill='#FDBA74' />
      <rect x='25' y='20' width='2' height='16' fill='#FDBA74' />
      <rect x='29' y='16' width='2' height='20' fill='#FB923C' />
      <rect x='33' y='12' width='2' height='24' fill='#FB923C' />
    </svg>
  )
}
