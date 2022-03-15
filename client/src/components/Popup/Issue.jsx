import { actCreateIssue, closePopup } from 'actions';
import axios from 'axios';
import { enGB } from 'date-fns/locale';
import { useEffect, useRef, useState } from 'react';
import { DatePicker, useDateInput } from 'react-nice-dates';
import 'react-nice-dates/build/style.css';
import { useDispatch } from 'react-redux';
import { getCookie } from 'units/cookieWeb';
import QuillEditor from 'components/Editor/QuillEditor';

function useOutside(ref, order, unActiveDropdown) {
	useEffect(() => {
		function handleClickOutside(event) {
			if (ref.current && !ref.current.contains(event.target)) {
				unActiveDropdown(order);
			}
		}
		// Bind the event listener
		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [order, ref, unActiveDropdown]);
}

export default function Issue() {
	//? Initial State
	const initialState = {
		dataIssueInput: [
			{ label: 'Tên issue', value: '', placeholder: 'Nhập tên issue' }
		],
		dataIssueInputMulti: [
			{
				label: 'Project',
				value: '',
				idProject: '',
				placeholder: 'Chọn dự án',
				multiValue: [],
				activeDropdown: ''
			},
			{
				label: 'Kiểu',
				value: '',
				placeholder: 'Chọn kiểu issue',
				multiValue: [
					{ id: 1, name: 'Task', value: 'task' },
					{ id: 2, name: 'Bug', value: 'bug' }
				],
				activeDropdown: ''
			},
			{
				label: 'Ưu tiên',
				value: '',
				placeholder: 'Chọn mức độ ưu tiên',
				multiValue: [
					{ id: 1, name: 'Low', value: 'low' },
					{ id: 2, name: 'Medium', value: 'medium' },
					{ id: 3, name: 'High', value: 'high' },
					{ id: 4, name: 'Highest', value: 'highest' }
				],
				activeDropdown: ''
			},
			{
				label: 'Người được giao',
				value: '',
				email: '',
				placeholder: 'Chọn người được giao',
				multiValue: [],
				activeDropdown: ''
			}
		],
		dataIssueInputDate: [
			{ label: 'Gia hạn', value: '', placeholder: 'Hạn kết thúc' }
		],
		dataIssueInputAttactment: [{ label: 'Đính kèm tệp' }],
		dataIssueInputDescription: [
			{ label: 'Mô tả', value: '', placeholder: 'Nhập mô tả' }
		],
		readOnly: false
	};

	//? Create State
	const [state, setState] = useState(initialState);

	//? Connect Redux
	const dispatch = useDispatch();

	//? Create Effect
	useEffect(() => {
		const { id, token } = getCookie();

		(async () => {
			try {
				const res = await axios({
					method: 'GET',
					url: `https://hrmadmin.herokuapp.com/api/projectInfo/${id}`,
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`
					}
				});
				const data = res.data;

				if (
					!data.data?.status &&
					data.data?.status !== 'You are not in any project !'
				) {
					setState(prevState => ({
						...prevState,
						dataIssueInputMulti: [
							...prevState.dataIssueInputMulti.map((item, index) => {
								if (index === 0) item.multiValue = [...res.data];
								return item;
							})
						]
					}));
				}
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);

	//? Create Function
	const setInitialState = () => {
		setState(initialState);
	};

	const handleDataIssueChange = value => {
		setState(prevState => ({
			...prevState,
			dataIssueInput: [
				...prevState.dataIssueInput.map((item, index) => {
					if (index === value.order) {
						item.value = value.chooseValue;
					}
					return item;
				})
			]
		}));
	};

	const handleClosePopup = () => {
		setInitialState();
		dispatch(closePopup());
	};

	const toggleActiveDropdownMultipleValueInput = value => {
		setState(prevState => ({
			...prevState,
			dataIssueInputMulti: [
				...prevState.dataIssueInputMulti.map((item, index) => {
					if (index === value.order) item.activeDropdown = value.chooseValue;
					return item;
				})
			]
		}));
	};

	const setDropdownMultipleValueInput = value => {
		setState(prevState => ({
			...prevState,
			value: [
				...prevState.dataIssueInputMulti.map((item, index) => {
					if (index === value.order) item.value = value.chooseValue;
					if (value?.pid) item.idProject = value.pid;
					if (value?.email) item.email = value.email;
					return item;
				})
			]
		}));

		if (value.order === 0) setMemberProjectSelect(value.pcode);
	};

	const setMemberProjectSelect = async pcode => {
		const { id, token } = getCookie();

		setState(prevState => ({
			...prevState,
			dataIssueInputMulti: [
				...prevState.dataIssueInputMulti.map((item, index) => {
					if (index === 3) item.multiValue = [];
					return item;
				})
			]
		}));

		try {
			const res = await axios({
				method: 'GET',
				url: `https://hrmadmin.herokuapp.com/api/projectInfo/${id}`,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				},
				params: { search: 'member', projectCode: pcode }
			});

			if (!res.data.hasOwnProperty('status')) {
				setState(prevState => ({
					...prevState,
					dataIssueInputMulti: [
						...prevState.dataIssueInputMulti.map((item, index) => {
							if (index === 3) item.multiValue = [...res.data];
							return item;
						})
					]
				}));
			}
		} catch (error) {
			console.log(error);
		}
	};
	const handleDescription = content => {
		setState(prevState => ({
			...prevState,
			dataIssueInputDescription: [
				...prevState.dataIssueInputDescription.map((item, index) => {
					if (index === 0) item.value = content;
					return item;
				})
			]
		}));
	};
	const createIssue = () => {
		let data = {
			issueName: state.dataIssueInput[0].value,
			issueType: state.dataIssueInputMulti[1].value,
			issuePriority: state.dataIssueInputMulti[2].value,
			issueAssign: state.dataIssueInputMulti[3].email,
			issueDescription: '<p>Description</p>'
		};

		try {
			dispatch(actCreateIssue(state.dataIssueInputMulti[0].idProject, data));
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='popup__issue'>
			<form className='popup__issue__form'>
				<div className='popup__issue__form--col'>
					{state.dataIssueInput.map((item, index) => (
						<IssueItem
							key={index}
							order={index}
							dataItem={item}
							readOnly={state.readOnly}
							handleDataIssueChange={handleDataIssueChange}
						/>
					))}
					{state.dataIssueInputMulti.map((item, index) => (
						<IssueItemMultiple
							key={index}
							order={index}
							dataItem={item}
							readOnly={state.readOnly}
							toggleActive={toggleActiveDropdownMultipleValueInput}
							setValue={setDropdownMultipleValueInput}
							setMember={setMemberProjectSelect}
						/>
					))}
					{state.dataIssueInputDate.map((item, index) => (
						<IssueItemDate
							key={index}
							order={index}
							dataItem={item}
							readOnly={state.readOnly}
						/>
					))}
					{state.dataIssueInputAttactment.map((item, index) => (
						<IssueItemAttachment
							key={index}
							order={index}
							dataItem={item}
							readOnly={state.readOnly}
						/>
					))}
				</div>
				<div className='popup__issue__form--col'>
					{state.dataIssueInputDescription.map((item, index) => (
						<IssueItemDescription
							key={index}
							order={index}
							dataItem={item}
							readOnly={state.readOnly}
							handleDescription={handleDescription}
						/>
					))}
				</div>
			</form>
			<div className='popup__issue__btn-box'>
				<div className='issue__btn' onClick={createIssue}>
					Xác nhận
				</div>
				<div
					className='issue__btn'
					onClick={() => {
						handleClosePopup();
					}}
				>
					Huỷ
				</div>
			</div>
		</div>
	);
}

const IssueItem = ({ order, dataItem, readOnly, ...props }) => {
	return (
		<label className='popup__issue__item'>
			<p className='popup__issue__label'>{dataItem.label}</p>
			<div className='popup__issue__input-box fl-col'>
				<div className='popup__issue__input-box__item'>
					<input
						type='text'
						value={dataItem.value}
						className='popup__issue__input'
						name='name-project'
						placeholder={dataItem.placeholder}
						readOnly={readOnly}
						onChange={e => {
							props.handleDataIssueChange({
								chooseValue: e.target.value,
								order
							});
						}}
					/>
				</div>

				<div className='popup__issue__noti'></div>
			</div>
		</label>
	);
};

const IssueItemMultiple = ({ order, dataItem, readOnly, ...props }) => {
	const dropdown = useRef();

	const unActiveDropdown = () => {
		props.toggleActive({ order, chooseValue: '' });
	};

	useOutside(dropdown, order, unActiveDropdown);

	const checkOrder = (data, orderValue) => {
		switch (orderValue) {
			case 0: {
				return !data.multiValue || !data.multiValue.length ? (
					<div className='issue__dropdown__loading'>
						<img
							src={
								require('assets/bower_components/SVG-Loaders/svg-loaders/puff.svg')
									.default
							}
							alt='loading'
						/>
					</div>
				) : (
					data.multiValue.map(item => (
						<li
							key={item.projectId}
							className='issue__dropdown__li'
							onClick={() =>
								chooseItem({
									value: item.projectName,
									pid: item.projectId,
									pcode: item.projectCode
								})
							}
						>
							<div className='issue__dropdown__content'>{item.projectName}</div>
						</li>
					))
				);
			}

			case 1:
			case 2:
				return data.multiValue.map(item => (
					<li
						className='issue__dropdown__li'
						key={item.id}
						onClick={() => chooseItem({ value: item.value })}
					>
						<div className='issue__dropdown__content'>{item.name}</div>
					</li>
				));

			case 3: {
				return !data.multiValue.length ? (
					<div className='issue__dropdown__loading'>
						<img
							src={
								require('assets/bower_components/SVG-Loaders/svg-loaders/puff.svg')
									.default
							}
							alt='loading'
						/>
					</div>
				) : (
					data.multiValue.map(item => (
						<li
							className='issue__dropdown__li'
							key={item.id}
							onClick={() =>
								chooseItem({ value: item.name, email: item.email })
							}
						>
							<div className='issue__dropdown__img'>
								<img src={item.avatar} alt='avatar' />
							</div>
							<div className='issue__dropdown__content'>{item.name}</div>
						</li>
					))
				);
			}

			default:
				return '';
		}
	};
	const chooseItem = dataOption => {
		props.setValue({
			order,
			chooseValue: dataOption.value,
			pid: dataOption?.pid,
			pcode: dataOption?.pcode,
			email: dataOption?.email
		});
	};

	return (
		<label className='popup__issue__item'>
			<p className='popup__issue__label'>{dataItem.label}</p>
			<div className='popup__issue__input-box fl-col'>
				<div
					className='popup__issue__input-box__item'
					onClick={() => {
						let classChooseValue = '';
						if (dataItem.activeDropdown === '') classChooseValue = 'active';
						props.toggleActive({ order, chooseValue: classChooseValue });
					}}
				>
					<input
						type='text'
						value={dataItem.value}
						className='popup__issue__input select'
						placeholder={dataItem.placeholder}
						readOnly={true}
					/>
					<img
						src={require('assets/images/icons/arrow-bottom.svg').default}
						alt='arrow'
						className={`popup__issue__image ${dataItem.activeDropdown}`}
					/>
				</div>
				<div className='popup__issue__noti'></div>
				<div
					className={`popup__issue__dropdown ${dataItem.activeDropdown}`}
					ref={dropdown}
				>
					<ul className='issue__dropdown__ul'>{checkOrder(dataItem, order)}</ul>
				</div>
			</div>
		</label>
	);
};

const IssueItemDate = ({ dataItem }) => {
	const [date, setDate] = useState();
	const timeInputProps = useDateInput({
		date,
		format: 'HH:mm',
		locale: enGB,
		onDateChange: setDate
	});
	return (
		<label className='popup__issue__item'>
			<p className='popup__issue__label'>{dataItem.label}</p>
			<div className='popup__issue__input-box fl-col'>
				<div className='popup__issue__input-box__item date'>
					<DatePicker
						date={date}
						onDateChange={setDate}
						locale={enGB}
						format='dd/MM/yyyy'
					>
						{({ inputProps, focused }) => (
							<input
								className={'input' + (focused ? ' -focused' : '')}
								style={{ width: '99%' }}
								{...inputProps}
							/>
						)}
					</DatePicker>{' '}
					<input
						className='input'
						style={{ width: '30%' }}
						{...timeInputProps}
					/>
				</div>

				<div className='popup__issue__noti'></div>
			</div>
		</label>
	);
};

const IssueItemAttachment = ({ order, dataItem, readOnly }) => {
	return (
		<label className='popup__issue__item'>
			<p className='popup__issue__label'>{dataItem.label}</p>
			<div className='popup__issue__input-box fl-col'>
				<div className='popup__issue__input-box__item file'>
					<img
						src={require('assets/images/icons/plus.svg').default}
						alt='file'
					/>
					<input type='file' className='popup__issue__input file' />
				</div>
				<div className='popup__issue__noti'></div>
			</div>
		</label>
	);
};

const IssueItemDescription = ({ order, dataItem, readOnly, ...props }) => {
	return (
		<label className='popup__issue__item editor'>
			<p className='popup__issue__label'>{dataItem.label}</p>
			<div className='popup__issue__input-box fl-col'>
				<div className='popup__issue__input-box__item editor'>
					<QuillEditor
						description={dataItem.value}
						handleDescription={props.handleDescription}
						placeholder='Nhập vào đây...'
						readOnly={readOnly}
					/>
				</div>
				<div className='popup__issue__noti'></div>
			</div>
		</label>
	);
};
