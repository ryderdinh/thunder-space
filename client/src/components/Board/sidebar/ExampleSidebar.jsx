import { useState } from 'react'
export default function Sidebar({ children }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div id='mySidebar' className={`sidebar ${open ? 'open' : ''}`}>
        <button className='closebtn' onClick={() => setOpen(false)}>
          x
        </button>
        <div className='sidebar-links'>
          <button>Dummy Home</button>
          <button>Dummy About</button>{' '}
        </div>
      </div>
      <div className={`${open ? 'sidebar-open' : ''}`}>
        <button
          className='openbtn'
          onClick={() => {
            setOpen(!open)
          }}
        >
          Open Sidebar
        </button>
        {children}
      </div>
    </>
  )
}
