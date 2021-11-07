import React from 'react';
export default class ListTimeKeepingItem extends React.Component {
	convertTime(time) {
		const date = new Date(time);
		return date.toLocaleTimeString('en-US', {
			hour: '2-digit',
			minute: '2-digit'
		});
	}
	render() {
		const { time, rangeMetter } = this.props;

		return (
			<div className='list-time-keeping_item'>
				<div className='icon_timeline'>
					<img src={require('assets/images/icons/gps.svg').default} alt='' />
					<div className='rect'></div>
				</div>
				<div className='detail'>
					<div className='time'>{this.convertTime(time)}</div>
					<div className='range'>
						<p>{`Cách công ty ${rangeMetter}m`}</p>
					</div>
				</div>
			</div>
		);
	}
}
