import React, { Component } from 'react';
import Account from './Account';
import SidebarItem from './SidebarItem';
import SidebarItemSubMenu from './SidebarItemSubMenu';
import './Sidebar.css';

export class Sidebar extends Component {
	constructor(props) {
		super(props);
		this.wrapperRef = React.createRef();
	}

	// componentDidMount() {
	//   document.addEventListener("click", this.handleClick);
	// }

	// componentWillUnmount() {
	//   // important
	//   document.removeEventListener("click", this.handleClick);
	// }
	// handleClick = (event) => {
	//   const { target } = event;
	//   console.log(this.props);
	//   if (!this.wrapperRef.current.contains(target) && this.props.sidebar) {
	//     // this.setState({ sidebar: false });
	//     this.props.activeSidebar();
	//   }
	// };

	render() {
		return (
			<div
				className={this.props.sidebar ? 'sidebar' : 'sidebar close'}
				ref={this.wrapperRef}
			>
				<div className='logo-details'>
					<div className='logo'>
						<img
							src={require('assets/images/icons/logo-new-2.png').default}
							alt='logo'
						/>
					</div>
					<span className='logo_name'>Zelios Sea</span>
				</div>
				<ul className='nav-links'>
					<SidebarItem
						path='/'
						title='Trang chủ'
						type='sub-menu blank'
						icon='bx bx-grid-alt'
						activeSidebar={this.props.activeSidebar}
					/>
					<SidebarItem
						path='/timesheets'
						title='Bảng công'
						type='sub-menu blank'
						icon='bx bx-table'
						activeSidebar={this.props.activeSidebar}
					/>
					<SidebarItem
						path='/report'
						title='Báo cáo'
						type='sub-menu blank'
						icon='bx bx-line-chart'
						activeSidebar={this.props.activeSidebar}
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
						activeSidebar={this.props.activeSidebar}
					/>
					<Account activeSidebar={this.props.activeSidebar} />
				</ul>
			</div>
		);
	}
}

export default Sidebar;
