import React from 'react';
import PropTypes from 'prop-types';
import TextNotification from './TextNotification';

export default class ReminderNotification extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};
	}
	// TODO: Show time remaining until event starts
	render() {
		return (
			<TextNotification notification={this.props.notification} />
		);
	}
}

ReminderNotification.propTypes = {
	notification: PropTypes.shape({
		id: PropTypes.number,
		title: PropTypes.string,
		type: PropTypes.string,
		message: PropTypes.string,
		time: PropTypes.string,
		seen: PropTypes.bool,
	}).isRequired,
};
