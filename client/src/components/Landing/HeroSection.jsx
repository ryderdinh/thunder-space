import { useHistory } from 'react-router-dom'

const HeroSection = () => {
  const history = useHistory()

  return (
    <section className='w-full bg-neutral-900 text-neutral-50'>
      <div className='mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center'>
        <div className='mx-auto max-w-3xl text-center'>
          <h1 className='bg-gradient-to-r from-blue-500 via-emerald-500 to-blue-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl'>
            Understand User Flow.
            <span className='sm:block'>Easy to manage.</span>
          </h1>

          <p className='mx-auto mt-4 max-w-xl sm:text-xl sm:leading-relaxed'>
            <strong className='font-bold text-emerald-500'>
              Thunder Space
            </strong>{' '}
            is Human Resources Management Page that helps you or your team reach
            their full potential and enhance their self-worth.
          </p>

          <div className='mt-8 flex flex-wrap justify-center gap-4'>
            <div
              className='block w-full cursor-pointer rounded border 
                  border-emerald-600 bg-emerald-600 px-12 py-3 text-sm 
                  font-medium text-neutral-50 hover:bg-transparent hover:text-neutral-50 
                  focus:outline-none focus:ring active:text-opacity-75 sm:w-auto transition-all
                  duration-200 ease-linear'
              onClick={() => {
                history.push('/login')
              }}
            >
              Login
            </div>

            <a
              className='block w-full rounded px-9 
                  py-3 text-sm font-medium text-neutral-50 sm:w-auto'
              href='/about'
            >
              <p className='hover-underline-animation after:bg-emerald-600'>
                Learn More
              </p>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
