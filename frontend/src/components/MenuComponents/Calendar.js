import React from 'react';
import Paper from 'material-ui/Paper';
import { withRouter } from 'react-router-dom';
import './Calendar.css';

const monthNames = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'Oktober',
	'November',
	'December',
];

class Calendar extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			date: new Date(),
			activeDates: [],
		};
	}

	monthChange = (forward) => {
		const year = this.state.date.getFullYear();
		const month = forward
			? this.state.date.getMonth() + 1
			: this.state.date.getMonth() - 1;
		let day = this.state.date.getDate();

		const daysInNewMonth = new Date(year, month + 1, 0).getDate();

		if (day > daysInNewMonth) {
			day = daysInNewMonth;
		}

		this.setState({
			date: new Date(year, month, day),
		});

		this.props.changeDate(new Date(year, month, day));
	}

	render() {
		const buttonStyle = {
			outline: 'none',
			border: 0,
			backgroundColor: 'white',
		};



		let days = [];

		const year = this.state.date.getFullYear();
		const month = this.state.date.getMonth() + 1;

		const daysInMonth = new Date(year, month, 0).getDate();
		const daysInLastMonth = new Date(year, month - 1, 0).getDate();
		const daysOfLastMonthShown = ((new Date(year, month - 1, 1).getDay() + 6) % 7);
		const daysOfNextMonthShown = (7 -((daysOfLastMonthShown + daysInMonth) % 7)) % 7;

		for (let i = daysOfLastMonthShown - 1; i >= 0; i--) {
			days.push({
				name: daysInLastMonth - i,
				backgroundColor: 'white',
				color: 'lightgrey',
				date: new Date(this.state.date.getFullYear(), this.state.date.getMonth() - 1, daysInLastMonth - i),
			});
		}

		for(let i = 1; i <= daysInMonth; i++) {
			let bgColor = '#ffffff';
			let color = 'black';

			this.props.eventDates.forEach((date) => {
				if (date.getDate() === i && date.getMonth() === this.state.date.getMonth() && date.getFullYear() === this.state.date.getFullYear()) {
					bgColor = '#f8c947';
				}
			});

			if (this.state.date.getDate() === i) {
				bgColor = '#1EA185';
				color = '#ffffff';
			}

			days.push({
				name: i,
				backgroundColor: bgColor,
				color,
				date: new Date(this.state.date.getFullYear(), this.state.date.getMonth(), i),
			});
		}

		for (let i = 1; i < daysOfNextMonthShown + 1; i++) {
			days.push({
				name: i,
				backgroundColor: 'white',
				color: 'lightgrey',
				date: new Date(this.state.date.getFullYear(), this.state.date.getMonth() + 1, i),
			});
		}

		/*const days = [
			{
				name: '29',
				date: new Date(),
				backgroundColor: 'white',
				color: 'grey',
			}, {
				name: '30',
				date: new Date(),
				backgroundColor: 'white',
				color: 'grey',
			}, {
				name: '1',
				date: new Date(),
				backgroundColor: 'white',
				color: 'black',
			}, {
				name: '2',
				date: new Date(),
				backgroundColor: 'white',
				color: 'black',
			}, {
				name: '3',
				date: new Date(),
				backgroundColor: 'white',
				color: 'black',
			}, {
				name: '40',
				date: new Date(),
				backgroundColor: 'white',
				color: 'black',
			}, {
				name: '5',
				date: new Date(),
				backgroundColor: 'white',
				color: 'black',
			}, {
				name: '6',
				date: new Date(),
				backgroundColor: 'white',
				color: 'black',
			}
		];*/

		const weekdays = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SO'];

		return (
			<Paper style={{
				padding: '1vw',
			}}>
				<div style={{
					textAlign: 'center',
					fontSize: '120%'
				}}>
				<button style={buttonStyle} onClick={() => this.monthChange(false)}>&lt;</button>
				{this.state.date.getDate()} {monthNames[this.state.date.getMonth()]} {this.state.date.getFullYear()}
				<button style={buttonStyle} onClick={() => this.monthChange(true)}>&gt;</button>
				</div>

				<div style={{
					width: '100%',
				}}>
					{
						weekdays.map((weekday, index) => (
							<div key={index} className="weekday">
								<div className="contents">
									{weekday}
								</div>
							</div>
						))
					}
				</div>

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
								}}
								onClick={() => {
									this.setState({date: day.date});
									this.props.changeDate(day.date);
									console.log(this.props.filterPersonalFeed);
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
export default withRouter(Calendar);
