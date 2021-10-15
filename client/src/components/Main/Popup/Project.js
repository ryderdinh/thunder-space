import React, { useEffect, useRef, useState } from 'react';
import { actCreateProject, closePopup } from 'actions';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { getAllCookie } from 'units/cookieWeb';
import toast from 'react-hot-toast';

function useOutsidePopup(ref, handle) {
	useEffect(() => {
		function handleClickOutside(event) {
			if (ref.current && !ref.current.contains(event.target)) {
				handle();
			}
		}
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [ref, handle]);
}

const Project = ({ dataPopup }) => {
	//? Create State
	const [state, setState] = useState({
		readonly: true,
		projectName: '',
		projectCode: '',
		projectManager: '',
		projectMember: '',
		noti: { members: '', managers: '' },
		users: {
			members: [],
			managers: []
		}
	});

	//? Connect redux
	let project = useSelector(state => state._project._dataProject[0]);
	// let staffInfomation = useSelector(
	//   (state) => state._staffInfomation._staffInfomation
	// );
	const dispatch = useDispatch();

	//? Create Ref
	const popup = useRef();

	//? Create Effect
	useEffect(() => {
		if (dataPopup?.type === 'create') {
			setState(prevState => ({ ...prevState, readonly: false }));
		} else {
			setState(prevState => ({
				...prevState,
				projectName: project.projectName,
				projectCode: project.projectCode
			}));
		}
	}, [dataPopup.type, project]);

	//? Create Function
	const handleClosePopup = () => {
		dispatch(closePopup());
	};
	const searchUser = async e => {
		console.log(state.users);
		let typeInput = e.target.id;
		if (e.key === 'Enter') {
			let email = e.target.value.trim();
			if (email !== '') {
				const { id, token } = getAllCookie();
				try {
					const result = await axios({
						method: 'GET',
						url: `https://hrmadmin.herokuapp.com/api/searchUser`,
						params: {
							email
						},
						headers: {
							authorization: `Bearer ${token}`
						}
					});
					if (result.data.data?.status) {
						typeInput === 'managerInputAdd'
							? setState(prevState => ({
									...prevState,
									noti: { ...prevState.noti, managers: 'Không tìm thấy user' }
							  }))
							: setState(prevState => ({
									...prevState,
									noti: { ...prevState.noti, members: 'Không tìm thấy user' }
							  }));
					} else {
						if (result.data.data.id === id) {
							typeInput === 'managerInputAdd'
								? setState(prevState => ({
										...prevState,
										projectManager: '',
										noti: {
											...prevState.noti,
											managers: 'Bạn đã có sẵn trong danh sách này'
										}
								  }))
								: setState(prevState => ({
										...prevState,
										projectMember: '',
										noti: {
											...prevState.noti,
											members: 'Bạn đã có sẵn trong danh sách này'
										}
								  }));
						} else {
							if (typeInput === 'managerInputAdd') {
								if (
									state.users.managers.find(
										manager => manager.id === result.data.data.id
									) === undefined
								) {
									addUser('manager', result.data.data, email);
									if (
										state.users.members.find(
											member => member.id === result.data.data.id
										) === undefined
									)
										addUser('member', result.data.data, email);
								} else {
									setState(prevState => ({
										...prevState,
										projectManager: '',
										noti: {
											...prevState.noti,
											managers: 'Email đã có sẵn trong danh sách này'
										}
									}));
								}
							} else {
								if (
									state.users.members.find(
										member => member.id === result.data.data.id
									) === undefined
								)
									addUser('member', result.data.data, email);
								else {
									setState(prevState => ({
										...prevState,
										projectMember: '',
										noti: {
											...prevState.noti,
											members: 'Email đã có sẵn trong danh sách này'
										}
									}));
								}
							}
						}
					}
				} catch (error) {
					console.log(error);
					toast.error('Lỗi');
				}
			} else {
			}
		}
	};
	const addUser = (typeUser, dataUser, emailUser) => {
		typeUser === 'manager'
			? setState(prevState => ({
					...prevState,
					projectManager: '',
					users: {
						...prevState.users,
						managers: [
							...prevState.users.managers,
							{
								id: dataUser.id,
								name: dataUser.name,
								email: emailUser
							}
						]
					}
			  }))
			: setState(prevState => ({
					...prevState,
					projectMember: '',
					users: {
						...prevState.users,
						members: [
							...prevState.users.members,
							{
								id: dataUser.id,
								name: dataUser.name,
								email: emailUser
							}
						]
					}
			  }));
	};
	const removeUser = (typeProjectUser, idUser) => {
		if (typeProjectUser === 'manager')
			setState(prevState => ({
				...prevState,
				users: {
					...prevState.users,
					managers: prevState.users.managers.filter(
						manager => manager.id !== idUser
					)
				}
			}));
		else
			setState(prevState => ({
				...prevState,
				users: {
					...prevState.users,
					members: prevState.users.members.filter(
						member => member.id !== idUser
					)
				}
			}));
	};
	const createProject = () => {
		let data = {
			projectCode: state.projectCode,
			projectName: state.projectName,
			projectManager: state.users.managers,
			projectMember: state.users.members
		};
		dispatch(actCreateProject(data));
	};
	const handleProjectNameChange = e => {
		setState(prevState => ({ ...prevState, projectName: e.target.value }));
	};
	const handleProjectCodeChange = e => {
		setState(prevState => ({ ...prevState, projectCode: e.target.value }));
	};
	const handleProjectManagerChange = e => {
		setState(prevState => ({
			...prevState,
			projectManager: e.target.value,
			noti: { ...prevState.noti, managers: '' }
		}));
	};
	const handleProjectMemberChange = e => {
		setState(prevState => ({
			...prevState,
			projectMember: e.target.value,
			noti: { ...prevState.noti, members: '' }
		}));
	};

	//? Use Function
	useOutsidePopup(popup, handleClosePopup);

	return (
		<div className='popup__project' ref={popup}>
			<form className='popup__project__form'>
				<label className='popup__project__item'>
					<p className='popup__project__label'>Tên dự án</p>
					<input
						type='text'
						value={state.projectName}
						className='popup__project__input'
						name='name-project'
						placeholder='Nhập tên dự án'
						readOnly={state.readonly}
						onChange={handleProjectNameChange}
					/>
				</label>
				<label className='popup__project__item'>
					<p className='popup__project__label'>Mã dự án</p>
					<input
						type='text'
						value={state.projectCode}
						className='popup__project__input'
						name='current-password'
						placeholder='Mã dự án ít hơn 6 kí tự'
						readOnly={state.readonly}
						onChange={handleProjectCodeChange}
					/>
				</label>
				<label className='popup__project__item'>
					<p className='popup__project__label'>Quản lí dự án</p>
					<div className='popup__project__search'>
						<div className='popup__project__search-input'>
							<input
								id='managerInputAdd'
								type='text'
								value={state.projectManager}
								className='popup__project__input'
								name='current-password'
								placeholder='Nhập email bạn cần thêm'
								readOnly={state.readonly}
								onChange={handleProjectManagerChange}
								onKeyUp={searchUser}
								autoComplete={false}
								autoCorrect={false}
							/>
							<img
								src={require('assets/images/icons/search.svg').default}
								alt='search'
							/>
						</div>
						<div className='popup__project__noti'>{state.noti.managers}</div>
						<div className='popup__project__tags-user'>
							{state.users.managers.map(manager => (
								<div className='tags-user__item' key={manager.id}>
									<p className='tags-user__name'>{manager.name}</p>
									<div className='tags-user__action remove'>
										<img
											src={require('assets/images/icons/gps_off.svg').default}
											alt='remove'
										/>
									</div>
								</div>
							))}
						</div>
					</div>
				</label>
				<label className='popup__project__item'>
					<p className='popup__project__label'>Thành viên</p>
					<div className='popup__project__search'>
						<div className='popup__project__search-input'>
							<input
								id='memberInputAdd'
								type='text'
								value={state.projectMember}
								className='popup__project__input'
								name='current-password'
								placeholder='Nhập email bạn cần thêm'
								readOnly={state.readonly}
								onChange={handleProjectMemberChange}
								onKeyUp={searchUser}
								autoComplete={false}
								autoCorrect={false}
							/>
							<img
								src={require('assets/images/icons/search.svg').default}
								alt='search'
							/>
						</div>
						<div className='popup__project__noti'>{state.noti.members}</div>
						<div className='popup__project__tags-user'>
							{state.users.members.map(member => (
								<div className='tags-user__item' key={member.id}>
									<p className='tags-user__name'>{member.name}</p>
									<div
										className='tags-user__action remove'
										onClick={() => {
											removeUser('member', member.id);
										}}
									>
										<img
											src={require('assets/images/icons/gps_off.svg').default}
											alt='remove'
										/>
									</div>
								</div>
							))}
						</div>
					</div>
				</label>
			</form>
			<div className='popup__project__btn-box d-flex'>
				<div className='project__btn' onClick={createProject}>
					Tạo
				</div>
				<div
					className='project__btn'
					onClick={() => {
						handleClosePopup();
					}}
				>
					Huỷ
				</div>
			</div>
		</div>
	);
};

export default Project;
