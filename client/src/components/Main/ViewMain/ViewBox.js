import React from 'react';
import ViewBoxName from './ViewBoxName';
import TimeKeeping from './TimeKeeping';
import ListTimeKeeping from './ListTimeKeeping';
import Event from './Event';
import Timesheets from './Timesheets';
import ReportForm from './ReportForm';
import AccountContainer from './AccountContainer';
import ProjectContainer from './Workfow/ProjectContainer';
import Issue from './Issue/Issue';
import TimesheetDetail from './TimesheetDetail';
// import { motion } from "framer-motion";
export default class ViewBox extends React.Component {
	state = {
		firstVariants: {
			hidden: {
				opacity: 0,
				y: '-30px'
			},
			visible: {
				opacity: 1,
				y: 0,
				transition: { type: 'spring', delay: 0.3 }
			},
			exit: {
				opacity: 0,
				y: '-30px',
				transition: { ease: 'easeInOut', delay: 0 }
			}
		},
		secondVariants: {
			hidden: {
				opacity: 0,
				y: '-30px'
			},
			visible: {
				opacity: 1,
				y: 0,
				transition: { type: 'spring', delay: 0.6 }
			},
			exit: {
				opacity: 0,
				y: '-30px',
				transition: { ease: 'easeInOut', delay: 0.3 }
			}
		},
		thirdVariants: {
			hidden: {
				opacity: 0,
				y: '-30px'
			},
			visible: {
				opacity: 1,
				y: 0,
				transition: { type: 'spring', delay: 0.9 }
			},
			exit: {
				opacity: 0,
				y: '-30px',
				transition: { ease: 'easeInOut', delay: 0.6 }
			}
		},
		childVariants: {
			hidden: {
				opacity: 0,
				y: '-30px'
			},
			visible: {
				opacity: 1,
				y: 0,
				transition: { type: 'spring', delay: 0.5 }
			},
			exit: {
				y: '-30px',
				transition: { ease: 'easeInOut' }
			}
		}
	};

	renderComponent = type => {
		switch (type) {
			case 'timesheets':
				return (
					<>
						<Timesheets variants={this.state.firstVariants} />
						<TimesheetDetail variants={this.state.secondVariants} />
					</>
				);
			case 'report':
				return (
					<>
						<ViewBoxName
							name={'Form xin nghỉ phép'}
							variants={this.state.childVariants}
						/>
						<ReportForm />
					</>
				);
			case 'project':
				return <ProjectContainer variants={this.state.childVariants} />;
			case 'issue':
				return <Issue />;
			case 'account':
				return <AccountContainer variants={this.state.childVariants} />;
			default:
				return (
					<>
						<ViewBoxName name={'Chấm công'} />
						<TimeKeeping variants={this.state.firstVariants} />
						<ListTimeKeeping variants={this.state.secondVariants} />
						<ViewBoxName name={'Sự kiện'} />
						<Event variants={this.state.thirdVariants} />
					</>
				);
		}
	};

	render() {
		return (
			<div className='col view-box'>
				{this.renderComponent(this.props.pathName)}
			</div>
		);
	}
}
