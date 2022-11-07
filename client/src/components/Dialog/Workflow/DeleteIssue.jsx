import { Dialog, Transition } from '@headlessui/react'
import { actDeleteIssue, setDataProject } from 'actions'
import { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'

export default function DeleteIssue({ closeModal, data: { id } }) {
  //? Connect router
  const history = useHistory()
  const { pid } = useParams()

  //? Connect redux store
  const { _dataProjects } = useSelector((state) => state._project)
  const dispatch = useDispatch()

  //? State
  const onSubmit = () => {
    const currentProjectsList = [..._dataProjects]
    const onSuccess = () => {
      dispatch(
        setDataProject(currentProjectsList.filter((item) => item._id !== id))
      )
      closeModal()
      history.push(`/projects/${pid}`)
    }

    dispatch(actDeleteIssue(id, onSuccess))
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
          className='my-8 inline-block w-full max-w-xl transform
          rounded-md border border-neutral-800 bg-[#232323] p-6 text-left 
          align-middle shadow-xl transition-all'
        >
          <Dialog.Title
            as='h3'
            className='text-center text-lg font-bold leading-6 text-neutral-200'
          >
            Remove issue
          </Dialog.Title>
          <div className='mt-5'>
            <div className='mt-2 space-y-6'>
              <p className='space-y-2 text-sm text-neutral-200'>
                <span className='block'>
                  Are you absolutely sure you want to delete issue?
                </span>
              </p>

              <p className='rounded-lg bg-red-600 p-4 text-sm text-white'>
                <span className='font-bold'>Warning:</span> This action is not
                reversible. Please be certain.
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
              Remove
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
