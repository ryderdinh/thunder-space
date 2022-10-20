const ButtonSuccess = ({ onClick, children }) => {
  return (
    <div
      className='cursor-pointer select-none rounded-[4px] border
      border-emerald-500/50 bg-emerald-500/90 px-2.5 py-1 
      text-xs font-light text-neutral-50/90 transition-all 
      duration-100 ease-in-out 
      hover:bg-emerald-600/70 hover:text-neutral-100/90'
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export default ButtonSuccess
