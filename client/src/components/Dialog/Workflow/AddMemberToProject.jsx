import { Dialog, Transition } from '@headlessui/react'
import { projectApi } from 'api'
import { Fragment, useState } from 'react'
import { errorToast, successToast } from 'utilities/toast'

function AddMemberToProject({ closeModal, data: { pid, email } }) {
  const [role] = useState('member')

  const handleSubmit = async () => {
    try {
      await projectApi.addUser(pid, email)
      successToast('Invitation sent successfully')
      closeModal()
    } catch (error) {
      errorToast(error.message)
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
          className='my-8 inline-block max-w-full transform rounded-md
          border border-neutral-800 bg-[#232323] p-6 text-left align-middle 
          shadow-xl transition-all md:max-w-xl'
        >
          <Dialog.Title
            as='h3'
            className='text-lg font-bold leading-6 
            text-neutral-200'
          >
            Adding new member
          </Dialog.Title>
          <div className='mt-5'>
            <div className='mt-2 space-y-6'>
              <p className='space-y-2 text-sm text-neutral-200'>
                <span className='block'>
                  Are you sure you want to add{' '}
                  <span className='text-emerald-500'>{email}</span> to your
                  project as a <span className='text-emerald-500'>{role}</span>?
                </span>
              </p>
            </div>
          </div>

          <div className='mt-4 flex justify-end gap-2'>
            <button
              type='submit'
              className='cursor-pointer justify-center rounded-md border 
              border-transparent bg-emerald-600 py-2 px-4 text-sm font-medium 
              text-neutral-50 shadow-sm transition-all 
              duration-75 ease-linear selection:inline-flex 
              hover:bg-emerald-700 focus:outline-none'
              onClick={handleSubmit}
            >
              Sure
            </button>
            <button
              type='submit'
              className='cursor-pointer justify-center rounded-md border 
              border-transparent bg-red-600 py-2 px-4 text-sm font-medium 
              text-neutral-50 shadow-sm transition-all 
              duration-75 ease-linear selection:inline-flex 
              hover:bg-red-700 focus:outline-none'
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      </Transition.Child>
    </div>
  )
}

export default AddMemberToProject
