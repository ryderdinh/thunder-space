import { LayoutContext } from 'context/LayoutContext'
import { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window
  return {
    width,
    height
  }
}

export default function SidebarItem({ toggleSidebar, ...props }) {
  const { setLoading } = useContext(LayoutContext)

  // eslint-disable-next-line no-unused-vars
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  )

  const handleSidebarOnMobile = () => {
    windowDimensions.width <= 768 && toggleSidebar()
  }

  return (
    <li
      onClick={() => {
        setLoading(true)
      }}
    >
      <NavLink to={props.path} onClick={handleSidebarOnMobile}>
        <i className={props.icon}></i>
        <span className='link_name select-none'>{props.title}</span>
      </NavLink>

      <ul className={props.type}>
        <li>
          <a href='/#' className='link_name select-none'>
            {props.title}
          </a>
          <p className='hidden'>{props.title}</p>
        </li>
      </ul>
    </li>
  )
}
