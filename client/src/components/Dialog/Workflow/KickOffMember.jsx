import { Dialog, Transition } from '@headlessui/react'
import { projectApi } from 'api'
import { Fragment } from 'react'
import { errorToast, successToast } from 'utilities/toast'

export default function KickOffMember({
  closeModal,
  data: { name, pid, uid, onSuccess }
}) {
  const onSubmit = async () => {
    try {
      await projectApi.removeUser(pid, uid)
      successToast('Kick off successfully')
      onSuccess()
      closeModal()
    } catch (error) {
      errorToast('Failed! ' + error.message)
    }
  }

  return (
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
        <Dialog.Overlay className='fixed inset-0' />
      </Transition.Child>

      <span className='inline-block h-screen align-middle' aria-hidden='true'>
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
        <div
          className='my-8 inline-block w-full max-w-md transform
          rounded-md border border-neutral-800 bg-[#232323] p-6 text-left 
          align-middle shadow-xl transition-all'
        >
          <Dialog.Title
            as='h3'
            className='text-center text-lg font-bold leading-6 text-neutral-200'
          >
            Kick off member
          </Dialog.Title>
          <div className='mt-5'>
            <div className='mt-2 space-y-6'>
              <p className='space-y-2 text-sm text-neutral-200'>
                <span className='block'>
                  Are you sure you want to remove{' '}
                  <span className='font-bold'>{name}</span> from the project?
                </span>
              </p>
            </div>
          </div>

          <div className='mt-4 flex justify-end gap-2'>
            <button
              type='submit'
              className='cursor-pointer justify-center rounded-md border 
              border-transparent bg-emerald-600 py-2 px-4 text-sm font-medium 
              text-white shadow-sm selection:inline-flex 
              hover:bg-emerald-700 focus:outline-none'
              onClick={onSubmit}
            >
              Yes, I'm sure
            </button>

            <button
              type='button'
              className='inline-flex justify-center rounded-md border 
              border-transparent px-4 py-2 text-sm font-medium
              text-neutral-400 transition-all duration-300 ease-in-out 
              hover:bg-neutral-500 hover:text-neutral-200 focus:outline-none 
              focus-visible:ring-2 focus-visible:ring-neutral-500 
              focus-visible:ring-offset-2'
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </div>
      </Transition.Child>
    </div>
  )
}
