const IssueHistory = ({ className = '', data = [] }) => {
  return (
    <div className={`${className} w-full space-y-2 text-sm text-neutral-50`}>
      {(!data || !data.length) && (
        <p className='w-full py-14 text-center text-xs text-neutral-500'>
          No history
        </p>
      )}

      {(data || data.length) &&
        data.map((item, index) => (
          <div className='grid grid-cols-4 text-neutral-500' key={index}>
            <div className='col-span-1 flex items-center font-bold'>
              <p>{`${new Date(item.time).toLocaleString()} `}</p>
            </div>
            <div className='col-span-3 flex items-center gap-2'>
              <img
                src={item.user[0].avatar}
                alt='Avatar user 1'
                className='h-7 w-7 rounded-full'
              />
              <p>{`${item.user[0].name}:`}</p>
              <div className='flex flex-wrap gap-1 font-bold'>
                <p>{`${item.action} `}</p>
                {item.user[1] && (
                  <div className='font-bold'>
                    <p>{`${item.user[1].name} `}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}

export default IssueHistory
