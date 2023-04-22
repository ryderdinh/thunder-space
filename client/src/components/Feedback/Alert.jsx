import InfoIcon from 'components/Icon/Info'

const SuccessAlert = ({ children }) => {
  return (
    <div
      className='my-6 flex gap-2.5 rounded-2xl 
      border border-emerald-500/30 
      bg-emerald-500/5 p-4
      leading-6 text-emerald-200'
    >
      <InfoIcon
        className='mt-1 h-4 w-4 flex-none 
        fill-emerald-200/20 stroke-emerald-200'
      />
      <div className='[&>:first-child]:mt-0 [&>:last-child]:mb-0'>
        {children}
      </div>
    </div>
  )
}

export default SuccessAlert
