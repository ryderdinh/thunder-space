import { toggleActiveSidebar } from 'actions';
import { useDispatch, useSelector } from 'react-redux';
import Account from './Account';
import './Sidebar.css';
import SidebarItem from './SidebarItem';
import SidebarItemSubMenu from './SidebarItemSubMenu';

export default function Sidebar() {
	const sidebar = useSelector(state => state._sidebar);

	const dispatch = useDispatch();

	const activeSidebar = () => {
		dispatch(toggleActiveSidebar);
	};

	return (
		<div className={sidebar.active ? 'sidebar' : 'sidebar close'}>
			<div className='logo-details'>
				<div className='logo'>
					<img
						src={require('assets/images/icons/logo-new-2.png').default}
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
					activeSidebar={activeSidebar}
				/>
				<SidebarItem
					path='/timesheets'
					title='Bảng công'
					type='sub-menu blank'
					icon='bx bx-table'
					activeSidebar={activeSidebar}
				/>
				<SidebarItem
					path='/report'
					title='Báo cáo'
					type='sub-menu blank'
					icon='bx bx-line-chart'
					activeSidebar={activeSidebar}
				/>
				<SidebarItemSubMenu
					path='/workflow'
					title='Quản lý'
					type='sub-menu'
					icon='bx bx-list-check'
					listMenu={[
						{ path: '/work', name: 'Công việc' },
						{ path: '/project', name: 'Dự án' }
					]}
					activeSidebar={activeSidebar}
				/>
				<Account activeSidebar={activeSidebar} />
			</ul>
		</div>
	);
}
