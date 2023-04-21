import { Dialog, Transition } from '@headlessui/react'
import { actCreateTodo } from 'actions/todos'
import ButtonDanger from 'components/Button/ButtonDanger'
import ButtonSuccess from 'components/Button/ButtonSuccess'
import Input from 'components/Form/Input'
import Textarea from 'components/Form/Textarea'
import { useInput } from 'hooks'
import { Fragment, useState } from 'react'
import { useDispatch } from 'react-redux'
import { errorToast } from 'utilities/toast'

export default function CreateTodo({ closeModal, data: { onSuccess } }) {
  const [creating, setCreating] = useState(false)

  const dispatch = useDispatch()
  const titleInput = useInput()
  const descriptionInput = useInput()

  const onSubmit = async () => {
    setCreating(true)

    const onSuccess = () => {
      // dispatch(actFetchTodos())
      closeModal()
      onSuccess()
    }

    const onError = (err) => {
      errorToast(err.message, 'create-todo')
    }

    dispatch(
      actCreateTodo(
        titleInput.value,
        descriptionInput.value,
        'todo',
        false,
        onSuccess,
        onError
      )
    )
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
            Add New Todo
          </Dialog.Title>

          <div className='mt-5'>
            <div className='grid grid-cols-6 gap-5'>
              <div className='col-span-6'>
                <Input label='Title' {...titleInput.bind} />
              </div>
              <div className='col-span-6'>
                <Textarea
                  label='Description'
                  rows={5}
                  className='resize-none'
                  {...descriptionInput.bind}
                />
              </div>
            </div>
          </div>

          <div className='mt-4 flex justify-end gap-2'>
            <ButtonSuccess
              size='mid'
              loading={creating}
              className='w-20'
              onClick={onSubmit}
            >
              Add
            </ButtonSuccess>

            <ButtonDanger
              size='mid'
              disabled={creating}
              className='w-20'
              onClick={closeModal}
            >
              Cancel
            </ButtonDanger>
          </div>
        </div>
      </Transition.Child>
    </div>
  )
}
