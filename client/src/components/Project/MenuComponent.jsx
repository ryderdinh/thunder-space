import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { LayoutContext } from 'context/LayoutContext'
import { Fragment, useContext } from 'react'

export default function MenuComponent({ children }) {
  // const { openDialog } = useContext(LayoutContext)

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
          {children}
          {/* <div className='px-1 py-1 '>
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
          </div> */}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
