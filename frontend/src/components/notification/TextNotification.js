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
			containerStyle={{
				overflow: "hidden", borderRadius: "5px",
			}}
			style={{
				borderRadius:"8px",
				margin: '5px',
				marginBottom:"10px",
				...seenStyle,
			}}
		>
			<CardHeader
				titleStyle={
					{	height: "2.02%",	color: "#484444",	fontFamily: "Trebuchet MS",	fontSize: "16px",	fontWeight: "bold",	lineHeight: "19px",}
				}
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
