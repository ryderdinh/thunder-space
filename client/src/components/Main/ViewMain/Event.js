import React, { Component } from 'react';
import { connect } from 'react-redux';
import EventItem from './EventItem';
// import { actFetchEvents } from "actions";
import { motion } from 'framer-motion';

export class Event extends Component {
	render() {
		const { events, variants } = this.props;
		console.log(events);
		return (
			<motion.div
				className='view_item event'
				variants={variants}
				initial='hidden'
				animate='visible'
				exit='exit'
			>
				{events.map(value => (
					<EventItem key={value[0].date} dataEvent={value} />
				))}
			</motion.div>
		);
	}
}

const mapStateToProps = state => ({
	events: state._events._events
});

export default connect(mapStateToProps, null)(Event);
