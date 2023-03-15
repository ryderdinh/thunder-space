import { Spinner } from 'components/Loading/Spinner'

const ButtonNormalLoad = ({
  onClick,
  children,
  className,
  loading = false,
  loadingChildren = '',
  size = 'small'
}) => {
  const clicked = () => {
    !loading && onClick()
  }

  return (
    <div
      className={`relative h-max cursor-pointer select-none overflow-hidden
      rounded-[4px] border border-neutral-50 bg-neutral-50 
      px-2.5 py-1 text-center text-xs font-light
      text-emerald-600 transition-all duration-100 ease-in-out
      hover:text-emerald-700
       ${
         size === 'small'
           ? 'px-2.5 py-1 text-xs'
           : size === 'mid'
           ? 'px-4 py-1.5 text-base'
           : 'px-2.5 py-1 text-xs'
       }
      ${!loading ? 'hover:bg-neutral-50/80' : 'bg-neutral-50/80'} 
      ${className}`}
      onClick={clicked}
    >
      {loading ? (loadingChildren ? loadingChildren : children) : children}

      {loading && (
        <div
          className='absolute left-0 top-0 z-10 flex h-full w-full 
          items-center justify-center bg-neutral-200/80 transition-all 
          duration-100 ease-in-out'
        >
          <Spinner w={10} color={'#10B99F'} border={3} />
        </div>
      )}
    </div>
  )
}

export default ButtonNormalLoad
