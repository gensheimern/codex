import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import muiThemable from 'material-ui/styles/muiThemeable';
import './Calendar.css';

const monthNames = [
	'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',
];

class Calendar extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			date: new Date(),
		};
	}

	monthChange = (forward) => {
		this.setState((prevState, props) => {
			const year = prevState.date.getFullYear();
			const month = forward
				? prevState.date.getMonth() + 1
				: prevState.date.getMonth() - 1;
			let day = prevState.date.getDate();

			const daysInNewMonth = new Date(year, month + 1, 0).getDate();

			if (day > daysInNewMonth) {
				day = daysInNewMonth;
			}

			props.changeDate(new Date(year, month, day));

			return ({
				date: new Date(year, month, day),
			});
		});
	}

	render() {
		const buttonStyle = {
			outline: 'none',
			border: 0,
			backgroundColor: 'transparent',
		};

		let days = [];

		const year = this.state.date.getFullYear();
		const month = this.state.date.getMonth() + 1;

		const daysInMonth = new Date(year, month, 0).getDate();
		const daysInLastMonth = new Date(year, month - 1, 0).getDate();
		const daysOfLastMonthShown = ((new Date(year, month - 1, 1).getDay() + 6) % 7);
		const daysOfNextMonthShown = (7 -((daysOfLastMonthShown + daysInMonth) % 7)) % 7;

		// Add dates of last month that are in the same week as the first day in the current month
		for (let i = daysOfLastMonthShown - 1; i >= 0; i--) {
			days.push({
				name: daysInLastMonth - i,
				backgroundColor: 'transparent',
				color: 'lightgrey',
				border: 'transparent',
				date: new Date(this.state.date.getFullYear(), this.state.date.getMonth() - 1, daysInLastMonth - i),
			});
		}

		// Add days of the current month
		for(let i = 1; i <= daysInMonth; i++) {
			let backgroundColor = 'transparent';
			let color = 'black';
			let border = 'white';

			// Mark all days with events
			this.props.possibleDates.forEach((date) => {
				if (date.getDate() === i && date.getMonth() === this.state.date.getMonth() && date.getFullYear() === this.state.date.getFullYear()) {
					border = '#cacaca';
				}
			});

			// Mark all days with joined events
			this.props.eventDates.forEach((date) => {
				if (date.getDate() === i && date.getMonth() === this.state.date.getMonth() && date.getFullYear() === this.state.date.getFullYear()) {
					border = this.props.muiTheme.palette.primary1Color;
				}
			});

			if (this.state.date.getDate() === i) {
				backgroundColor = this.props.muiTheme.palette.primary1Color;
				color = '#ffffff';
			}

			days.push({
				name: i,
				backgroundColor,
				color,
				border,
				date: new Date(this.state.date.getFullYear(), this.state.date.getMonth(), i),
			});
		}

		// Add dates of next month that are in the same week as the last day in the current month
		for (let i = 1; i < daysOfNextMonthShown + 1; i++) {
			days.push({
				name: i,
				backgroundColor: 'transparent',
				color: 'lightgrey',
				border: 'transparent',
				date: new Date(this.state.date.getFullYear(), this.state.date.getMonth() + 1, i),
			});
		}

		const weekdays = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SO'];

		return (
			<Paper style={{
				padding: '3vw',
			}}>
				<div style={{
					textAlign: 'center',
					fontSize: '120%'
				}}>
					<button style={buttonStyle} onClick={() => this.monthChange(false)}>&lt;</button>
					{this.state.date.getDate()} {monthNames[this.state.date.getMonth()]} {this.state.date.getFullYear()}
					<button style={buttonStyle} onClick={() => this.monthChange(true)}>&gt;</button>
				</div>

				{/* Weekday names */}
				{weekdays.map((weekday, index) => (
					<div key={index} className="weekday">
						<div className="contents">
							{weekday}
						</div>
					</div>
				))}

				{/* Days in month */}
				<div style={{
					width: '100%',
					overflow: 'hidden',
				}}>
					{days.map((day, index) => {
						return (
							<div
								key={index}
								className="calendarDate"
								style={{
									cursor: 'pointer',
									backgroundColor: day.backgroundColor,
									color: day.color,
									border: `2px solid ${day.border}`,
								}}
								onClick={() => {
									this.setState({date: day.date});
									this.props.changeDate(day.date);
									this.props.filterPersonalFeed(day.date);

								}}
							>
								<div className="contents">
									{day.name}
								</div>
							</div>
						);
					})}
				</div>

			</Paper>
		);
	}
}

Calendar.propTypes  = {
	changeDate: PropTypes.func.isRequired,
	eventDates: PropTypes.arrayOf(PropTypes.object).isRequired,
	possibleDates: PropTypes.arrayOf(PropTypes.object).isRequired,
	searchFilterFeed: PropTypes.func.isRequired,
	mainContentNumber: PropTypes.number.isRequired,
};

export default muiThemable()(Calendar);
