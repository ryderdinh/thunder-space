const IssueHistory = ({ className = '', data = [] }) => {
  return (
    <div
      className={`${className} w-full space-y-4 text-sm text-neutral-50 md:space-y-2`}
    >
      {(!data || !data.length) && (
        <p className='w-full py-14 text-center text-xs text-neutral-500'>
          No history
        </p>
      )}

      {(data || data.length) &&
        data.map((item, index) => (
          <div
            className='grid grid-cols-4 gap-1 text-neutral-500 md:gap-0'
            key={index}
          >
            <div className='col-span-4 flex items-center font-bold md:col-span-1'>
              <p>{`${new Date(item.createdAt).toLocaleString()} `}</p>
            </div>
            <div className='col-span-4 flex items-center gap-2 md:col-span-3'>
              <div className='aspect-square h-[28px] rounded-full border-2'>
                <img
                  src={item.users[0].avatar.url}
                  alt='user avatar'
                  className='h-full w-full rounded-full border-neutral-50 object-cover'
                />
              </div>
              <p className='hidden md:block'>{`${item.users[0].name}:`}</p>
              <div className='flex max-w-[calc(100%-28px)] flex-wrap gap-1 font-bold'>
                <p>{`${item.action} 
                ${item.users[1] ? item.users[1].name : ''}`}</p>
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}

export default IssueHistory
