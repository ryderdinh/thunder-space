import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, SearchIcon } from '@heroicons/react/solid'
import { Fragment, useState } from 'react'

const people = [
  { id: 1, name: 'Wade Cooper' },
  { id: 2, name: 'Arlene Mccoy' },
  { id: 3, name: 'Devon Webb' },
  { id: 4, name: 'Tom Cook' },
  { id: 5, name: 'Tanya Fox' },
  { id: 6, name: 'Hellen Schmidt' },
  { id: 7, name: 'Lester James' },
  { id: 8, name: 'Lillie May' }
]

export default function ProjectSelector() {
  const [selected, setSelected] = useState(people[0])
  const [query, setQuery] = useState('')

  const filteredPeople =
    query === ''
      ? people
      : people.filter((person) =>
          person.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        )

  return (
    <Combobox value={selected} onChange={setSelected}>
      <div className='relative z-10 mt-1'>
        <div
          className='relative w-full cursor-default overflow-hidden rounded-lg 
          bg-transparent text-left focus:outline-none focus-visible:ring-2 
          focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 
          focus-visible:ring-offset-teal-300 sm:text-sm'
        >
          {/* <Combobox.Label>Project:</Combobox.Label> */}
          <Combobox.Button className='absolute inset-y-0 left-0 flex items-center pr-2'>
            <SearchIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
          </Combobox.Button>

          <Combobox.Input
            className='w-full border-none bg-transparent py-2 pl-7 pr-10 text-lg leading-5 
            text-gray-50 focus:ring-0
            focus-visible:outline-none'
            displayValue={(person) => person.name}
            onChange={(event) => setQuery(event.target.value)}
            autoComplete='off'
          />
        </div>
        <Transition
          as={Fragment}
          leave='transition ease-in duration-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
          afterLeave={() => setQuery('')}
        >
          <Combobox.Options
            className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md 
            bg-[#1F1F1F] py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 
            focus:outline-none sm:text-sm'
          >
            {filteredPeople.length === 0 && query !== '' ? (
              <div className='relative cursor-default select-none py-2 px-4 text-[#707070]'>
                Nothing found.
              </div>
            ) : (
              filteredPeople.map((person) => (
                <Combobox.Option
                  key={person.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-teal-600 text-white' : 'text-[#707070]'
                    }`
                  }
                  value={person}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {person.name}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? 'text-white' : 'text-teal-600'
                          }`}
                        >
                          <CheckIcon className='h-5 w-5' aria-hidden='true' />
                        </span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  )
}
