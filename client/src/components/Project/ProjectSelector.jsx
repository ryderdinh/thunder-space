import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { Fragment, useEffect } from 'react'

export default function ProjectSelector({
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

  useEffect(() => {
    console.log(selected)
  }, [selected])

  return (
    <Combobox value={selected} onChange={setSelected}>
      <div className='relative z-10 mt-1'>
        <div
          className='rounded-lg relative w-52 cursor-default overflow-hidden 
          bg-transparent text-left focus:outline-none focus-visible:ring-2 
          focus-visible:ring-white focus-visible:ring-opacity-75 
          focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm'
        >
          <Combobox.Button className='flex items-center pr-2'>
            <p
              className='w-full border-none bg-transparent py-2 pr-10 text-lg 
              leading-5 text-gray-50 focus:ring-0'
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
            className='rounded-md absolute mt-1 max-h-60 w-full overflow-auto 
            bg-neutral-900 py-1 text-base shadow-lg ring-1 ring-black 
            ring-opacity-5 focus:outline-none sm:text-sm'
          >
            <div className='py-1'>
              <label className='relative block'>
                <span className='sr-only'>Search</span>
                <span className='absolute inset-y-0 left-0 flex items-center pl-2'>
                  <MagnifyingGlassIcon
                    className='h-5 w-5 text-neutral-300'
                    aria-hidden='true'
                  />
                </span>
                <Combobox.Input
                  className='rounded-md block w-full border-none
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
                filteredList.map((item) => (
                  <Combobox.Option
                    key={item._id}
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
