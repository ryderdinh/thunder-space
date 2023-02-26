import { Menu, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/solid'
import ArrowPathIcon from 'components/Icon/ArrowPathIcon'
import { Fragment } from 'react'

const priorityColor = {
  highest: 'bg-orange-600',
  high: 'bg-amber-600',
  medium: 'bg-green-500',
  low: 'bg-blue-500'
}

const Priority = ({ className, priority, loading, onChange }) => {
  return (
    <div className={`${className}`}>
      <Menu as='div' className='relative inline-block text-left'>
        <Menu.Button disabled={loading}>
          <div
            className={`group flex cursor-pointer items-center gap-1 
              rounded-md px-2 py-1 transition-all duration-200 ease-in-out
              ${
                loading ? 'bg-opacity-80' : 'bg-opacity-100 hover:bg-opacity-80'
              }
              ${priorityColor[priority]}`}
          >
            <p className='text-sm text-neutral-50'>{priority}</p>
            <ArrowPathIcon
              className={`w-4 text-neutral-50 ${
                loading ? 'animate-spin' : 'animate-none'
              }`}
            />
          </div>
        </Menu.Button>

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
            className='absolute left-0 z-10 mt-2 w-32 origin-top-right 
            divide-y divide-gray-100 rounded-md bg-white shadow-lg  
            ring-1 ring-black ring-opacity-5 focus:outline-none'
          >
            <div className='px-1 py-1'>
              {['low', 'medium', 'high', 'highest'].map((item) => (
                <Menu.Item key={item} as='div' onClick={() => onChange(item)}>
                  {({ active }) => (
                    <button
                      className={`group flex w-full items-center justify-between 
                      rounded-md px-2 py-2 text-sm
                      ${
                        active
                          ? 'bg-emerald-600 text-white'
                          : 'text-neutral-900'
                      } `}
                    >
                      {item}
                      <CheckIcon
                        className={`w-5
                        ${priority === item ? 'opacity-100' : 'opacity-0'}
                        ${active ? 'text-white' : 'text-emerald-600'}`}
                      />
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

export default Priority
