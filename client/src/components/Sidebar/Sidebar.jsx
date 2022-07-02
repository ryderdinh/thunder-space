import Logo from 'components/Icon/Logo'
import { LayoutContext } from 'context/LayoutContext'
import { useContext } from 'react'
import Account from './Account'
import './Sidebar.css'
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
          path='/workflow'
          title='Workflow'
          type='sub-menu'
          icon='bx bx-list-check'
          listMenu={[
            { path: '/workflow', name: 'Overview' },
            { path: '/works', name: 'Tasks' },
            { path: '/projects', name: 'Projects ' }
          ]}
          toggleSidebar={toggleSidebar}
        />
        <Account toggleSidebar={toggleSidebar} />
      </ul>
    </div>
  )
}
