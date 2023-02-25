import { Spinner } from 'components/Loading/Spinner'

const ButtonDanger = ({
  onClick,
  children,
  className,
  loading = false,
  loadingChildren = '',
  disabled = false
}) => {
  return (
    <div
      className={`cursor-pointer select-none rounded-[4px] border
      border-red-500/50 bg-red-500/90 px-2.5 py-1 
      text-xs font-light text-neutral-50/90 transition-all 
      duration-100 ease-in-out 
      hover:bg-red-600/70 hover:text-neutral-100/90
      ${loading || disabled ? 'bg-red-600/70' : ''} ${className}`}
      onClick={onClick}
    >
      {loading ? (loadingChildren ? loadingChildren : children) : children}
      {loading && (
        <div
          className='absolute left-0 top-0 z-10 flex h-full w-full 
          items-center justify-center bg-red-500/90 transition-all 
          duration-100 ease-in-out'
        >
          <Spinner w={10} color={'#fff'} border={3} />
        </div>
      )}
    </div>
  )
}

export default ButtonDanger
