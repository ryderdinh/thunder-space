const NotificationAction = ({ setRead }) => {
  return (
    <div className='flex items-center space-x-1'>
      <div
        className='cursor-pointer select-none rounded-[4px] border
        border-neutral-600/50 bg-neutral-600/90 px-2.5 py-1 
        text-xs text-neutral-200/90 transition-all duration-75 
        hover:bg-neutral-600/50'
        onClick={() => {
          setRead(null, true)
        }}
      >
        Mark all as read
      </div>
    </div>
  )
}

export default NotificationAction
