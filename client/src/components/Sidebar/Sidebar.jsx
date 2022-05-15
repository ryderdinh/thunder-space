import { LayoutContext } from 'context/LayoutContext'
import { useContext } from 'react'
import Account from './Account'
import './Sidebar.css'
import SidebarItem from './SidebarItem'
import SidebarItemSubMenu from './SidebarItemSubMenu'

export default function Sidebar() {
  // const sidebar = useSelector((state) => state._sidebar)
  // const dispatch = useDispatch()

  const { sidebar } = useContext(LayoutContext)

  const toggleSidebar = () => {
    sidebar.toggle()
  }

  return (
    <div className={sidebar.active ? 'sidebar' : 'sidebar close'}>
      <div className='logo-details'>
        <div className='logo'>
          <img
            src={require('assets/images/icons/newlogo-logo.svg').default}
            alt='logo'
          />
        </div>
        <span className='logo_name'>Thunder Space</span>
      </div>
      <ul className='nav-links'>
        <SidebarItem
          path='/'
          title='Trang chủ'
          type='sub-menu blank'
          icon='bx bx-grid-alt'
          toggleSidebar={toggleSidebar}
        />
        <SidebarItem
          path='/timesheets'
          title='Bảng công'
          type='sub-menu blank'
          icon='bx bx-table'
          toggleSidebar={toggleSidebar}
        />
        <SidebarItem
          path='/report'
          title='Báo cáo'
          type='sub-menu blank'
          icon='bx bx-line-chart'
          toggleSidebar={toggleSidebar}
        />
        <SidebarItemSubMenu
          path='/workflow'
          title='Quản lý'
          type='sub-menu'
          icon='bx bx-list-check'
          listMenu={[
            { path: '/workflow', name: 'Tổng quan' },
            { path: '/works', name: 'Công việc' },
            { path: '/projects', name: 'Dự án' }
          ]}
          toggleSidebar={toggleSidebar}
        />
        <Account toggleSidebar={toggleSidebar} />
      </ul>
    </div>
  )
}
