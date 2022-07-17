import React, { useState } from 'react';
import { setPopup } from 'actions';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function WorkflowCard({ title, data, icon, type, variants }) {
	const [arrow, setArrow] = useState('');

	const dispatch = useDispatch();

	const handleCreate = () => {
		if (type === 'work') {
			dispatch(
				setPopup({
					typePopup: 'work',
					isShow: true,
					dataPopup: { type: 'create' }
				})
			);
			return;
		}

		dispatch(
			setPopup({
				typePopup: 'project',
				isShow: true,
				dataPopup: { type: 'create' }
			})
		);
	};

	const handleOverview = () => {};

	return (
		<motion.div
			className={`card ${type === 'work' ? '-work-card' : '-project-card'}`}
			variants={variants}
			initial='hidden'
			animate='visible'
			exit='exit'
		>
			<div className='card-body'>
				<div className='card-title'>
					<h5 className='card-title-content'>
						<p>{title}</p>
					</h5>
					<div
						className={`card-icon ${arrow}`}
						onMouseOver={() =>
							setArrow('animate__animated animate__rubberBand animate_infinite')
						}
						onMouseOut={() => setArrow('')}
					>
						<FontAwesomeIcon icon='fa-solid fa-right-long' color='white' />
					</div>
				</div>
				<div className='card-data'>
					{data.map((item, index) => (
						<div className='card-data--item' key={index}>
							<div className='card-data--item-value'>
								<p>{item.value}</p>
							</div>
							<div className='card-data--item-title'>
								<p>{item.title}</p>
							</div>
						</div>
					))}
				</div>
				<div className='btn-box'>
					<ButtonItem
						label={'Tạo mới'}
						icon={icon.plus}
						handleOnClick={handleCreate}
					/>
					<ButtonItem
						label={'Tổng quan'}
						icon={icon.info}
						handleOnClick={handleOverview}
					/>
				</div>
			</div>
		</motion.div>
	);
}

export default WorkflowCard;

function ButtonItem({ label, icon, handleOnClick }) {
	return (
		<div className='btn--item' onClick={() => handleOnClick()}>
			<div className='btn--item__icon'>
				<img src={require(`assets/images/icons/${icon}`).default} alt='Plus' />
			</div>
			<div className='btn--item__content'>{label}</div>
		</div>
	);
}
