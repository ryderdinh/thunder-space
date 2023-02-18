import 'assets/css/404.css'
import ButtonSuccess from 'components/Button/ButtonSuccess'
import { useEffect } from 'react'

export default function Documentation() {
  useEffect(() => {
    document.title = 'Documentation'
  }, [])

  return (
    <div className='w-full p-5 text-center text-xl font-bold'>
      <div className='w-max mx-auto'>
        <a href='https://hrmdoc.vercel.app'>
          <ButtonSuccess className='text-base'>
            Read the documentation
          </ButtonSuccess>
        </a>
      </div>
    </div>
  )
}
