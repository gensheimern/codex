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
		marginTop: '5px',
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

const compareDate = (date1, date2) => {
	if (!date1 || !date2) {
		return false;
	}

	return date1.getFullYear() === date2.getFullYear()
		&& date1.getMonth() === date2.getMonth()
		&& date1.getDate() === date2.getDate();
}

const isToday = (date) => {
	return compareDate(date, new Date());
}

const isTomorrow = (date) => {
	const today = new Date();
	return compareDate(date, new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1));
}

const monthName = [
	'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',
]

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

		this.loadEvents = this.loadEvents.bind(this);
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
		console.log(this.props.mainContentNumber);
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

		let events = null;

		if (this.state.events.length === 0) {
			events = (
				<RetryPrompt
					onRetry={() => { this.loadEvents() }}
					message="You currently have no scheduled events."
					btnMessage="Reload"
				/>
			);
		}

		let lastDate = null;

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
						mainContentNumber={this.props.mainContentNumber}
						searchFilterFeed={this.props.searchFilterFeed}
						eventDates={eventDates}
						changeDate={this.onDateChange}
					/>
					<br/>
				</div>

				{/* labeledHr('Today') */}

				{this.state.events.map((event) => {
					const eventDate = new Date(event.time);

					let hr = null;
					let  label = `${eventDate.getDate()} ${monthName[eventDate.getMonth()]} ${eventDate.getFullYear()}`;
					if (isToday(eventDate)) {
						label = 'Today';
					} else if (isTomorrow(eventDate)) {
						label = 'Tomorrow';
					}

					if (!compareDate(eventDate, lastDate)) {
						hr = labeledHr(label);
					}

					lastDate = eventDate;

					return (
						<React.Fragment>
							{hr}
							<EventItem
								event={event}
								key={event.id}
							/>
						</React.Fragment>
					);
				})
				}
				{events}
			</div>

		);
	}
}

SidebarContent.propTypes = {
	style: PropTypes.object,
};
