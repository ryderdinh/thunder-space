import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// import { actFetchStaffInfomation } from "actions";
import { NavLink } from 'react-router-dom';
import Puff from 'assets/bower_components/SVG-Loaders/svg-loaders/puff.svg';
import { removeCookie } from 'units/cookieWeb';
import toast from 'react-hot-toast';
function getWindowDimensions() {
	const { innerWidth: width, innerHeight: height } = window;
	return {
		width,
		height
	};
}

export default function Account(props) {
	//? Create state
	// eslint-disable-next-line no-unused-vars
	const [windowDimensions, setWindowDimensions] = useState(
		getWindowDimensions()
	);

	//? Create effect
	useEffect(() => {
		document.title = 'Tài khoản';
	}, []);

	//? Connect redux
	const account = useSelector(state => state._staffInfomation._staffInfomation);

	//? Create function
	const handleSidebarOnMobile = () => {
		if (windowDimensions.width <= 768) {
			props.activeSidebar();
		}
	};

	const signOut = () => {
		toast.loading('Đang đăng xuất...');
		removeCookie('all');

		setTimeout(() => {
			window.location.href = window.location.origin;
		}, 2000);
	};

	return (
		<li>
			<div className='profile-details'>
				<NavLink
					to='/account'
					className='profile-content'
					onClick={() => handleSidebarOnMobile()}
				>
					{account.avatar === undefined ? (
						<img src={Puff} alt='profile' />
					) : (
						<img src={account.avatar} alt='profile' />
					)}
				</NavLink>
				<NavLink
					to='/account'
					className='name-job'
					onClick={() => handleSidebarOnMobile()}
				>
					<div className='profile_name'>{account.name}</div>
					<div className='job'>{account.position}</div>
				</NavLink>
				<i className='bx bx-log-out' onClick={() => signOut()}></i>
			</div>
		</li>
	);
}
