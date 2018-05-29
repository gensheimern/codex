import React from 'react';
import './event.css';
import dateParser from './dateParser';
import CalendarFA from 'react-icons/lib/fa/calendar-check-o';
import ClockFA from 'react-icons/lib/fa/clock-o';
import CollapseFA from 'react-icons/lib/fa/angle-down';
import GroupFA from 'react-icons/lib/fa/group';
import CollapsedContent from './CollapsedContent';



export default class EventCard extends React.Component {

	constructor(props) { // event, joined, participants
		super(props);
		this.state = {
			comments:0
		}
		this.updateComments = this.updateComments.bind(this);
			}

			updateComments() {

				this.setState({comments: this.state.comments + 1});
				console.log("log");
				this.props.loadMessages();

			}


		toggle(){
			console.log("jojojo");
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
		let buttonColor;
		if (this.props.joined && this.props.loaded) {
            isJoinedBorder = {
                border: '4px solid rgb(0 186 177)',
            };
						buttonColor = {
							backgroundColor:"rgb(237 101 89)",
						};

        } else {
            isJoinedBorder = {
                border: '0px solid white',
            };
						buttonColor = {
								backgroundColor:"rgb(248 201 71)",
						};
		}


		return (
			<div className ="card-wrapper">
				<div className = "eventCard" style={isJoinedBorder}>
					<div className = "eventCardHeader" >
						<img src = {this.props.event.banner} alt = "Event banner" />
							<div className = "after">
								<div className="eventCardTitle">
									<span className = "eventName"> {this.props.event.name} </span>
									{/*this.getJoinLeaveButton()*/}
									<div style={buttonColor} className="joinBtnWrapper" onClick={this.props.toggleJoin}>
										<button  className="joinBtn">{this.props.joined ? "LEAVE" : "JOIN"}</button>
									</div>
								</div>
							</div>
					</div>
						<div className = "eventGroup">
							<div className="eventInfo">
								<div className="dateInfo">
										<h4 > <CalendarFA/> {dateParser.DateparserDate(this.props.event.time) } </h4>
								</div>
								<div className="timeInfo">
										<h4> <ClockFA/> {dateParser.DateparserTime(this.props.event.time) } </h4>
								</div>
								<div className="participates-image">
									<h4> <GroupFA/> Already joining </h4>
									{ participantsImages }
								</div>
							</div>
							<div >
								<CollapsedContent loadMessages={this.props.loadMessages} comments={this.updateComments}  messages={this.props.messages} postComment={this.props.postComment} event={this.props.event} participants = {this.props.participants} collapse = {this.props.collapse} />
							</div>
							<div className="collapseOnClick" onClick={this.props.toggleCollapse}>
							<div style={{clear:"both"}}>
									<div id="collapseKommentare"><h6> {this.props.messages.length + " Kommentare"} </h6></div>
									<div id="collapseFA"><h6> <CollapseFA /> </h6></div>
							</div>
							</div>
					</div>
				</div>
			</div>
		);
	}

}