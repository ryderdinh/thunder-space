/* eslint-disable jsx-a11y/anchor-is-valid */
import Logo from 'components/Icon/Logo'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

export default function Landing() {
  const history = useHistory()
  useEffect(() => {
    localStorage.setItem('previousPath', '/')
  }, [])

  return (
    <>
      <div className='flex w-full flex-col'>
        <section className='w-full bg-neutral-900 text-white'>
          <div className='mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center'>
            <div className='mx-auto max-w-3xl text-center'>
              <h1 className='bg-gradient-to-r from-blue-500 via-emerald-500 to-blue-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl'>
                Understand User Flow.
                <span className='sm:block'>Increase Conversion.</span>
              </h1>

              <p className='mx-auto mt-4 max-w-xl sm:text-xl sm:leading-relaxed'>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Nesciunt illo tenetur fuga ducimus numquam ea!
              </p>

              <div className='mt-8 flex flex-wrap justify-center gap-4'>
                <div
                  className='block w-full cursor-pointer rounded border 
                  border-emerald-600 bg-emerald-600 px-12 py-3 text-sm 
                  font-medium text-white hover:bg-transparent hover:text-white 
                  focus:outline-none focus:ring active:text-opacity-75 sm:w-auto'
                  onClick={() => {
                    history.push('/login')
                  }}
                >
                  Login
                </div>

                <a
                  className='block w-full rounded border border-emerald-600 px-12 
                  py-3 text-sm font-medium text-white hover:bg-emerald-600 
                  focus:outline-none focus:ring active:bg-emerald-500 sm:w-auto'
                  href='/about'
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </section>

        <footer className='bg-neutral-900'>
          <div className='mx-auto grid max-w-screen-xl grid-cols-1 lg:grid-cols-2'>
            <div className='border-b border-neutral-800 px-12 py-16 md:border-b-0 md:border-l lg:order-last'>
              <div className='block lg:hidden'>
                <span className='inline-block h-10 w-32 rounded-lg bg-neutral-700'></span>
              </div>

              <div className='mt-12 space-y-4 lg:mt-0'>
                <span className='block h-1 w-10 rounded bg-emerald-500'></span>

                <div>
                  <h5 className='text-2xl font-medium text-white'>
                    Request a Demo
                  </h5>

                  <p className='mt-1 max-w-xs text-xs text-neutral-500'>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Porro voluptatum debitis quia pariatur iusto in nisi
                    expedita placeat vero magni.
                  </p>
                </div>

                <form>
                  <div className='relative max-w-lg'>
                    <label className='sr-only' htmlFor='email'>
                      Email
                    </label>

                    <input
                      className='w-full rounded-lg border-none bg-neutral-800 py-4 pl-3 pr-16 text-sm'
                      id='email'
                      type='email'
                      placeholder='Enter your email'
                    />

                    <button
                      className='absolute top-1/2 right-1.5 -translate-y-1/2 rounded-md bg-emerald-600 p-3 text-white'
                      type='button'
                    >
                      <svg
                        className='h-4 w-4'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M12 6v6m0 0v6m0-6h6m-6 0H6'
                        />
                      </svg>
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className='px-12 py-16'>
              <div className='hidden lg:block'>
                <Logo />
              </div>

              <div className='grid grid-cols-3 gap-8 lg:mt-12'>
                <div>
                  <p className='font-bold text-white'>Helpful</p>

                  <nav className='mt-2 flex flex-col space-y-1 text-xs text-neutral-400'>
                    <a className='text-inherit hover:opacity-75' href='#'>
                      Contact
                    </a>
                    <a className='text-inherit hover:opacity-75' href='#'>
                      Live Chat
                    </a>
                    <a className='text-inherit hover:opacity-75' href='#'>
                      Resources
                    </a>
                  </nav>
                </div>

                <div>
                  <p className='font-bold text-white'>Solutions</p>

                  <nav className='mt-2 flex flex-col space-y-1 text-xs text-neutral-400'>
                    <a className='text-inherit hover:opacity-75' href='#'>
                      Instant Checkout
                    </a>
                    <a className='text-inherit hover:opacity-75' href='#'>
                      Product Upsells
                    </a>
                    <a className='text-inherit hover:opacity-75' href='#'>
                      Slideout Cart
                    </a>
                    <a className='text-inherit hover:opacity-75' href='#'>
                      User Dashboards
                    </a>
                  </nav>
                </div>

                <div>
                  <p className='font-bold text-white'>About</p>

                  <nav className='mt-2 flex flex-col space-y-1 text-xs text-neutral-400'>
                    <a className='text-inherit hover:opacity-75' href='#'>
                      About Us
                    </a>
                    <a className='text-inherit hover:opacity-75' href='#'>
                      Meet the Team
                    </a>
                    <a className='text-inherit hover:opacity-75' href='#'>
                      History
                    </a>
                    <a className='text-inherit hover:opacity-75' href='#'>
                      Careers
                    </a>
                  </nav>
                </div>
              </div>

              <div className='mt-12 flex space-x-6 text-xs text-white'>
                <p> &copy; 2022 Company Name </p>
                <a className='text-inherit underline hover:opacity-75' href='#'>
                  Privacy Policy
                </a>
                <a className='text-inherit underline hover:opacity-75' href='#'>
                  Terms & Conditions
                </a>
                <a className='text-inherit underline hover:opacity-75' href='#'>
                  Cookies
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
