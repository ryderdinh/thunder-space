import { ArrowRightIcon } from '@heroicons/react/24/outline'
import Logo from 'components/Icon/Logo'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='bg-neutral-900'>
      <div className='mx-auto grid max-w-screen-xl grid-cols-1 lg:grid-cols-2'>
        <div className='border-b border-neutral-800 px-4 py-16 md:border-b-0 md:border-l lg:order-last lg:px-12'>
          <div className='block lg:hidden'>
            <span className='h-10 w-32 rounded-lg bg-neutral-700'>
              <Logo />
            </span>
          </div>

          <div className='mt-12 space-y-4 lg:mt-0'>
            <span className='block h-1 w-10 rounded bg-emerald-500'></span>

            <div>
              <h5 className='text-2xl font-medium text-neutral-50'>
                Get update notifications
              </h5>

              <p className='mt-1 max-w-xs font-bevn text-xs text-neutral-500'>
                You will receive the update details in your email when we
                release a new update.
              </p>
            </div>

            <form>
              <div className='relative max-w-lg'>
                <label className='sr-only' htmlFor='email'>
                  Email
                </label>

                <input
                  className='w-full rounded-lg border-none bg-neutral-800 
                  py-4 pl-3 pr-16 text-sm text-gray-50 outline-none 
                  focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2
                  focus:ring-offset-deepdark'
                  id='email'
                  type='email'
                  placeholder='Enter your email'
                />

                <button
                  className='absolute right-1.5 top-1/2 -translate-y-1/2 rounded-md bg-emerald-600 p-3 text-neutral-50'
                  type='button'
                >
                  <ArrowRightIcon className='h-4 w-4 text-gray-50' />
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
                <Link
                  className='font-bevn text-inherit hover:opacity-75'
                  to='/'
                >
                  Contact
                </Link>
                <Link
                  className='font-bevn text-inherit hover:opacity-75'
                  to='/'
                >
                  Resources
                </Link>
              </nav>
            </div>

            <div>
              <p className='font-bold text-white'>Solutions</p>

              <nav className='mt-2 flex flex-col space-y-1 text-xs text-neutral-400'>
                <Link
                  className='font-bevn text-inherit hover:opacity-75'
                  to='/'
                >
                  Instant Checkout
                </Link>
                <Link
                  className='font-bevn text-inherit hover:opacity-75'
                  to='/'
                >
                  Product Upsells
                </Link>
                <Link
                  className='font-bevn text-inherit hover:opacity-75'
                  to='/'
                >
                  Slideout Cart
                </Link>
                <Link
                  className='font-bevn text-inherit hover:opacity-75'
                  to='/'
                >
                  User Dashboards
                </Link>
              </nav>
            </div>

            <div>
              <p className='font-bold text-white'>About</p>

              <nav className='mt-2 flex flex-col space-y-1 text-xs text-neutral-400'>
                <Link
                  className='font-bevn text-inherit hover:opacity-75'
                  to='/'
                >
                  About Us
                </Link>
                <Link
                  className='font-bevn text-inherit hover:opacity-75'
                  to='/'
                >
                  Meet the Team
                </Link>
                <Link
                  className='font-bevn text-inherit hover:opacity-75'
                  to='/'
                >
                  History
                </Link>
                <Link
                  className='font-bevn text-inherit hover:opacity-75'
                  to='/'
                >
                  Careers
                </Link>
              </nav>
            </div>
          </div>

          <div className='mt-12 flex space-x-6 text-xs text-white'>
            <p> &copy; 2021 Thunder Space </p>
            <Link className='text-inherit underline hover:opacity-75' to='/'>
              Privacy Policy
            </Link>
            <Link className='text-inherit underline hover:opacity-75' to='/'>
              Terms & Conditions
            </Link>
            <Link className='text-inherit underline hover:opacity-75' to='/'>
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
