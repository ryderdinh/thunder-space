import 'assets/css/404.css'
import { useEffect, useRef } from 'react'

export default function Documentation() {
  const dotRef = useRef('.')

  setInterval(() => {
    if (dotRef.current.length >= 3) {
      dotRef.current = '.'
    } else dotRef.current = dotRef.current + '.'
  }, 450)

  useEffect(() => {
    document.title = 'Redirecting to documentation...'

    setTimeout(() => {
      window.location.href = 'https://hrmdoc.vercel.app'
    }, 5500)
  }, [])

  return (
    <div className='w-full p-5 text-center text-xl font-bold'>
      Redirecting{dotRef.current}
    </div>
  )
}
