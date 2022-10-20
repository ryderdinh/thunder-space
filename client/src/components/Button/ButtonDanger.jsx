const ButtonDanger = ({ onClick, children }) => {
  return (
    <div
      className='cursor-pointer select-none rounded-[4px] border
      border-red-500/50 bg-red-500/90 px-2.5 py-1 
      text-xs font-light text-neutral-50/90 transition-all 
      duration-100 ease-in-out 
      hover:bg-red-600/70 hover:text-neutral-100/90'
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export default ButtonDanger
