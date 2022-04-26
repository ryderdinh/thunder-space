import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { LayoutContext } from 'context/LayoutContext'
import { Fragment, useContext } from 'react'

export default function MenuComponent({ addDialogName }) {
  const { openDialog } = useContext(LayoutContext)

  return (
    <Menu as='div' className='relative z-10 inline-block text-left'>
      <div className='flex justify-end'>
        <Menu.Button
          className='panel inline-flex h-9 w-max items-center 
          justify-center rounded-md bg-opacity-20 py-2 px-4 text-sm
          font-medium text-white hover:bg-opacity-30 focus:outline-none
          focus-visible:ring-2 focus-visible:ring-white
          focus-visible:ring-opacity-75'
        >
          <ChevronDownIcon
            className='h-5 w-5 text-neutral-200 hover:text-neutral-100'
            aria-hidden='true'
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items
          className='absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100
          rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
        >
          <div className='px-1 py-1 '>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-emerald-600 text-white' : 'text-neutral-700'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  onClick={() => {
                    openDialog(addDialogName)
                  }}
                >
                  {active ? (
                    <PlusActiveIcon
                      className='mr-2 h-5 w-5'
                      aria-hidden='true'
                    />
                  ) : (
                    <PlusInactiveIcon
                      className='mr-2 h-5 w-5'
                      aria-hidden='true'
                    />
                  )}
                  Add
                </button>
              )}
            </Menu.Item>
          </div>
          <div className='px-1 py-1 '>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-emerald-600 text-white' : 'text-neutral-700'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  {active ? (
                    <EditActiveIcon
                      className='mr-2 h-5 w-5'
                      aria-hidden='true'
                    />
                  ) : (
                    <EditInactiveIcon
                      className='mr-2 h-5 w-5'
                      aria-hidden='true'
                    />
                  )}
                  Edit
                </button>
              )}
            </Menu.Item>
          </div>
          <div className='px-1 py-1'>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-emerald-600 text-white' : 'text-neutral-700'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  {active ? (
                    <ArchiveActiveIcon
                      className='mr-2 h-5 w-5'
                      aria-hidden='true'
                    />
                  ) : (
                    <ArchiveInactiveIcon
                      className='mr-2 h-5 w-5'
                      aria-hidden='true'
                    />
                  )}
                  Archive
                </button>
              )}
            </Menu.Item>
          </div>
          <div className='px-1 py-1'>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-emerald-600 text-white' : 'text-neutral-700'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  {active ? (
                    <DeleteActiveIcon
                      className='mr-2 h-5 w-5 text-emerald-400'
                      aria-hidden='true'
                    />
                  ) : (
                    <DeleteInactiveIcon
                      className='mr-2 h-5 w-5 text-emerald-400'
                      aria-hidden='true'
                    />
                  )}
                  Delete
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

function EditInactiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M4 13V16H7L16 7L13 4L4 13Z'
        fill='#d1fae5'
        stroke='#059669'
        strokeWidth='2'
      />
    </svg>
  )
}

function EditActiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M4 13V16H7L16 7L13 4L4 13Z'
        fill='#059669'
        stroke='#34d399'
        strokeWidth='2'
      />
    </svg>
  )
}

function DuplicateInactiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M4 4H12V12H4V4Z'
        fill='#d1fae5'
        stroke='#059669'
        strokeWidth='2'
      />
      <path
        d='M8 8H16V16H8V8Z'
        fill='#d1fae5'
        stroke='#059669'
        strokeWidth='2'
      />
    </svg>
  )
}

function DuplicateActiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M4 4H12V12H4V4Z'
        fill='#059669'
        stroke='#34d399'
        strokeWidth='2'
      />
      <path
        d='M8 8H16V16H8V8Z'
        fill='#059669'
        stroke='#34d399'
        strokeWidth='2'
      />
    </svg>
  )
}

function ArchiveInactiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect
        x='5'
        y='8'
        width='10'
        height='8'
        fill='#d1fae5'
        stroke='#059669'
        strokeWidth='2'
      />
      <rect
        x='4'
        y='4'
        width='12'
        height='4'
        fill='#d1fae5'
        stroke='#059669'
        strokeWidth='2'
      />
      <path d='M8 12H12' stroke='#A78BFA' strokeWidth='2' />
    </svg>
  )
}

function ArchiveActiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect
        x='5'
        y='8'
        width='10'
        height='8'
        fill='#059669'
        stroke='#34d399'
        strokeWidth='2'
      />
      <rect
        x='4'
        y='4'
        width='12'
        height='4'
        fill='#059669'
        stroke='#34d399'
        strokeWidth='2'
      />
      <path d='M8 12H12' stroke='#34d399' strokeWidth='2' />
    </svg>
  )
}

function MoveInactiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M10 4H16V10' stroke='#059669' strokeWidth='2' />
      <path d='M16 4L8 12' stroke='#059669' strokeWidth='2' />
      <path d='M8 6H4V16H14V12' stroke='#059669' strokeWidth='2' />
    </svg>
  )
}

function MoveActiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M10 4H16V10' stroke='#34d399' strokeWidth='2' />
      <path d='M16 4L8 12' stroke='#34d399' strokeWidth='2' />
      <path d='M8 6H4V16H14V12' stroke='#34d399' strokeWidth='2' />
    </svg>
  )
}

function DeleteInactiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect
        x='5'
        y='6'
        width='10'
        height='10'
        fill='#d1fae5'
        stroke='#059669'
        strokeWidth='2'
      />
      <path d='M3 6H17' stroke='#059669' strokeWidth='2' />
      <path d='M8 6V4H12V6' stroke='#059669' strokeWidth='2' />
    </svg>
  )
}

function DeleteActiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect
        x='5'
        y='6'
        width='10'
        height='10'
        fill='#059669'
        stroke='#34d399'
        strokeWidth='2'
      />
      <path d='M3 6H17' stroke='#34d399' strokeWidth='2' />
      <path d='M8 6V4H12V6' stroke='#34d399' strokeWidth='2' />
    </svg>
  )
}

function PlusInactiveIcon(props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='h-6 w-6'
      fill='none'
      viewBox='0 0 24 24'
      stroke='#059669'
      strokeWidth={2}
      {...props}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M12 6v6m0 0v6m0-6h6m-6 0H6'
      />
    </svg>
  )
}

function PlusActiveIcon(props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='h-6 w-6'
      fill='none'
      viewBox='0 0 24 24'
      stroke='#34d399'
      strokeWidth={2}
      {...props}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M12 6v6m0 0v6m0-6h6m-6 0H6'
      />
    </svg>
  )
}
