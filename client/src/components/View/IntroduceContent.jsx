const IntroduceContent = ({ title, description }) => {
  return (
    <div className='w-full'>
      <p className='mb-2 text-base font-bold text-neutral-50'>{title}</p>
      <p className='text-base font-normal text-neutral-400'>{description}</p>
    </div>
  )
}

export default IntroduceContent
