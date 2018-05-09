import React from 'react';
import './event.css';
import CalendarFA from 'react-icons/lib/fa/calendar-check-o';
import ClockFA from 'react-icons/lib/fa/clock-o';
import BullseyeFA from 'react-icons/lib/fa/bullseye';
import CollapseFA from 'react-icons/lib/fa/angle-down';
import GroupFA from 'react-icons/lib/fa/group';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';

export default class EventCard extends React.Component {

	constructor(props) { // event, joined, participants
		super(props);
		}

		DateparserDate() {
			var d = new Date(this.props.event.time);
			var month = [];
			month[0] = "January";
			month[1] = "February";
			month[2] = "March";
			month[3] = "April";
			month[4] = "May";
			month[5] = "June";
			month[6] = "July";
			month[7] = "August";
			month[8] = "September";
			month[9] = "October";
			month[10] = "November";
			month[11] = "December";
		return d.getDay() + " " + month[d.getMonth()];
		}

			DateparserTime(){

				var d = new Date(this.props.event.time);
				var h = this.addZero(d.getHours());
				var m = this.addZero(d.getMinutes());

				return h + ":" + m;
		}

		addZero(i) {
				if (i < 10) {
						i = "0" + i;
				}
				return i;
		}



	render() {

		let participantsImages
		if (this.props.loaded && this.props.participants != null) {
			participantsImages = this.props.participants.map(user => {
				return (<img className = "myimage" key={user.id} src = {user.image} alt = "participant" />);
			});
		}
		else {
			participantsImages = null;
		}


        // Styling the Activity with a border if the User who is logged in has joined
		let isJoinedBorder;
		if (this.props.joined && this.props.loaded) {
            isJoinedBorder = {
                border: '4px solid rgb(0 186 177)',
                boxShadow: '0 0 23px rgb(0 186 177)'
            };
        } else {
            isJoinedBorder = {
                border: '0px solid white',
                boxShadow: '0 0 0px white'
            };
		}

		const date = new Date(this.props.event.time);

		return (
			<div className ="card-wrapper">
				<div className = "eventCard" style={isJoinedBorder}>
					<div className = "eventCardHeader" >
						<img src = {this.props.event.banner} alt = "Event banner" />
							<div className = "after">
								<div className="eventCardTitle">
									<span className = "eventName"> {this.props.event.name} </span>
									{/*this.getJoinLeaveButton()*/}
									<div className="joinBtnWrapper" onClick={this.props.toggleJoin}>
										<button className="joinBtn">{this.props.joined ? "LEAVE" : "JOIN"}</button>
									</div>
								</div>
							</div>
					</div>
						<div className = "eventGroup">
							<div className="eventInfo">
								<div className="dateInfo">
										<h4 > <CalendarFA/> {this.DateparserDate() } </h4>
								</div>
								<div className="timeInfo">
										<h4> <ClockFA/> {this.DateparserTime() } </h4>
								</div>
								<div className="participates-image">
									<h4> <GroupFA/> Already joining </h4>
									{ participantsImages }
								</div>
							</div>
							<hr className="activity-hr" />
							<div className="collapse-activity">
									<span id="collapseKommentare"><h6> 2 Kommentare </h6></span>
									<span id="collapseFA"><h6> <CollapseFA /> </h6></span>
							</div>
					</div>
				</div>
			</div>
		);
	}

}
