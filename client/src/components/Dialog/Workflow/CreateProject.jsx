import { Dialog, Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/solid'
import { joiResolver } from '@hookform/resolvers/joi'
import { actCreateProject, actGetAllUsers } from 'actions'
import Joi from 'joi'
import { Fragment, useEffect, useState } from 'react'
import { useController, useForm } from 'react-hook-form'
import ReactNiceAvatar, { genConfig } from 'react-nice-avatar'
import { useDispatch, useSelector } from 'react-redux'

const schema = Joi.object({
  name: Joi.string().required(),
  code: Joi.string().required(),
  managers: Joi.array().items(Joi.string()),
  members: Joi.array().items(Joi.string()).required()
})

export default function CreateProject({ closeModal }) {
  const { email: yourMail } = useSelector(
    (state) => state._staffInfomation._staffInfomation
  )
  const { data, isLoading } = useSelector((state) => state._users)
  const dispatch = useDispatch()

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

  const onSubmitForm = (data) => {
    dispatch(actCreateProject(data, yourMail))
    closeModal()
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
          className='my-8 inline-block w-4/6 max-w-2xl transform
          rounded-md border border-neutral-800 bg-[#232323] p-6 text-left 
          align-middle shadow-xl transition-all'
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
                loading...
              </p>
            )}

            {!isLoading && (
              <form>
                <div className=''>
                  <div className='py-5 sm:py-6'>
                    <div className='grid grid-cols-6 gap-6'>
                      <div className='col-span-6 sm:col-span-3'>
                        <label
                          htmlFor='name'
                          className='block text-sm font-medium text-zinc-200'
                        >
                          Name
                        </label>
                        <input
                          {...register('name', { required: true })}
                          autoComplete='off'
                          className='mt-1 block w-full rounded-md border border-gray-300 
                        p-1 shadow-sm focus:border-emerald-500  focus:outline-none 
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
                          htmlFor='project-code'
                          className='block text-sm font-medium text-zinc-200'
                        >
                          Code
                        </label>

                        <input
                          {...register('code', { required: true })}
                          autoComplete='off'
                          className='mt-1 block w-full rounded-md border border-gray-300 
                        p-1 shadow-sm focus:border-emerald-500  focus:outline-none 
                        focus:ring-2 focus:ring-emerald-500 sm:text-sm'
                        />

                        {errors.code && (
                          <span className='text-xs italic text-red-500'>
                            {errors?.code?.message}
                          </span>
                        )}
                      </div>

                      <div className='col-span-6 sm:col-span-3'>
                        <label
                          htmlFor='type-of-issue'
                          className='block text-sm font-medium text-zinc-200'
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
                          className='block text-sm font-medium text-zinc-200'
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
                    </div>
                  </div>
                </div>
              </form>
            )}
          </div>

          <div className='mt-4 flex justify-end gap-2'>
            <button
              type='submit'
              className='inline-flex justify-center rounded-md border 
              border-transparent bg-emerald-600 py-2 px-4 text-sm font-medium 
              text-white shadow-sm hover:bg-emerald-700 focus:outline-none'
              onClick={handleSubmit(onSubmitForm)}
            >
              Create
            </button>

            <button
              type='button'
              className='inline-flex justify-center rounded-md border 
              border-transparent px-4 py-2 text-sm font-medium
              text-red-500 transition-all duration-300 ease-in-out 
              hover:bg-red-500 hover:text-red-200 focus:outline-none focus-visible:ring-2 
              focus-visible:ring-red-500 focus-visible:ring-offset-2'
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

function ListBoxManager({ typeOfIssues, ...props }) {
  const {
    field: { value, onChange }
  } = useController(props)

  return (
    <Listbox value={value} onChange={onChange}>
      <div className='relative mt-1 w-full'>
        <Listbox.Button
          className='relative w-full cursor-default rounded-lg
          bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none
          focus-visible:border-indigo-500 focus-visible:ring-2 
          focus-visible:ring-white focus-visible:ring-opacity-75 
          focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-300 
          sm:text-sm'
        >
          <span className='block truncate'>
            {value ? value.name : 'Select Manager'}
          </span>
          <span
            className='pointer-events-none absolute inset-y-0 right-0 flex 
            items-center pr-2'
          >
            <ChevronDownIcon
              className='h-5 w-5 text-neutral-400'
              aria-hidden='true'
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave='transition ease-in duration-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <Listbox.Options
            className='absolute mt-1 max-h-60 w-full overflow-auto
            rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-neutral-900
            ring-opacity-5 focus:outline-none sm:text-sm'
          >
            {typeOfIssues.map((item, ManagerIdx) => (
              <Listbox.Option
                key={ManagerIdx}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active
                      ? 'bg-emerald-100 text-emerald-900'
                      : 'text-neutral-900'
                  }`
                }
                value={item}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {item.name}
                    </span>
                    {selected ? (
                      <span
                        className='absolute inset-y-0 left-0 flex items-center
                        pl-3 text-emerald-600'
                      >
                        <CheckIcon className='h-5 w-5' aria-hidden='true' />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}

function ListBoxUser() {
  const people = [{ name: 'Wade Cooper' }, { name: 'Arlene Mccoy' }]
  const [selected, setSelected] = useState(people[0])
  const config = genConfig()

  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className='relative mt-1 w-full'>
        <Listbox.Button
          className='relative w-full cursor-default rounded-lg
          bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none
          focus-visible:border-indigo-500 focus-visible:ring-2 
          focus-visible:ring-white focus-visible:ring-opacity-75 
          focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 
          sm:text-sm'
        >
          <span className='block truncate'>{selected.name}</span>
          <span
            className='pointer-events-none absolute inset-y-0 right-0 flex 
            items-center pr-2'
          >
            <ChevronDownIcon
              className='h-5 w-5 text-neutral-400'
              aria-hidden='true'
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave='transition ease-in duration-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <Listbox.Options
            className='absolute mt-1 max-h-60 w-full overflow-auto
            rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black
            ring-opacity-5 focus:outline-none sm:text-sm'
          >
            {people.map((Manager, ManagerIdx) => (
              <Listbox.Option
                key={ManagerIdx}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-14 pr-4 ${
                    active
                      ? 'bg-emerald-100 text-emerald-900'
                      : 'text-neutral-900'
                  }`
                }
                value={Manager}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {Manager.name}
                    </span>
                    <span
                      className='absolute inset-y-0 left-0 flex items-center
                        pl-3 '
                    >
                      <ReactNiceAvatar
                        className='h-8 w-8 transition-all group-hover:scale-110'
                        {...config}
                      />
                    </span>
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
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
          focus-visible:border-indigo-500 focus-visible:ring-2
          focus-visible:ring-white focus-visible:ring-opacity-75
          focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-300
          sm:text-sm'
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
              className='h-5 w-5 text-gray-400'
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
            className='absolute z-10 mt-1 max-h-60 w-full
            overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1
            ring-neutral-900 ring-opacity-5 focus:outline-none sm:text-sm'
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
                          active ? 'bg-emerald-600 text-white' : 'text-gray-900'
                        } relative cursor-default select-none py-2 pl-14 pr-4
                        ${Manager.email === yourMail ? 'opacity-30' : ''}
                        `}
                      >
                        <span
                          className={`${
                            selected ? 'font-semibold' : 'font-normal'
                          } block truncate`}
                        >
                          {`${Manager.name}${
                            Manager.email === yourMail ? ' (You)' : ''
                          }`}
                        </span>
                        <span
                          className='absolute inset-y-0 left-0 flex items-center
                        pl-3 '
                        >
                          <img
                            src={Manager.avatar}
                            className='h-8 w-8 transition-all group-hover:scale-110'
                            alt='avatar'
                          />
                        </span>
                        {selected && (
                          <span
                            className={`${
                              active ? 'text-white' : 'text-blue-600'
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
        {/* <div className='pt-1 text-sm'>
          {selected.length > 0 && (
            <>Selected Managers: {selected.join(', ')}</>
          )}
        </div> */}
      </div>
    </Listbox>
  )
}
