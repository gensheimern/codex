import React from 'react';
import { Card, CardHeader } from 'material-ui/Card';

export default class TextNotification extends React.Component {
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