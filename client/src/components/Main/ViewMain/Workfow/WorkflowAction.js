import React, { useEffect, useRef, useState } from 'react';
import Plus from 'assets/images/icons/plus.svg';
import Filter from 'assets/images/icons/filter.svg';
import Reload from 'assets/images/icons/reload.svg';
import Search from 'assets/images/icons/search-1.svg';
import Info from 'assets/images/icons/info_circle.svg';
import List from 'assets/images/icons/list.svg';
import { useDispatch } from 'react-redux';
import { setPopup } from 'actions';

function useOutsideSearchBox(ref, handle) {
	useEffect(() => {
		function handleClickOutside(event) {
			if (ref.current && !ref.current.contains(event.target)) {
				handle('out');
			}
		}

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [ref, handle]);
}

export default function WorkflowAction({ type, ...props }) {
	//? Create State
	const [state, setState] = useState({ search: { active: '', value: '' } });

	//? Create Ref
	const searchBox = useRef(null);

	//? Create Dispatch
	const dispatch = useDispatch();

	//? Create Function
	const handleSearchBox = value => {
		value === 'in'
			? setState(prevState => ({
					...prevState,
					search: { ...prevState.search, active: 'active' }
			  }))
			: setState(prevState => ({
					...prevState,
					search: { ...prevState.search, active: '', value: '' }
			  }));
	};
	const handleSearch = () => {
		props.handleSearchIssue();
	};
	const handleInputSearchChange = e => {
		props.handleSetIssueFromSearch(e.target.value);
	};
	const handleInputSearchKeyUp = e => {
		handleSearch();
	};
	const handleClickIconSearch = () => {
		if (state.search.active === 'active') handleSearch();
	};

	useOutsideSearchBox(searchBox, handleSearchBox);

	switch (type) {
		case 'add':
			return (
				<div
					className={`wf-action--item ${type} pointer`}
					onClick={() => {
						dispatch(
							setPopup({
								typePopup: 'project',
								isShow: true,
								dataPopup: { type: 'create' }
							})
						);
					}}
					// onClick={() => {
					// 	dispatch(
					// 		setPopup({
					// 			typePopup: 'issue',
					// 			isShow: true,
					// 			dataPopup: { type: 'create' }
					// 		})
					// 	);
					// }}
				>
					<img src={Plus} alt='icon' />
				</div>
			);
		case 'list':
			return (
				<div className={`wf-action--item ${type} pointer`}>
					<img src={List} alt='icon' />
				</div>
			);
		case 'search':
			return (
				<div
					className={`wf-action--item ${type} ${state.search.active} pointer`}
					ref={searchBox}
					onClick={() => {
						handleSearchBox('in');
					}}
				>
					<div className='wf-action--item__input'>
						<input
							type='text'
							value={props.search}
							placeholder='Nhập mã issue'
							onChange={handleInputSearchChange}
							onKeyUp={handleInputSearchKeyUp}
						/>
					</div>
					<img src={Search} alt='icon' onClick={handleClickIconSearch} />
				</div>
			);
		case 'filter':
			return (
				<div className={`wf-action--item ${type} pointer`}>
					<img src={Filter} alt='icon' />
				</div>
			);
		case 'reload':
			return (
				<div className={`wf-action--item ${type} pointer`}>
					<img src={Reload} alt='icon' />
				</div>
			);
		case 'info':
			return (
				<div className={`wf-action--item ${type} pointer`}>
					<img src={Info} alt='icon' />
				</div>
			);
		default:
			return (
				<div className={`wf-action--item ${type} pointer`}>
					<img src={Reload} alt='icon' />
				</div>
			);
	}
}
