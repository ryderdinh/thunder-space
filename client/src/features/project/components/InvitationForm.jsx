const InvitationForm = ({ content }) => {
  return (
    <div
      className='divide-y divide-neutral-600/50 rounded-md border 
          border-neutral-600/50
          bg-neutral-800/80'
    >
      <div className='px-5 py-2'>
        <h5 className='text-base font-bold text-neutral-50/75'>
          Invite to join!
        </h5>
      </div>

      <div className=''>
        <p className='text-sm text-neutral-200/75'>{content}</p>
      </div>
    </div>
  )
}

export default InvitationForm
