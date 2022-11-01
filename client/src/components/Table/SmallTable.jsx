import { useAutoAnimate } from '@formkit/auto-animate/react'
import BallTriangle from 'components/Loading/BallTriangle'

export const SmallTable = ({
  logo = null,
  title,
  children,
  divide = true,
  data,
  loading = false
}) => {
  const [tableRef] = useAutoAnimate()

  return (
    <div
      className='panel w-full divide-y divide-neutral-700/50 rounded'
      style={{ padding: 0 }}
    >
      {title && (
        <div className='flex items-center gap-3 px-5 py-3 text-base font-bold text-neutral-50'>
          {logo && logo}
          <div>{title}</div>
        </div>
      )}
      <div
        className={`custom-scrollbar max-h-[210px] overflow-y-scroll ${
          divide ? 'divide-y divide-neutral-700/50' : ''
        }`}
        ref={tableRef}
      >
        {children}

        {loading && (
          <div className='flex h-14 w-full items-center justify-center'>
            <BallTriangle w={30} h={30} stroke={'#059669'} />
          </div>
        )}

        {!data?.length && !loading && (
          <div className='flex h-14 w-full items-center justify-center'>
            <p className='text-center text-xs text-neutral-300'>No event</p>
          </div>
        )}
      </div>
    </div>
  )
}

export const SRow = ({ children, isHead = false, className = '' }) => (
  <div
    className={`flex flex-nowrap items-center gap-1 px-5 py-3 text-sm ${
      isHead ? 'font-bold text-neutral-200' : 'font-normal text-neutral-300'
    } ${className}`}
  >
    {children}
  </div>
)

export const SCol = ({ children, className = '' }) => (
  <div className={`text-xs ${className}`}>{children}</div>
)
