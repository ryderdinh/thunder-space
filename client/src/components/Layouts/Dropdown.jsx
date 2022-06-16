import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/solid'
import { Fragment } from 'react'

export default function Dropdown({
  list,
  selected,
  setSelected,
  onClickParent,
  onClickOption
}) {
  return (
    <div className='' onClick={onClickParent}>
      <Listbox value={selected} onChange={setSelected}>
        <div className='relative'>
          <Listbox.Button
            className='relative w-max cursor-pointer 
            space-x-1 pr-5 text-left text-xs
            font-light text-neutral-400 shadow-none focus:outline-none'
          >
            <span className='block truncate'>{selected}</span>
            <span
              className='pointer-events-none absolute inset-y-0 
              right-0 flex items-center pr-2'
            >
              <ChevronDownIcon
                className='text--400 h-3 w-3'
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
              className='absolute left-0 z-[2] mt-1 max-h-60
              w-max overflow-auto rounded-md bg-neutral-50 py-1 
              text-base shadow-lg ring-1 ring-neutral-900 
              ring-opacity-5 focus:outline-none sm:text-sm'
              onClick={onClickOption}
            >
              {list.map((item, itemIdx) => (
                <Listbox.Option
                  key={itemIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-1 pl-7 
                      pr-4 ${
                        active
                          ? 'bg-emerald-600 text-emerald-50'
                          : 'text-neutral-700'
                      }`
                  }
                  value={item}
                >
                  {({ selected }) => {
                    return (
                      <>
                        <span
                          className={`block truncate text-xs ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {item}
                        </span>
                        {selected ? (
                          <span
                            className='absolute inset-y-0 left-0 
                            flex items-center pl-3 text-emerald-800'
                          >
                            <CheckIcon className='h-3 w-3' aria-hidden='true' />
                          </span>
                        ) : null}
                      </>
                    )
                  }}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}
