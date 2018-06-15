import React from 'react';
import './event.css';
import dateParser from './dateParser';
import CalendarFA from 'react-icons/lib/fa/calendar-check-o';
import ClockFA from 'react-icons/lib/fa/clock-o';
import ExpandFA from 'react-icons/lib/fa/angle-down';
import CollapseFA from 'react-icons/lib/fa/angle-up';
import GroupFA from 'react-icons/lib/fa/group';
import CollapsedContent from './CollapsedContent';
import Avatar from 'material-ui/Avatar';
import UserAvatar from './UserAvatar';
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover';
import { List, ListItem } from 'material-ui/List';


export default class EventCard extends React.Component {

	constructor(props) { // event, joined, participants
		super(props);

		this.state = {
			comments: 0,
			showParticipantList: false,
			anchorEl: null,
		}

		this.updateComments = this.updateComments.bind(this);
	}

	updateComments() {
		this.setState({
			comments: this.state.comments + 1,
		});
		this.props.loadMessages();
	}

	checkDate(){
		const month = new Date().getUTCMonth();
		if ((new Date(this.props.event.time).getUTCMonth()) === month){
			if (new Date(this.props.event.time).getUTCDate() === (new Date().getUTCDate())){
				if (new Date(this.props.event.time).getUTCFullYear()=== (new Date().getUTCFullYear())){
					return  <h4 > <CalendarFA/> Today </h4>
				} else {
					return <h4 > <CalendarFA/> {dateParser.DateparserDate(this.props.event.time) } </h4>
				}
			} else {
				return <h4 > <CalendarFA/> {dateParser.DateparserDate(this.props.event.time) } </h4>
			}
		} else {
			return <h4 > <CalendarFA/> {dateParser.DateparserDate(this.props.event.time) } </h4>
		}
	}

	hideParticipantsList = () => {
		this.setState({
			showParticipantList: false,
		});
	}

	showParticipantsList = (event) => {
		event.preventDefault();

		this.setState({
			anchorEl: event.currentTarget,
			showParticipantList: true,
		});
	}

	render() {
		const avatarStyle = {
			marginLeft: '-15px',
		};

		this.checkDate();
		let participantsImages;
		if (this.props.loaded && this.props.participants != null) {
			participantsImages = this.props.participants.map((user, index) => {
				if (index > 3) return true;

				return (
					<UserAvatar
						key={user.id}
						user={user}
						style={{
							...avatarStyle,
							cursor: 'pointer',
						}}
						onClick={this.showParticipantsList}
					/>
				);
			});

			if (participantsImages.length > 4) {
				participantsImages.push(
					<Avatar
						key="moreParticipants"
						color="#000000"
						backgroundColor="#f8c947"
						style={{
							...avatarStyle,
							cursor: 'pointer',
						}}
						onClick={this.showParticipantsList}
					>
						+{participantsImages.length - 4}
					</Avatar>
				);
			}
		}
		else {
			participantsImages = null;
		}


        // Styling the Activity with a border if the User who is logged in has joined
		let isJoinedBorder;
		let buttonColor;
		if (this.props.joined && this.props.loaded) {
            isJoinedBorder = {
                border: '4px solid #00BAB1',
            };
			buttonColor = {
				backgroundColor: '#ED6550',
			};
        } else {
            isJoinedBorder = {
                border: '0px solid #FFFFFF',
            };
			buttonColor = {
				backgroundColor: '#F8C947',
			};
		}

		let participantsList = null;
		if (this.state.showParticipantList) {
			participantsList = (
				<Popover
					open={this.state.showParticipantList}
					anchorEl={this.state.anchorEl}
					anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
					targetOrigin={{horizontal: 'left', vertical: 'top'}}
					onRequestClose={this.hideParticipantsList}
					animation={PopoverAnimationVertical}
				>
					<List>
						{this.props.participants.map((user) => (
							<ListItem
								key={user.id}
								leftAvatar={<UserAvatar user={user} />}
								primaryText={`${user.firstName} ${user.name}`}
								disabled={true}
							/>
						))}
					</List>
				</Popover>
			);
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
								 {this.checkDate()}
								</div>
								<div className="timeInfo">
										<h4> <ClockFA/>{dateParser.DateparserTime(this.props.event.time) } </h4>
								</div>
								<div className="participates-image">
									<h4 className="alreadyJoningText"> <GroupFA/> Already joining </h4>
									{ participantsImages }
									  <span id="participant-counter"> <h6><GroupFA />{" "} {this.props.participants.length}/{this.props.event.maxParticipants} </h6></span>
								</div>
							</div>
							<div >
								<CollapsedContent loadMessages={this.props.loadMessages} comments={this.updateComments}  messages={this.props.messages} postComment={this.props.postComment} event={this.props.event} participants = {this.props.participants} collapse = {this.props.collapse} />
							</div>
							<div className="collapseOnClick" onClick={this.props.toggleCollapse}>
							<div style={{clear:"both"}}>
									<div id="collapseKommentare"><h6> {this.props.messages.length + " Comments"} </h6></div>
									<div id="collapseFA"><h6> {this.props.collapse ?  <CollapseFA /> : <ExpandFA />} </h6></div>
							</div>
							</div>
					</div>
				</div>
				{participantsList}
			</div>
		);
	}

}
