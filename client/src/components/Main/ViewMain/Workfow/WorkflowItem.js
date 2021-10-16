import React from 'react';
import { Link } from 'react-router-dom';
import WorkflowIntruction from './WorkflowIntruction';
import { motion } from 'framer-motion';

export default function WorkflowItem({ data, variants }) {
	// console.log(variants.visible.transition);
	const {
		type,
		projectCode,
		issueId,
		issueCode,
		issueType,
		issueName,
		toIssue
	} = data;
	console.log(data);
	switch (type) {
		case 'project':
			return (
				<motion.div
					className='wf--item-box'
					variants={variants}
					initial='initial'
					animate='enter'
					exit='exit'
				>
					<Link to={`/${toIssue}`} className='wf--item pointer'>
						<div className='col'>
							<WorkflowIntruction
								projectCode={projectCode}
								issueId={issueId}
								issueCode={issueCode}
							/>
							<div className='wf--item-content'>
								<p>{issueName}</p>
							</div>
						</div>
						<div className='col'>
							<div className={`wf--item-type ${issueType}`}></div>
						</div>
					</Link>
				</motion.div>
			);

		default:
			return (
				<motion.div
					className='wf--item pointer'
					variants={variants}
					initial='initial'
					animate='enter'
					exit='exit'
				>
					<div className='col'>
						<WorkflowIntruction
							projectCode={projectCode}
							issueId={issueId}
							issueCode={issueCode}
						/>
						<div className='wf--item-content'>
							<p>{issueName}</p>
						</div>
					</div>
					p
					<div className='col'>
						<div className={`wf--item-type ${issueType}`}></div>
					</div>
				</motion.div>
			);
	}
}
