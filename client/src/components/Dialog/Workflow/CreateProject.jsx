import { Dialog, Listbox, Transition } from '@headlessui/react'
import { joiResolver } from '@hookform/resolvers/joi'
import { actCreateProject, actGetAllUsers } from 'actions'
import ButtonDanger from 'components/Button/ButtonDanger'
import ButtonSuccess from 'components/Button/ButtonSuccess'
import Joi from 'joi'
import { Fragment, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { errorToast, successToast } from 'utilities/toast'

const schema = Joi.object({
  name: Joi.string().min(2).max(25).required(),
  description: Joi.string().allow('').max(300),
  managers: Joi.array().items(Joi.string()),
  members: Joi.array().items(Joi.string()).default([])
})

export default function CreateProject({ closeModal }) {
  const { email: yourMail } = useSelector(
    (state) => state._staffInfomation._data
  )
  const { data, isLoading } = useSelector((state) => state._users)
  const dispatch = useDispatch()

  const history = useHistory()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    resolver: joiResolver(schema)
  })

  const [selectedManagers, setSelectedManagers] = useState([yourMail])
  const [selectedMembers, setSelectedMembers] = useState([])
  const [creating, setCreating] = useState(false)

  const onSubmitForm = (data) => {
    const onError = (err) => {
      errorToast(err.message, { id: 'create-project' })
      setCreating(false)
    }
    setCreating(true)
    dispatch(actCreateProject(data, yourMail, handleWhenSuccessCreate, onError))
  }

  const handleWhenSuccessCreate = (pid) => {
    setCreating(false)
    closeModal()
    successToast('Created new project', { id: 'create-project' })
    history.push(`/projects/${pid}`)
  }

  useEffect(() => {
    dispatch(actGetAllUsers())
  }, [dispatch])

  const checkValidUser = (email, arrName) => {
    let userCheck = false

    if (arrName === 'managers') {
      userCheck = selectedMembers.includes(email)
    } else {
      userCheck = selectedManagers.includes(email)
    }

    return !userCheck
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

      {/* This element is to trick the browser into centering the modal contents. */}
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
          className='my-8 inline-block max-h-screen w-full max-w-2xl transform
          overflow-scroll rounded-md border border-neutral-800 bg-[#232323] 
          p-4 text-left align-middle shadow-xl transition-all md:w-4/6 md:p-6'
        >
          <Dialog.Title
            as='h3'
            className='text-lg font-bold leading-6 text-neutral-200'
          >
            Create Project
          </Dialog.Title>
          <div className='mt-2'>
            {isLoading && (
              <p className='w-full py-16 text-center text-xs text-neutral-500'>
                Loading...
              </p>
            )}

            {!isLoading && (
              <form>
                <div className=''>
                  <div className='py-5 sm:py-6'>
                    <div className='grid grid-cols-6 gap-6'>
                      <div className='col-span-6'>
                        <label
                          htmlFor='name'
                          className='block text-sm font-medium text-neutral-200'
                        >
                          Name
                        </label>
                        <input
                          {...register('name')}
                          autoComplete='off'
                          className='mt-1 block w-full rounded-md border border-neutral-300 
                          p-2 shadow-sm focus:border-emerald-500  focus:outline-none 
                          focus:ring-2 focus:ring-emerald-500 sm:text-sm'
                        />
                        {errors.name && (
                          <span className='text-xs italic text-red-500'>
                            {errors?.name?.message}
                          </span>
                        )}
                      </div>

                      <div className='col-span-6 sm:col-span-3'>
                        <label
                          htmlFor='type-of-issue'
                          className='block text-sm font-medium text-neutral-200'
                        >
                          Managers
                        </label>

                        <ListBoxMultipleUser
                          name='managers'
                          yourMail={yourMail}
                          people={data}
                          selected={selectedManagers}
                          setSelected={setSelectedManagers}
                          setValueHookForm={setValue}
                          checkValidUser={checkValidUser}
                        />

                        <span className='text-xs italic text-neutral-500'>
                          You is manager (Obligatory)
                        </span>
                        {errors.managers && (
                          <span className='text-xs italic text-red-500'>
                            {errors?.managers?.message}
                          </span>
                        )}
                      </div>

                      <div className='col-span-6 sm:col-span-3'>
                        <label
                          htmlFor='assignee'
                          className='block text-sm font-medium text-neutral-200'
                        >
                          Members
                        </label>

                        <ListBoxMultipleUser
                          name='members'
                          yourMail={yourMail}
                          people={data}
                          selected={selectedMembers}
                          setSelected={setSelectedMembers}
                          setValueHookForm={setValue}
                          checkValidUser={checkValidUser}
                        />

                        {errors.members && (
                          <span className='text-xs italic text-red-500'>
                            {errors?.members?.message}
                          </span>
                        )}
                      </div>

                      <div className='col-span-6'>
                        <label
                          htmlFor='project-description'
                          className='block text-sm font-medium text-neutral-200'
                        >
                          Description
                        </label>

                        <textarea
                          {...register('description')}
                          autoComplete='off'
                          rows={3}
                          className='mt-1 block w-full rounded-md border border-neutral-300 
                          p-1 shadow-sm focus:border-emerald-500  focus:outline-none 
                          focus:ring-2 focus:ring-emerald-500 sm:text-sm'
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            )}
          </div>

          <div className='mt-4 flex justify-end gap-2'>
            <ButtonSuccess
              size='mid'
              loading={creating}
              className='w-24'
              onClick={handleSubmit(onSubmitForm)}
            >
              Create
            </ButtonSuccess>

            <ButtonDanger
              size='mid'
              disabled={creating}
              className='w-24'
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

function ListBoxMultipleUser({
  name,
  yourMail,
  people,
  selected,
  setSelected,
  setValueHookForm,
  checkValidUser
}) {
  const [isOpen, setIsOpen] = useState(false)

  const isSelected = (value) =>
    selected.find((el) => el === value) ? true : false

  const handleSelect = (value) => {
    if (!isSelected(value)) {
      const emailSelected = people.find((el) => el.email === value)
      const selectedUpdated = [...selected, emailSelected.email]

      setSelected(selectedUpdated)

      if (name === 'members') setValueHookForm('members', selectedUpdated)
      else setValueHookForm('managers', selectedUpdated)
    } else {
      handleDeselect(value)
    }
    setIsOpen(true)
  }

  const handleDeselect = (value) => {
    const selectedUpdated = selected.filter((el) => el !== value)

    setSelected(selectedUpdated)

    if (name === 'members') setValueHookForm('members', selectedUpdated)
    else setValueHookForm('managers', selectedUpdated)

    setIsOpen(true)
  }

  return (
    <Listbox
      as='div'
      className='space-y-1'
      value={selected}
      onChange={(value) => handleSelect(value)}
      open={isOpen}
    >
      <div
        className='relative mt-1 w-full'
        onClick={() => {
          setIsOpen(!isOpen)
        }}
      >
        <Listbox.Button
          className='relative w-full cursor-default rounded-lg
          bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none
          focus-visible:border-emerald-500 focus-visible:ring-2
          focus-visible:ring-white focus-visible:ring-opacity-75
          focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-300
          md:text-sm'
          open={isOpen}
        >
          <span className='block truncate'>
            {selected.length < 1
              ? `Select ${name}`
              : `Selected ${name} (${selected.length})`}
          </span>
          <span
            className='pointer-events-none absolute inset-y-0 right-0
            flex items-center pr-2'
          >
            <svg
              className='h-5 w-5 text-neutral-400'
              viewBox='0 0 20 20'
              fill='none'
              stroke='currentColor'
            >
              <path
                d='M7 7l3-3 3 3m0 6l-3 3-3-3'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </span>
        </Listbox.Button>

        <Transition
          as={Fragment}
          show={isOpen}
          leave='transition ease-in duration-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <Listbox.Options
            className='absolute z-10 mt-1 max-h-36 w-full overflow-auto
            rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-neutral-900
            ring-opacity-5 focus:outline-none sm:text-sm md:max-h-60'
          >
            {people.length < 1 && (
              <p className='w-full py-1 text-center text-xs text-neutral-500'>
                Not found
              </p>
            )}
            {people.map((Manager) => {
              if (
                checkValidUser(Manager.email, name) &&
                Manager.email !== yourMail
              ) {
                const selected = isSelected(Manager.email)
                return (
                  <Listbox.Option
                    key={Manager._id}
                    value={Manager.email}
                    disabled={Manager.email === yourMail}
                  >
                    {({ active }) => (
                      <div
                        className={`${
                          active
                            ? 'bg-emerald-600 text-neutral-50'
                            : 'text-neutral-900'
                        } relative cursor-default select-none py-2 pl-10 pr-4 md:pl-14
                        ${Manager.email === yourMail ? 'opacity-30' : ''}
                        `}
                      >
                        <span
                          className={`${
                            selected ? 'font-semibold' : 'font-normal'
                          } block truncate text-sm md:text-base`}
                        >
                          {`${Manager.name}${
                            Manager.email === yourMail ? ' (You)' : ''
                          }`}
                        </span>
                        <span
                          className='absolute inset-y-0 left-0 flex items-center
                          p-3 pr-0'
                        >
                          <img
                            src={Manager.avatar}
                            className='h-5 w-5 rounded-full border-2 
                            border-neutral-100 object-cover transition-all group-hover:scale-110
                            md:h-8 md:w-8'
                            alt='avatar'
                          />
                        </span>
                        {selected && (
                          <span
                            className={`${
                              active ? 'text-white' : 'text-emerald-600'
                            } absolute inset-y-0 right-0 flex items-center pr-1.5`}
                          >
                            <svg
                              className='h-5 w-5'
                              xmlns='http://www.w3.org/2000/svg'
                              viewBox='0 0 20 20'
                              fill='currentColor'
                            >
                              <path
                                fillRule='evenodd'
                                d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                                clipRule='evenodd'
                              />
                            </svg>
                          </span>
                        )}
                      </div>
                    )}
                  </Listbox.Option>
                )
              }

              return null
            })}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}
