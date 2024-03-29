const ButtonNormal = ({ onClick, children }) => {
  return (
    <div
      className='cursor-pointer select-none rounded-[4px] border
      border-neutral-600/50 bg-neutral-600/90 px-2.5 py-1 
      text-xs font-light text-neutral-200/90 transition-all 
      duration-75 hover:bg-neutral-600/50'
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export default ButtonNormal
