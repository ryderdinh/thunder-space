import { Spinner } from 'components/Loading/Spinner'

const ButtonSuccess = ({
  onClick,
  children,
  className,
  loading = false,
  disabled = false
}) => {
  const clicked = () => {
    !loading && !disabled && onClick()
  }

  console.log(loading, disabled)

  return (
    <div
      className={`relative cursor-pointer select-none overflow-hidden rounded-[4px]
      border border-emerald-500/50 bg-emerald-500/90 px-2.5 
      py-1 text-xs font-light text-neutral-50/90 transition-all 
      duration-100 ease-in-out hover:text-neutral-100/90
      ${loading || disabled ? 'bg-emerald-600/70' : ''} ${className}`}
      onClick={clicked}
    >
      {children}

      {loading && (
        <div
          className='absolute left-0 top-0 z-10 flex h-full w-full 
          items-center justify-center bg-emerald-500/90 transition-all 
          duration-100 ease-in-out'
        >
          <Spinner w={10} color={'#fff'} border={3} />
        </div>
      )}
    </div>
  )
}

export default ButtonSuccess
