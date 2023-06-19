import { Spinner } from 'components/Loading/Spinner'

const ButtonSuccess = ({
  onClick,
  children,
  className,
  loading = false,
  loadingChildren = '',
  disabled = false,
  size = 'small'
}) => {
  const clicked = () => {
    !loading && !disabled && onClick()
  }

  return (
    <div
      className={`relative h-max cursor-pointer select-none overflow-hidden
      rounded-[4px] border border-emerald-500/50 bg-emerald-500/90 text-center 
      font-light text-neutral-50/90 transition-all
      duration-100 ease-in-out hover:text-neutral-100/90
      ${
        size === 'small'
          ? 'px-2.5 py-1 text-xs'
          : size === 'mid'
          ? 'px-4 py-1.5 text-base'
          : 'px-2.5 py-1 text-xs'
      }
      ${
        loading || disabled ? 'bg-emerald-600/70' : 'hover:bg-emerald-600/70'
      } ${className}`}
      onClick={clicked}
    >
      {loading ? (loadingChildren ? loadingChildren : children) : children}

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
