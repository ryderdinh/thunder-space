import CopyButton from 'components/Button/CopyButton'

const Input = ({
  label,
  className,
  disabled = false,
  readOnly = false,
  value = '',
  placeholder = '',
  autoFocus = false,
  copy = false,
  onChange
}) => {
  return (
    <div className='w-full'>
      <form onSubmit={(e) => e.preventDefault()}>
        {label ? (
          <label
            htmlFor={label}
            className='mb-1 block text-sm font-medium text-gray-50'
          >
            {label}
          </label>
        ) : null}

        <div className='relative'>
          <input
            id={label}
            name={label}
            disabled={disabled}
            readOnly={readOnly}
            className={`input-default z-[1] ${className} ${
              copy ? '!pr-20' : ''
            }`}
            placeholder={placeholder}
            value={value}
            autoFocus={autoFocus}
            onChange={onChange}
          />
          {copy ? (
            <div className='absolute-y-center right-1.5 z-[2] flex items-center'>
              <CopyButton value={value} />
            </div>
          ) : null}
        </div>
      </form>
    </div>
  )
}

export default Input
