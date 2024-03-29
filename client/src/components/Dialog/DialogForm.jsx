import { Dialog as DialogHeadlessui, Transition } from '@headlessui/react'
import { Fragment } from 'react'

const DialogForm = ({ children, isDialogOpen, onClose }) => {
  return (
    <Transition appear show={isDialogOpen} as={Fragment}>
      <DialogHeadlessui
        as='div'
        className='fixed inset-0 z-10 h-screen'
        onClose={onClose}
      >
        <DialogHeadlessui.Overlay
          className='absolute top-0 h-full w-full 
          bg-neutral-900 opacity-70'
        />
        <div className='min-h-screen px-4 text-center'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <DialogHeadlessui.Overlay className='fixed inset-0' />
          </Transition.Child>

          <span
            className='inline-block h-screen align-middle'
            aria-hidden='true'
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            {children}
          </Transition.Child>
        </div>
      </DialogHeadlessui>
    </Transition>
  )
}

export default DialogForm
