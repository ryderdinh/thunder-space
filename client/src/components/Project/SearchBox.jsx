import { useInput } from 'hooks'
import { useEffect } from 'react'

function SearchBox({ defaultValue, placeholder, handleSearch }) {
  const { value, bind, reset, setValue } = useInput('')

  useEffect(() => {
    setValue(defaultValue)
  }, [setValue, defaultValue])

  return (
    <div className='relative h-max w-full md:w-auto'>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSearch(value)
        }}
      >
        <input
          name=''
          placeholder={placeholder}
          type='text'
          className='text-scale-1200 focus:border-scale-900 focus:ring-scale-400 
          placeholder-scale-800 bg-scaleA-200 border-scale-700 box-border block 
          h-9 w-full rounded-md border px-2.5 py-2 pl-10 text-xs shadow-sm
          outline-none transition-all focus:shadow-md focus:ring-2 focus:ring-current'
          value={defaultValue}
          {...bind}
          onKeyUp={(e) => {
            handleSearch(value)
          }}
        />
        <div
          className='text-scale-1100 pointer-events-none absolute inset-y-0 left-0 flex 
          items-center pl-3 '
        >
          <div className='text-scale-900'>
            <SearchIcon />
          </div>
        </div>
      </form>
    </div>
  )
}

export default SearchBox

function SearchIcon() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='12'
      height='12'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
      className='sbui-icon'
    >
      <circle cx='11' cy='11' r='8'></circle>
      <line x1='21' y1='21' x2='16.65' y2='16.65'></line>
    </svg>
  )
}
