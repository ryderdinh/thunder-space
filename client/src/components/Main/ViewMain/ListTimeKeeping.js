import React from 'react';
import { connect } from 'react-redux';
import ListTimeKeepingItem from './ListTimeKeepingItem';
import { actFetchTimeKeeping } from 'actions';
import { motion } from 'framer-motion';
export class ListTimeKeeping extends React.Component {
	state = { timeOfAttendance: [] };

	componentDidMount() {
		this.props.actFetchTimeKeeping();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.timeOfAttendance !== this.props.timeOfAttendance) {
			this.setState({
				timeOfAttendance: this.props.timeOfAttendance
					.reverse()
					.map((value, index) => (
						<ListTimeKeepingItem
							key={index}
							time={value[0]}
							rangeMetter={value[1]}
						/>
					))
			});
		}
	}

	render() {
		let { variants, isLoading } = this.props;
		return (
			<motion.div
				className='view_item list-time-keeping'
				variants={variants}
				initial='hidden'
				animate='visible'
				exit='exit'
			>
				<div className='label'>Lịch sử chấm công</div>
				{isLoading ? (
					'Đang tải'
				) : (
					<div className='list-time-keeping_box'>
						{this.state.timeOfAttendance.length === 0
							? 'Không có dữ liệu'
							: this.state.timeOfAttendance}
					</div>
				)}
			</motion.div>
		);
	}
}
const mapStateToProps = state => {
	return {
		timeOfAttendance: state._timeOfAttendance._list,
		isLoading: state._timeOfAttendance._isLoading
	};
};
export default connect(mapStateToProps, { actFetchTimeKeeping })(
	ListTimeKeeping
);
