import React from 'react'
import { Card, CardHeader } from 'material-ui/Card';
import dateUtils from './dateUtils';

export default class TextNotification extends React.Component {
	render() {
		const { title, type, message, time, seen } = this.props.notification;
		const created = dateUtils.formatDate(new Date(time));

		const seenStyle = seen ? null : {backgroundColor: '#b5daff'};

		return(
			<Card style={{
				margin: '5px',
				...seenStyle,
			}}>
				<CardHeader
					title={`${title} - ${type}`}
					subtitle={`${message} - ${created}`}
					style={{
						paddingTop: '10px',
						paddingBottom: '10px',
					}}
					textStyle={{
						paddingRight: 0,
					}}
				/>
				{this.props.children}
			</Card>
		);
	}
}