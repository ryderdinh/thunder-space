import '../../App.css'
import Footer from './Footer'

export default function Main({ children }) {
  return (
    <main>
      <div className='view-container'>
        {children}
        <Footer />
      </div>
    </main>
  )
}
