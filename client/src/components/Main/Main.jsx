import { useSelector } from 'react-redux'
import '../../App.css'
import Footer from './Footer'

export default function Main({ children }) {
  const blur = useSelector((state) => state?._popup.blur)

  return (
    <main className={blur ? 'onblur' : ''}>
      <div className='view-container'>
        {children}
        <Footer />
      </div>
    </main>
  )
}
