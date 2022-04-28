import { Menu } from '@headlessui/react'
function MenuItem({ onClick, type }) {
  return (
    <Menu.Item>
      {({ active }) => (
        <button
          className={`${
            active ? 'bg-emerald-600 text-white' : 'text-neutral-700'
          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
          onClick={onClick}
        >
          {type === 'add' && (
            <>
              {active ? (
                <PlusActiveIcon className='mr-2 h-5 w-5' aria-hidden='true' />
              ) : (
                <PlusInactiveIcon className='mr-2 h-5 w-5' aria-hidden='true' />
              )}
              Add
            </>
          )}
          {type === 'edit' && (
            <>
              {active ? (
                <EditActiveIcon className='mr-2 h-5 w-5' aria-hidden='true' />
              ) : (
                <EditInactiveIcon className='mr-2 h-5 w-5' aria-hidden='true' />
              )}
              Edit
            </>
          )}
          {type === 'archive' && (
            <>
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
            </>
          )}
          {type === 'delete' && (
            <>
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
            </>
          )}
        </button>
      )}
    </Menu.Item>
  )
}

export default MenuItem

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
