import React from 'react';
import PropTypes from 'prop-types';
import Calender from './Calender.js';
import EventItem from '../event/EventItem';
import "./sidebars.css";

const labeledHr = (text) => (
	<div style={{
		width: '100%',
		height: '16px',
		borderBottom: '1px solid grey',
		textAlign: 'center',
	}}>
		<span style={{
			fontSize: '20px',
			backgroundColor: '#f1f1f1',
			padding: '0 30px',
			color: 'grey',
		}}>
			{text}
		  </span>
	</div>
);

export default class SidebarContent extends React.Component {

	render() {
		return (
			<div style={{
				padding: '2%',
			}}>
				<p>Your calendar</p>
				<div style={{
					width: '100%',
					marginRight: 'auto',
					marginLeft: 'auto',
				}}>
					<Calender/>
				</div>

				{labeledHr('Today')}

				<EventItem event={{
					id: 0,
					description: 'Mittagessen in der Mensa',
					name: 'Essen in der Mensa',
					place: 'Mensa',
					time:  new Date(),
					event: false,
					private: false,
					banner: 'pizza_card@3x.jpg',
					maxParticipants: 5,
					host: {
						//
					},
				}} />

				{labeledHr('Tomorrow')}

				<EventItem event={{
					id: 0,
					description: 'Grillen am Fluss',
					name: 'Grillen am Fluss',
					place: 'Fluss',
					time:  new Date(),
					event: true,
					private: false,
					banner: 'pasta_card@3x.jpg 	',
					maxParticipants: 5,
					host: {
						//
					},
				}} />


			</div>
				
		);
	}
}

SidebarContent.propTypes = {
	style: PropTypes.object,
};
