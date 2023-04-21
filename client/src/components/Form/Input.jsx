const Input = ({
  label,
  className,
  disabled = false,
  readOnly = false,
  value = '',
  placeholder = '',
  onChange
}) => {
  return (
    <div className='w-full'>
      <label
        htmlFor={label}
        className='block text-sm font-medium text-neutral-300'
      >
        {label}
      </label>
      <input
        id={label}
        name={label}
        disabled={disabled}
        readOnly={readOnly}
        className={`input-default ${className}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default Input
