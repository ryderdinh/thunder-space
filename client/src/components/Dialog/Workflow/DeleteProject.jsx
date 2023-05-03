import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { joiResolver } from '@hookform/resolvers/joi'
import { actDeleteProject } from 'actions'
import ButtonSuccess from 'components/Button/ButtonSuccess'
import { Tooltip } from 'components/Layouts'
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
  const [updating, setUpdating] = useState(false)

  const onSubmit = (data) => {
    const onSuccess = () => {
      closeModal()
      setUpdating(false)
      history.push('/projects')
    }

    const onError = (err) => {
      console.error(err)
    }

    if (allowDelete) {
      setUpdating(true)
      dispatch(actDeleteProject(pid, onSuccess, onError))
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setAllowDelete(watch('name') === projectName.trim())
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
            Delete project
          </Dialog.Title>

          <div className='absolute right-6 top-6 h-6 w-6' onClick={closeModal}>
            <Tooltip title={'Close'}>
              <div
                className='transition-default flex h-6 w-6 cursor-pointer
                items-center justify-center rounded-5 border border-gray-400 
                bg-gray-600 hover:bg-gray-400'
              >
                <XMarkIcon className='text-gray-50' />
              </div>
            </Tooltip>
          </div>

          <div className='mt-5'>
            <div className='mt-2 space-y-6'>
              <p className='space-y-2 text-sm text-neutral-200'>
                <span className='block'>
                  Are you absolutely sure you want to delete{' '}
                  <span className='font-bold text-emerald-600'>
                    {projectName}
                  </span>{' '}
                  ?
                </span>
                <span className='block'>
                  If you have submitted a support request about this site, it
                  will be difficult for ThunderSpace’s Support team to help you
                  debug the situation if you delete it.
                </span>
              </p>

              <p className='rounded-lg bg-red-600 p-3 text-sm text-neutral-50 md:p-4'>
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
                      className='input-default mb-2'
                    />
                    <div className='flex gap-1'>
                      <p className='text-sm'>👉</p>
                      <code className='m-0 text-xs italic text-neutral-50'>
                        {projectName}
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className='mt-4 flex justify-end gap-2'>
            <ButtonSuccess
              size='mid'
              loading={updating}
              onClick={handleSubmit(onSubmit)}
              disabled={!allowDelete}
            >
              Delete
            </ButtonSuccess>
          </div>
        </div>
      </Transition.Child>
    </div>
  )
}
