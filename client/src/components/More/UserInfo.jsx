const UserInfo = ({ className, name, avatar, email, onClick }) => {
  return (
    <div
      className={`flex items-center space-x-2 ${className}`}
      onClick={() => onClick && onClick()}
    >
      <div className=''>
        <img
          src={avatar}
          alt={name}
          className='aspect-square h-8 rounded-full border-2
          border-emerald-500 object-cover transition-all
          duration-1000 ease-linear'
        />
      </div>
      <div className='w-[calc(100%-2.5rem)]'>
        <h3 className='truncate text-base font-bold text-emerald-500'>
          {name}
        </h3>
        <p className='truncate !font-bevn font-normal'>{email}</p>
      </div>
    </div>
  )
}

export default UserInfo
