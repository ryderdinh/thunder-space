import { Dialog, Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/solid'
import { joiResolver } from '@hookform/resolvers/joi'
import { actCreateIssue } from 'actions'
import 'assets/css/pickydatetime.css'
import Joi from 'joi'
import { forwardRef, Fragment, useState } from 'react'
import 'react-date-range/dist/styles.css' // main css file
import 'react-date-range/dist/theme/default.css' // theme css file
import ReactDatePicker from 'react-datepicker'
import { useController, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { addMonths } from 'date-fns'
import 'react-datepicker/dist/react-datepicker.css'

const typeOfIssues = ['task', 'bug']
const typeOfPriority = ['low', 'medium', 'high', 'highest']

const schema = Joi.object({
  name: Joi.string().min(2).max(60).required(),
  type: Joi.string().allow('task', 'bug').required(),
  priority: Joi.string().allow('low', 'medium', 'high', 'highest').required(),
  assigned: Joi.string().allow('')
})

export default function CreateIssue({ closeModal }) {
  //? Connect redux store============================
  const { _dataProject } = useSelector((state) => state._project)

  const dispatch = useDispatch()

  //? Router=========================================
  const history = useHistory()

  //? State==========================================
  const [estimate, setEstimate] = useState(new Date())

  //? Hook Form======================================
  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useForm({
    resolver: joiResolver(schema)
  })

  console.log(_dataProject)

  const onSubmitForm = (data) => {
    dispatch(
      actCreateIssue(
        _dataProject._id.toString(),
        {
          ...data,
          assigned: !data?.assigned ? '' : data.assigned,
          estimate: estimate.getTime()
        },
        onSuccessCreate
      )
    )
  }

  const onSuccessCreate = (iid) => {
    history.push(`/projects/${_dataProject._id}/${iid}`)
    closeModal()
  }
  //? forward component
  const EstimateComponent = forwardRef(({ value, onClick }, ref) => {
    return (
      <input
        type='text'
        autoComplete='none'
        className='mt-1 block w-full rounded-md border border-neutral-300 
        py-[7px] pl-3 shadow-sm focus:border-emerald-500 focus:outline-none 
        focus:ring-2 focus:ring-emerald-500 sm:text-sm'
        onClick={onClick}
        ref={ref}
        defaultValue={value}
      />
    )
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
          className='relative my-8 inline-block w-4/5 max-w-5xl
          transform rounded-md border border-neutral-800 bg-[#232323] p-6 
          text-left align-middle shadow-xl transition-all'
        >
          <Dialog.Title
            as='h3'
            className='text-lg font-bold leading-6 text-neutral-200'
          >
            Add Issue
          </Dialog.Title>
          <div className='mt-2'>
            <form action='#' method='POST'>
              <div className=''>
                <div className='py-5 sm:py-6'>
                  <div className='grid grid-cols-12 gap-6'>
                    <div className='col-span-12 sm:col-span-12'>
                      <label className='block text-sm font-medium text-neutral-200'>
                        Name
                      </label>
                      <input
                        {...register('name')}
                        type='text'
                        autoComplete='none'
                        className='mt-1 block w-full rounded-md border border-neutral-300 
                        py-[7px] pl-3 shadow-sm focus:border-emerald-500 focus:outline-none 
                        focus:ring-2 focus:ring-emerald-500 sm:text-sm'
                      />

                      {errors.name && (
                        <span className='text-xs italic text-red-500'>
                          {errors?.name?.message}
                        </span>
                      )}
                    </div>

                    <div className='col-span-12 md:col-span-4'>
                      <label className='block text-sm font-medium text-neutral-200'>
                        Project{' '}
                        <span className='text-xs italic text-neutral-500'>
                          (current)
                        </span>
                      </label>
                      <input
                        disabled
                        type='text'
                        value={_dataProject?.name || ''}
                        onChange={() => {}}
                        className='mt-1 block w-full rounded-md border border-neutral-300
                        p-1 py-[7px] pl-3 shadow-sm focus:outline-none 
                        disabled:border-neutral-200 disabled:bg-neutral-50 
                        disabled:text-neutral-500 sm:text-sm'
                      />
                    </div>

                    <div className='col-span-12 md:col-span-4'>
                      <label className='block text-sm font-medium text-neutral-200'>
                        Type
                      </label>
                      <ListBoxNonMultiple
                        name={'type'}
                        control={control}
                        selectList={typeOfIssues}
                      />

                      {errors.type && (
                        <span className='text-xs italic text-red-500'>
                          {errors?.type?.message}
                        </span>
                      )}
                    </div>

                    <div className='col-span-12 md:col-span-4'>
                      <label className='block text-sm font-medium text-neutral-200'>
                        Priority
                      </label>
                      <ListBoxNonMultiple
                        name={'priority'}
                        control={control}
                        selectList={typeOfPriority}
                      />

                      {errors.priority && (
                        <span className='text-xs italic text-red-500'>
                          {errors?.priority?.message}
                        </span>
                      )}
                    </div>

                    <div className='col-span-12 md:col-span-4'>
                      <label className='block text-sm font-medium text-neutral-200'>
                        Assignee
                      </label>
                      <ListBoxImageNonMultiple
                        name={'assigned'}
                        control={control}
                        people={[
                          { name: 'None', email: '', _id: 'none', avatar: '' },
                          ...(_dataProject?.member || [])
                        ]}
                      />

                      {errors.assigned && (
                        <span className='text-xs italic text-red-500'>
                          {errors?.assigned?.message}
                        </span>
                      )}
                    </div>

                    <div className='col-span-12 md:col-span-8'>
                      <label className='block text-sm font-medium text-neutral-200'>
                        Estimate
                      </label>

                      <ReactDatePicker
                        selected={estimate}
                        onChange={(date) => setEstimate(date)}
                        timeInputLabel='Time:'
                        dateFormat='dd/MM/yyyy hh:mm aa'
                        showTimeInput
                        customInput={<EstimateComponent />}
                        minDate={new Date()}
                        maxDate={addMonths(new Date(), 5)}
                        showDisabledMonthNavigation
                      ></ReactDatePicker>
                    </div>
                  </div>
                </div>
              </div>
            </form>
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

function ListBoxNonMultiple({ selectList, ...props }) {
  const {
    field: { value, onChange }
  } = useController(props)

  return (
    <Listbox value={value} onChange={onChange}>
      <div className='relative mt-1 w-full'>
        <Listbox.Button
          className='relative w-full cursor-default rounded-lg
          bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none
          focus-visible:border-emerald-500 focus-visible:ring-2 
          focus-visible:ring-white focus-visible:ring-opacity-75 
          focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-300 
          sm:text-sm'
        >
          <span className='block truncate'>{value ? value : 'Select'}</span>
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
            className='absolute z-10 mt-1 max-h-60 w-full
            overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1
            ring-neutral-900 ring-opacity-5 focus:outline-none sm:text-sm'
          >
            {selectList.map((item, index) => (
              <Listbox.Option
                key={index}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? 'bg-emerald-600 text-white' : 'text-neutral-900'
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
                      {item}
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

function ListBoxImageNonMultiple({ people, ...props }) {
  const {
    field: { value, onChange }
  } = useController(props)

  const handleOnChange = (value) => {
    onChange(value)
  }

  const isSelected = (email) => {
    const userSelected = people.find((el) => el.email === email)
    return userSelected
  }

  return (
    <Listbox
      value={value}
      onChange={(e) => {
        handleOnChange(e)
      }}
    >
      <div className='relative mt-1 w-full'>
        <Listbox.Button
          className='relative w-full cursor-default rounded-lg
          bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none
          focus-visible:border-emerald-500 focus-visible:ring-2 
          focus-visible:ring-white focus-visible:ring-opacity-75 
          focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-300 
          sm:text-sm'
        >
          <span className='block truncate'>
            {isSelected(value)?.name ? isSelected(value).name : 'Select'}
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
            className='absolute z-10 mt-1 max-h-60 w-full overflow-auto
            rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-neutral-900
            ring-opacity-5 focus:outline-none sm:text-sm'
          >
            {people.map((person) => (
              <Listbox.Option
                key={person._id.toString()}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-14 pr-4 ${
                    active ? 'bg-emerald-600 text-white' : 'text-neutral-900'
                  }`
                }
                value={person.email}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {person.name}
                    </span>

                    {person.avatar ? (
                      <span
                        className='absolute inset-y-0 left-0 flex items-center
                        pl-3'
                      >
                        <img
                          src={person.avatar}
                          className='h-8 w-8 rounded-full object-cover transition-all group-hover:scale-110'
                          alt='avatar'
                        />
                      </span>
                    ) : (
                      ''
                    )}
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
