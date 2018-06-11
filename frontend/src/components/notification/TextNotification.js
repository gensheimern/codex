import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader } from 'material-ui/Card';
import dateUtils from './dateUtils';

const TextNotification = (props) => {
	const {
		title, type, message, time, seen,
	} = props.notification;
	const created = dateUtils.formatDate(new Date(time));

	const seenStyle = seen ? null : { backgroundColor: '#b5daff' };

	return (
		<Card
			style={{
				margin: '5px',
				...seenStyle,
			}}
		>
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
			{props.children}
		</Card>
	);
};

TextNotification.propTypes = {
	notification: PropTypes.shape({
		id: PropTypes.number,
		title: PropTypes.string,
		type: PropTypes.string,
		message: PropTypes.string,
		time: PropTypes.string,
		seen: PropTypes.bool,
	}).isRequired,
	children: PropTypes.arrayOf(PropTypes.element),
};

TextNotification.defaultProps = {
	children: null,
};

export default TextNotification;
