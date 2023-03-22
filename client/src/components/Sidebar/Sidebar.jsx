import 'assets/css/Sidebar.css'

import Logo from 'components/Icon/Logo'
import { LayoutContext } from 'context/LayoutContext'
import { useContext } from 'react'
import Account from './Account'
import SidebarItem from './SidebarItem'
import SidebarItemSubMenu from './SidebarItemSubMenu'

export default function Sidebar() {
  const { sidebar } = useContext(LayoutContext)

  const toggleSidebar = () => {
    sidebar.toggle()
  }

  return (
    <div className={sidebar.active ? 'sidebar' : 'sidebar close'}>
      <div className='logo-details'>
        <div className='logo'>
          <Logo />
        </div>
        <span className='logo_name'>Thunder Space</span>
      </div>
      <ul className='nav-links'>
        <SidebarItem
          path='/home'
          title='Home'
          type='sub-menu blank'
          icon='bx bx-grid-alt'
          toggleSidebar={toggleSidebar}
        />
        <SidebarItem
          path='/timesheets'
          title='Timesheets'
          type='sub-menu blank'
          icon='bx bx-table'
          toggleSidebar={toggleSidebar}
        />
        <SidebarItem
          path='/report'
          title='Requests and Reports'
          type='sub-menu blank'
          icon='bx bx-line-chart'
          toggleSidebar={toggleSidebar}
        />
        <SidebarItemSubMenu
          path='/spaces'
          title='Spaces'
          type='sub-menu'
          icon='bx bx-analyse'
          listMenu={[
            { path: '/spaces', name: 'Overview' },
            { path: '/todos', name: 'Todos' },
            { path: '/projects', name: 'Projects ' }
          ]}
          toggleSidebar={toggleSidebar}
        />
        <Account toggleSidebar={toggleSidebar} />
      </ul>
    </div>
  )
}
