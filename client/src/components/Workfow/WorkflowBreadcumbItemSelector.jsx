import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, SearchIcon } from '@heroicons/react/solid'
import { Fragment } from 'react'

export default function WorkflowBreadcumbItemSelector({
  list,
  selected,
  setSelected,
  query,
  setQuery
}) {
  const filteredList =
    query === ''
      ? list
      : list.filter((item) =>
          item.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        )

  return (
    <Combobox value={selected} onChange={setSelected}>
      <div className='relative z-10'>
        <div
          className='relative w-max cursor-default overflow-hidden
          bg-transparent text-left focus:outline-none focus-visible:ring-2 
          focus-visible:ring-white focus-visible:ring-opacity-75 
          focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm'
        >
          <Combobox.Button className='flex items-center rounded-md bg-neutral-800'>
            <p
              className='w-full border-none bg-transparent p-2 text-lg 
              leading-5 text-neutral-50 focus:ring-0'
            >
              {selected.name}
            </p>
          </Combobox.Button>
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
            bg-neutral-900 py-1 text-base shadow-lg ring-1 ring-black 
            ring-opacity-5 focus:outline-none sm:text-sm'
          >
            <div className='py-1'>
              <label className='relative block'>
                <span className='sr-only'>Search</span>
                <span className='absolute inset-y-0 left-0 flex items-center pl-2'>
                  <SearchIcon
                    className='h-5 w-5 text-neutral-300'
                    aria-hidden='true'
                  />
                </span>
                <Combobox.Input
                  className='block w-full rounded-md border-none
                  bg-white py-2 pl-10 pr-3 shadow-sm placeholder:italic 
                  placeholder:text-neutral-400 focus:border-none focus:outline-none
                  sm:text-sm'
                  displayValue={''}
                  onChange={(event) => setQuery(event.target.value)}
                  autoComplete='off'
                  placeholder='Search...'
                />
              </label>
            </div>

            <div className='py-1'>
              {filteredList.length === 0 && query !== '' ? (
                <div
                  className='relative cursor-default select-none py-2 px-4 
                  text-neutral-500'
                >
                  Nothing found.
                </div>
              ) : (
                filteredList.map((item, index) => (
                  <Combobox.Option
                    key={index}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active
                          ? 'bg-emerald-600 text-neutral-100'
                          : 'text-neutral-500'
                      }`
                    }
                    value={item}
                  >
                    {({ selected, active }) => {
                      return (
                        <div onClick={() => item.onClick()}>
                          <span
                            className={`block truncate ${
                              selected ? 'font-medium' : 'font-normal'
                            }`}
                          >
                            <span>({item.code}) </span>
                            {item.name}
                          </span>
                          {selected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center 
                            pl-3 ${
                              active ? 'text-neutral-100' : 'text-emerald-600'
                            }`}
                            >
                              <CheckIcon
                                className='h-5 w-5'
                                aria-hidden='true'
                              />
                            </span>
                          ) : null}
                        </div>
                      )
                    }}
                  </Combobox.Option>
                ))
              )}
            </div>
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  )
}
