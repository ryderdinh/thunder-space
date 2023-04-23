import '../../App.css'
import Footer from './Footer'

export default function Main({ children }) {
  return (
    <main>
      <div className='view-container relative'>
        {children}
        <Footer />
      </div>
    </main>
  )
}
