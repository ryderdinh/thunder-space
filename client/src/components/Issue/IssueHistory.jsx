const IssueHistory = ({ className = '', data = [] }) => {
  return (
    <div className={`${className} w-full text-sm text-neutral-50`}>
      {(!data || !data.length) && (
        <p className='w-full py-14 text-center text-xs text-neutral-500'>
          No history
        </p>
      )}

      {(data || data.length) &&
        data.map((item, index) => (
          <div className='grid grid-cols-2 text-neutral-500' key={index}>
            <div className='flex items-center gap-2'>
              <img src={item.users[0].avatar} alt='Avatar user 1' />
              <p>{`${item.users[0].name} :`}</p>
            </div>

            <div className='font-bold'>
              <p>{`${item.action} `}</p>
            </div>

            {item.users[1] && (
              <div className='font-bold'>
                <p>{`${item.users[1].name} `}</p>
              </div>
            )}
          </div>
        ))}
    </div>
  )
}

export default IssueHistory
