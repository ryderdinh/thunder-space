import { toggleActiveSidebar } from 'actions';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NameContainer from './NameContainer';

export default function HeaderContainer({ pathName }) {
	const [name, setName] = useState('');

	const sidebar = useSelector(state => state._sidebar);

	const dispatch = useDispatch();

	useEffect(() => {
		const list = {
			home: 'Trang chủ',
			timesheets: 'Bảng công',
			report: 'Báo cáo',
			workflow: 'Không gian làm việc',
			work: 'Quản lý công việc',
			project: 'Quản lý dự án',
			account: 'Tài khoản'
		};

		setName(list[pathName]);
	}, [pathName]);

	const activeSidebar = () => {
		dispatch(toggleActiveSidebar(!sidebar.active));
	};

	return (
		<div className='view_name'>
			<i className='bx bx-menu' onClick={activeSidebar}></i>
			<NameContainer name={name} />
		</div>
	);
}
