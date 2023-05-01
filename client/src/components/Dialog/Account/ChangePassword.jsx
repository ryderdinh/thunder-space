import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { joiResolver } from '@hookform/resolvers/joi'
import { actChangePassword } from 'actions'
import ButtonSuccess from 'components/Button/ButtonSuccess'
import { Tooltip } from 'components/Layouts'
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
  const [updating, setUpdating] = useState(false)

  const onSubmit = (data) => {
    setUpdating(true)
    const onSuccess = () => {
      closeModal()
      setUpdating(false)
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    }
    const onError = (message) => {
      setUpdating(false)

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
          <Dialog.Title
            as='h3'
            className='text-center text-lg font-bold leading-6 text-neutral-200'
          >
            Change password
          </Dialog.Title>
          <div className='mt-5'>
            <form>
              <div className=''>
                <div className='space-y-3 py-5 sm:py-6'>
                  <div className='col-span-12'>
                    <label
                      htmlFor='currentPassword'
                      className='mb-1 block text-sm font-medium text-gray-50'
                    >
                      Current password
                    </label>
                    <input
                      {...register('currentPassword')}
                      type='password'
                      autoComplete='off'
                      className='input-default z-[1]'
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
                      className='mb-1 block text-sm font-medium text-gray-50'
                    >
                      New password
                    </label>
                    <input
                      {...register('newPassword')}
                      type='password'
                      autoComplete='off'
                      className='input-default z-[1]'
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
                      className='mb-1 block text-sm font-medium text-gray-50'
                    >
                      Re password
                    </label>
                    <input
                      {...rePassBind}
                      name='rePassword'
                      type='password'
                      autoComplete='off'
                      className='input-default z-[1]'
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
            <ButtonSuccess
              size='mid'
              loading={updating}
              className=''
              onClick={handleSubmit(onSubmit)}
            >
              Change
            </ButtonSuccess>
          </div>
        </div>
      </Transition.Child>
    </div>
  )
}

export default ChangePassword
