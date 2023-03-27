import { FlagIcon } from '@heroicons/react/24/solid'

const FlagButton = ({ className, isFlag, onClick }) => {
  return (
    <button
      className={`flex items-center gap-2 rounded py-1.5 px-2.5
      ${isFlag ? 'bg-white text-red-500' : 'bg-gray-500 text-gray-200'}
      ${className}`}
      onClick={onClick}
    >
      <FlagIcon
        className={`${isFlag ? 'text-red-500' : 'text-gray-200'}
        w-4`}
      />
      <p className='text-xs'>{isFlag ? 'Flagged' : 'Flag'}</p>
    </button>
  )
}

export default FlagButton
