import React, { useEffect, useState } from 'react';
import variantGlobal from 'units/variantGlobal';
import WorkflowCard from './WorkflowCard';

function WorkflowContainer() {
	//? Create State
	const [card] = useState([
		{
			title: 'Công việc của bạn',
			data: [
				{ title: 'Công việc', value: '12' },
				{ title: 'Đang làm', value: '3' }
			],
			icon: { plus: 'plus-gr.png', info: 'info_circle-gr.png' },
			type: 'work'
		},
		{
			title: 'Dự án của bạn',
			data: [
				{ title: 'Dự án', value: '9' },
				{ title: 'Công việc', value: '45' },
				{ title: 'Đang làm', value: '12' }
			],
			icon: { plus: 'plus-gr-2.png', info: 'info_circle-gr-2.png' },
			type: 'project'
		}
	]);

	//? Create effect
	useEffect(() => {
		document.title = `Không gian làm việc`;
	}, []);

	return (
		<div className='wf-container -wf-card'>
			<div className='row'>
				{card.map((item, index) => (
					<div className='col' key={index}>
						<WorkflowCard
							key={index}
							title={item.title}
							data={item.data}
							icon={item.icon}
							type={item.type}
							variants={variantGlobal({ type: 1, addValue: index * 0.3 })}
						/>
					</div>
				))}
			</div>
		</div>
	);
}

export default WorkflowContainer;
