import { Dialog, Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/solid'
import { Fragment, useState } from 'react'
import ReactNiceAvatar, { genConfig } from 'react-nice-avatar'

export default function CreateIssue({ closeModal }) {
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
            Create Issue
          </Dialog.Title>
          <div className='mt-2'>
            <form action='#' method='POST'>
              <div className=''>
                <div className='py-5 sm:py-6'>
                  <div className='grid grid-cols-6 gap-6'>
                    <div className='col-span-6 sm:col-span-3'>
                      <label
                        htmlFor='first-name'
                        className='block text-sm font-medium text-zinc-200'
                      >
                        Issue name
                      </label>
                      <input
                        type='text'
                        name='first-name'
                        id='first-name'
                        autoComplete='given-name'
                        className='mt-1 block w-full rounded-md border border-gray-300 
                        p-1 shadow-sm focus:border-emerald-500  focus:outline-none 
                        focus:ring-2 focus:ring-emerald-500 sm:text-sm'
                      />
                    </div>

                    <div className='col-span-6 sm:col-span-3'>
                      <label
                        htmlFor='last-name'
                        className='block text-sm font-medium text-zinc-200'
                      >
                        Project
                      </label>
                      <input
                        disabled
                        type='text'
                        name='last-name'
                        id='last-name'
                        autoComplete='family-name'
                        value='Project UI'
                        className='mt-1 block w-full rounded-md 
                        border border-gray-300 p-1 shadow-sm focus:outline-none 
                        disabled:border-slate-200 disabled:bg-slate-50 
                        disabled:text-slate-500 sm:text-sm'
                      />
                    </div>

                    <div className='col-span-6 sm:col-span-3'>
                      <label
                        htmlFor='type-of-issue'
                        className='block text-sm font-medium text-zinc-200'
                      >
                        Type
                      </label>
                      <ListBoxTypeOfIssue />
                    </div>

                    <div className='col-span-6 sm:col-span-3'>
                      <label
                        htmlFor='assignee'
                        className='block text-sm font-medium text-zinc-200'
                      >
                        Assignee
                      </label>
                      <ListBoxUser />
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
              onClick={closeModal}
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

function ListBoxTypeOfIssue() {
  const [typeOfIssues] = useState([{ name: 'task' }, { name: 'bug' }])
  const [selected, setSelected] = useState(typeOfIssues[0])

  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className='relative mt-1 w-full'>
        <Listbox.Button
          className='relative w-full cursor-default rounded-lg
          bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none
          focus-visible:border-indigo-500 focus-visible:ring-2 
          focus-visible:ring-white focus-visible:ring-opacity-75 
          focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-300 
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
            rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-neutral-900
            ring-opacity-5 focus:outline-none sm:text-sm'
          >
            {typeOfIssues.map((item, personIdx) => (
              <Listbox.Option
                key={personIdx}
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
            {people.map((person, personIdx) => (
              <Listbox.Option
                key={personIdx}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-14 pr-4 ${
                    active
                      ? 'bg-emerald-100 text-emerald-900'
                      : 'text-neutral-900'
                  }`
                }
                value={person}
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
