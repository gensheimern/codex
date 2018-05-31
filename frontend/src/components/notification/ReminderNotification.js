import React from 'react';
import { Card, CardHeader } from 'material-ui/Card';

export default class ReminderNotification extends React.Component {
	// TODO: Show time remaining until event starts
	render() {
		const { title, type, message } = this.props.notification;
		return(
			<React.Fragment>
				<Card style={{margin: '5px'}}>
					<CardHeader
						title={`${title} - ${type}`}
						subtitle={message}
						style={{
							paddingTop: '10px',
							paddingBottom: '10px',
						}}
					/>
				</Card>
			</React.Fragment>
		);
	}
}