import { Dialog, Transition } from '@headlessui/react'
import { joiResolver } from '@hookform/resolvers/joi'
import { actDeleteProject } from 'actions'
import Joi from 'joi'
import { Fragment, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

const schema = Joi.object({
  name: Joi.string().required()
})

export default function DeleteProject({
  closeModal,
  data: { projectName, pid }
}) {
  const history = useHistory()

  const dispatch = useDispatch()

  const { register, handleSubmit, watch } = useForm({
    resolver: joiResolver(schema)
  })

  const [allowDelete, setAllowDelete] = useState(false)

  const handleDeleteSuccessfully = () => {
    closeModal()
    history.push('/projects')
  }

  const onSubmit = (data) => {
    allowDelete && dispatch(actDeleteProject(pid, handleDeleteSuccessfully))
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (watch('name') === projectName) {
      setAllowDelete(true)
    } else setAllowDelete(false)
  })

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
            Remove project
          </Dialog.Title>
          <div className='mt-5'>
            <div className='mt-2 space-y-6'>
              <p className='space-y-2 text-sm text-neutral-200'>
                <span className='block'>
                  Are you absolutely sure you want to delete{' '}
                  <span className='font-bold'>{projectName}</span>?
                </span>
                <span className='block'>
                  If you have submitted a support request about this site, it
                  will be difficult for ThunderSpace’s Support team to help you
                  debug the situation if you delete it.
                </span>
              </p>

              <p className='rounded-lg bg-red-600 p-4 text-sm text-white'>
                <span className='font-bold'>Warning:</span> This action is not
                reversible. Please be certain.
              </p>
            </div>
            <form>
              <div className=''>
                <div className='py-5 sm:py-6'>
                  <div className='col-span-12'>
                    <input
                      {...register('name')}
                      type='text'
                      autoComplete='off'
                      placeholder='Type in the name of the project'
                      className='mt-1 mb-2 block w-full rounded-md border border-gray-300 
                        p-1 shadow-sm focus:border-emerald-500  focus:outline-none 
                        focus:ring-2 focus:ring-emerald-500 sm:text-sm'
                    />
                    <code className='m-0 italic text-white'>{projectName}</code>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className='mt-4 flex justify-end gap-2'>
            <button
              type='submit'
              className={`inline-flex justify-center rounded-md border 
              border-transparent bg-emerald-600 py-2 px-4 text-sm font-medium 
              text-white shadow-sm focus:outline-none 
              ${
                !allowDelete
                  ? 'cursor-not-allowed opacity-50'
                  : 'hover:bg-emerald-700'
              }`}
              onClick={handleSubmit(onSubmit)}
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
