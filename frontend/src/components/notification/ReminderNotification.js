import React from 'react';
import TextNotification from './TextNotification';

export default class ReminderNotification extends React.Component {
	// TODO: Show time remaining until event starts
	render() {
		return(
			<TextNotification notification={this.props.notification}/>
		);
	}
}