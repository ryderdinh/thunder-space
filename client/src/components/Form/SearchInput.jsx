import { MagnifyingGlassIcon, PencilIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'

const SearchInput = ({ className, value, placeholder, onChange, onSubmit }) => {
  const [inputFocused, setInputFocused] = useState(false)

  return (
    <form
      className={`relative h-9 w-full bg-gray-800
      ${className}`}
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit && onSubmit()
      }}
    >
      <div
        className='absolute-y-center left-2.5 h-6 w-6 
        text-gray-200'
      >
        <MagnifyingGlassIcon className='aspect-square w-full' />
      </div>
      <input
        type='text'
        className='h-full w-full rounded-5 
        border border-gray-500 bg-transparent 
        py-1.5 pl-11 pr-9
        text-xs text-gray-50 
        placeholder:text-gray-200
        focus:border-gray-400 focus:outline-none'
        value={value}
        placeholder={placeholder}
        onFocus={() => setInputFocused(true)}
        onBlur={() => {
          setInputFocused(false)
        }}
        onChange={onChange}
      />
      <div
        className={`absolute-y-center flex-center trasition-default 
        right-1.5 h-6 
        w-6
        rounded
        ${
          inputFocused
            ? 'bg-emerald-500 text-gray-500'
            : 'bg-gray-500 text-gray-200'
        }`}
      >
        <PencilIcon className='w-4' />
      </div>
    </form>
  )
}

export default SearchInput
