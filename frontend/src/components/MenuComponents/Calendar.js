import React from 'react';
import Paper from 'material-ui/Paper';
import { withRouter } from 'react-router-dom';


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
		console.log(daysInNewMonth);
		console.log(`Y${year} M${month} D${day}`);

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

		const fieldStyle = {
			textAlign: 'center',
			float: 'left',
			width: '2.7vw',
			height: '2.7vw',
			borderRadius: '50%',
			paddingTop: '0.4vw',
			fontSize: '1.4vw',
			margin: '0.4vw',
		};

		const weekdayStyle = {
			textAlign: 'center',
			float: 'left',
			width: '2.7vw',
			height: '2.7vw',
			borderRadius: '50%',
			paddingTop: '0.4vw',
			fontSize: '1.4vw',
			margin: '0.4vw',
			color: 'grey'
		};

		let days = [];

		const year = this.state.date.getFullYear();
		const month = this.state.date.getMonth() + 1;

		const daysInMonth = new Date(year, month, 0).getDate();
		const daysInLastMonth = new Date(year, month - 1, 0).getDate();
		const daysOfLastMonthShown = ((new Date(year, month - 1, 1).getDay() + 6) % 7);

		const daysOfNextMonthShown = 7 -((daysOfLastMonthShown + daysInMonth) % 7);

		for (let i = daysOfLastMonthShown - 1; i >= 0; i--) {
			days.push({
				name: daysInLastMonth - i,
				backgroundColor: 'white',
				color: 'lightgrey',
				date: new Date(this.state.date.getFullYear(), this.state.date.getMonth() - 1, daysInLastMonth - i),
			});
		}

		for(let i = 1; i <= daysInMonth; i++) {
			let color = '#ffffff';

			this.props.eventDates.forEach((date) => {
				if (date.getDate() === i && date.getMonth() === this.state.date.getMonth() && date.getFullYear() === this.state.date.getFullYear()) {
					color = '#f8c947';
				}
			});

			if (this.state.date.getDate() === i) {
				color = '#1EA185';
			}

			days.push({
				name: i,
				backgroundColor: color,
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

		return (
			<Paper style={{
				padding: '1vw',
			}}>
				<div style={{
					textAlign: 'center',
					fontSize: '1.7vw'
				}}>
				<button style={buttonStyle} onClick={() => this.monthChange(false)}>&lt;</button>
				{this.state.date.getDate()} {monthNames[this.state.date.getMonth()]} {this.state.date.getFullYear()}
				<button style={buttonStyle} onClick={() => this.monthChange(true)}>&gt;</button>
				</div>

				<div style={{
					width: '100%',
					overflow: 'auto',
				}}>
					<div style={weekdayStyle}>MO</div>
					<div style={weekdayStyle}>TU</div>
					<div style={weekdayStyle}>WE</div>
					<div style={weekdayStyle}>TH</div>
					<div style={weekdayStyle}>FR</div>
					<div style={weekdayStyle}>SA</div>
					<div style={weekdayStyle}>SO</div>
				</div>

				<div style={{
					width: '100%',
					overflow: 'auto',
				}}>
					{days.map((day, index) => {
						return (
							<div
								key={index}
								style={{
									...fieldStyle,
									backgroundColor: day.backgroundColor,
									color: day.color,
								}}
								onClick={() => {
									this.setState({date: day.date});
									this.props.changeDate(day.date);
									console.log("wow" + this.props.mainContentNumber);
									this.props.searchFilterFeed(day.date,"Date");
									if(this.props.mainContentNumber===1)
										this.props.history.push('/feed')
								}}
							>{day.name}</div>
						);
					})}
				</div>

			</Paper>
		);
	}
}
export default withRouter(Calendar);
