import React from 'react';
export default class NameContainer extends React.Component {
	render() {
		return (
			<p className='name animate__animated animate__flip'>{this.props.name}</p>
		);
	}
}
