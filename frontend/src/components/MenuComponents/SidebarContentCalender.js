import React from 'react';
import PropTypes from 'prop-types';
// import Calendar from 'react-calendar';
import Calendar from './Calendar';
import EventItem from '../event/EventItem';
import "./sidebars.css";
import config from '../../config';
import LoadingAnimation from '../tools/LoadingAnimation';
import RetryPrompt from '../tools/RetryPrompt';

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
	constructor(props) {
		super(props);

		this.state = {
			date: new Date(),
			events: [],
			valid: false,
			loading: false,
			error: null,
		};
	}

	componentDidMount() {
		this.loadEvents();
	}

	loadEvents() {
		this.setState({
			loading: true,
			error: null,
		});

		fetch(config.apiPath + "/activity/joined", {
            method: 'GET',
            headers: {
				'Content-Type': 'application/json',
				'X-Access-Token': localStorage.getItem('apiToken'),
            }
		})
		.then((res) => {
            if(!res.ok) {
                throw new Error("Response not ok.");
            } else if(res.status !== 200) {
                throw new Error("An error occured.");
            }
            return res.json();
		})
		.then((res) => {
            this.setState({
				events: res,
				loading: false,
				valid: true,
			});
        }).catch((error) => {
			this.setState({
				valid: false,
				loading: false,
				error,
			});
		});
	}

	onDateChange = (date) => {
		this.setState({
			date,
		});
		console.log(date);
		// TODO: filter personal feed
	};

	render() {
		const eventDates = [];

		this.state.events.forEach((event) => {
			eventDates.push(new Date(event.time));
		});

		/*return (
			<div style={{margin: '1%'}}><Calendar
			eventDates={[new Date()]}
			changeDate={this.onDateChange}
		/></div>);*/

		if (this.state.loading && !this.state.valid) {
			return <LoadingAnimation/>
		}
		
		if (this.state.error) {
			return (
				<RetryPrompt
					onRetry={() => { this.loadEvents()}}
					message="Could not load events."
					btnMessage="Retry"
				/>
			);
		}

		if (this.state.events.length === 0) {
			return (
				<RetryPrompt
					onRetry={() => { this.loadEvents() }}
					message="You currently have no scheduled events."
					btnMessage="Reload"
				/>
			);
		}

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
					<Calendar
						eventDates={eventDates}
						changeDate={this.onDateChange}
					/>
					<br/>
				</div>

				{labeledHr('Today')}

				{this.state.events.map((event) => {
					return (
						<EventItem
							event={event}
							key={event.id}
						/>
					);
				})
				}

				{/*<EventItem event={{
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
				}} />*/}


			</div>
				
		);
	}
}

SidebarContent.propTypes = {
	style: PropTypes.object,
};
