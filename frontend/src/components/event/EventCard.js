import React from 'react';
import './event.css';
import CalendarFA from 'react-icons/lib/fa/calendar-check-o';
import ClockFA from 'react-icons/lib/fa/clock-o';
import BullseyeFA from 'react-icons/lib/fa/bullseye';
import GroupFA from 'react-icons/lib/fa/group';
import PropTypes from 'prop-types';

export default class EventCard extends React.Component {

	constructor(props) { // event, joined, participants
		super(props);
	}

	render() {

		let participantsImages
		if (this.props.loaded) {
			participantsImages = this.state.participates.map(user => {
				return (<img className = "myimage" key={user.id} src = {user.image} alt = "participant" />);
			});
		}
		else {
			participantsImages = null;
		}
		

        // Styling the Activity with a border if the User who is logged in has joined
		let isJoinedBorder;
		if (this.props.joined) {
            isJoinedBorder = {
                border: '1px solid #75a045',
                boxShadow: '0 0 40px #75a045'
            };
        } else {
            isJoinedBorder = {
                border: '0px solid white',
                boxShadow: '0 0 0px white'
            };
		}
		
		const date = new Date(this.props.event.time); 

		return (
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
					<div className = "eventCardBody">
						<div className = "eventGroup">
							<div className="eventInfo">
							<h4> <CalendarFA/> {date.getDay() + 1}.{date.getMonth() + 1}.{date.getFullYear()} </h4>
	 
							<h4> <GroupFA/> Already joining </h4>
	 
								{ participantsImages }
	  
							</div>
							<div  className="eventInfo">
								<h4><ClockFA />  {this.props.event.time} </h4>
								<h4><BullseyeFA />  {this.props.event.place} </h4>
							</div>
						</div>
					</div>
				</div>
		);
	}

}