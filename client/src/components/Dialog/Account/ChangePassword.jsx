import { Dialog, Transition } from '@headlessui/react'
import { joiResolver } from '@hookform/resolvers/joi'
import { actChangePassword } from 'actions'
import { useInput } from 'hooks'
import Joi from 'joi'
import { Fragment, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

const schema = Joi.object({
  newPassword: Joi.string().min(6).required(),
  currentPassword: Joi.string().min(6).required()
})

const ChangePassword = ({ closeModal }) => {
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors }
  } = useForm({
    resolver: joiResolver(schema)
  })

  const { value: rePassValue, bind: rePassBind } = useInput('')

  const dispatch = useDispatch()

  const [rePassError, setRePassError] = useState('')

  const onSubmit = (data) => {
    const onSuccess = () => {
      closeModal()
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    }
    const onError = (message) => {
      if (['current password is incorrect'].includes(message)) {
        setError('currentPassword', {
          type: 'custom',
          message
        })

        return
      }

      if (
        [
          'new password is invalid',
          'new password is same your current password'
        ].includes(message)
      ) {
        setError('newPassword', {
          type: 'custom',
          message
        })
        return
      }
    }

    if (rePassValue === data.newPassword)
      dispatch(actChangePassword(data, onSuccess, onError))
  }

  useEffect(() => {
    if (rePassValue !== '' && rePassValue !== getValues('newPassword')) {
      setRePassError('Please enter the correct new password')
    }

    if (rePassValue !== '' && rePassValue === getValues('newPassword')) {
      setRePassError('')
    }
  }, [rePassValue, getValues])

  useEffect(() => {
    if (
      getValues('currentPassword') !== '' &&
      getValues('newPassword') !== '' &&
      getValues('currentPassword') === getValues('newPassword')
    ) {
      setError('newPassword', {
        type: 'custom',
        message: 'Duplicate with old password'
      })
    }
  }, [getValues, setError])

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
            Change password
          </Dialog.Title>
          <div className='mt-5'>
            <form>
              <div className=''>
                <div className='py-5 sm:py-6'>
                  <div className='col-span-12'>
                    <label
                      htmlFor='currentPassword'
                      className='block text-sm font-medium text-neutral-200'
                    >
                      Current password
                    </label>
                    <input
                      {...register('currentPassword')}
                      type='password'
                      autoComplete='off'
                      className='mt-1 mb-2 block w-full rounded-md border 
                      border-gray-300 p-1 shadow-sm focus:border-emerald-500
                      focus:outline-none focus:ring-2 focus:ring-emerald-500
                      sm:text-sm'
                    />
                    {errors.currentPassword && (
                      <span className='text-xs italic text-red-500'>
                        {errors?.currentPassword?.message}
                      </span>
                    )}
                  </div>
                  <div className='col-span-12'>
                    <label
                      htmlFor='newPassword'
                      className='block text-sm font-medium text-neutral-200'
                    >
                      New password
                    </label>
                    <input
                      {...register('newPassword')}
                      type='password'
                      autoComplete='off'
                      className='mt-1 mb-2 block w-full rounded-md border 
                      border-gray-300 p-1 shadow-sm focus:border-emerald-500
                      focus:outline-none focus:ring-2 focus:ring-emerald-500
                      sm:text-sm'
                    />
                    {errors.newPassword && (
                      <span className='text-xs italic text-red-500'>
                        {errors?.newPassword?.message}
                      </span>
                    )}
                  </div>
                  <div className='col-span-12'>
                    <label
                      htmlFor='rePassword'
                      className='block text-sm font-medium text-neutral-200'
                    >
                      Re password
                    </label>
                    <input
                      {...rePassBind}
                      name='rePassword'
                      type='password'
                      autoComplete='off'
                      className='mt-1 mb-2 block w-full rounded-md border 
                      border-gray-300 p-1 shadow-sm focus:border-emerald-500
                      focus:outline-none focus:ring-2 focus:ring-emerald-500
                      sm:text-sm'
                    />
                    {rePassError && (
                      <span className='text-xs italic text-red-500'>
                        {rePassError}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className='mt-4 flex justify-end gap-2'>
            <button
              type='submit'
              className={`inline-flex cursor-pointer justify-center rounded-md 
              border border-transparent bg-emerald-600 py-2 px-4 text-sm 
              font-medium text-white shadow-sm 
              hover:bg-emerald-700 focus:outline-none`}
              onClick={handleSubmit(onSubmit)}
            >
              Change
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

export default ChangePassword
