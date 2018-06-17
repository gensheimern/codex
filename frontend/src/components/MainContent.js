import React from 'react';
import Events from './event/Events';

import Personal from './personal/SidebarContentCalendar';
import ProfileContent from './profile/Profile.js';
import CreateEventCard from './event/CreateEventCard';
import CreateTeam from './groupmanager/CreateTeam';
import Notifications from './notification/Notifications';
import Dialog from 'material-ui/Dialog';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FlatButton from 'material-ui/FlatButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import LunchFeed from './lunchfeed/LunchFeed.js';
import TeamInfo from './groupmanager/TeamInfo';

export default class MainContent extends React.Component {
	FEED = 0;
	PERSONAL = 1;
	ADD_EVENT = 2;
	NOTIFICATIONS = 3;
	DESKTOP = 5;
	PROFILE = 4;
	ADD_TEAM = 6;
	LUNCHFEED = 7;

	render() {
		if (this.props.mainContentNumber === this.FEED) {
			return (
				<React.Fragment>
					<div>
	          <TeamInfo filter={this.props.filter}/>
	        </div>
					<Events
						webFeed={true}
						filter={this.props.filter}
						searchFilterFeed={this.props.searchFilterFeed}
					/>
				</React.Fragment>
			);
		} else if (this.props.mainContentNumber === this.PERSONAL) {
			return (<Personal filterPersonalFeed = {this.props.filterPersonalFeed} mainContentNumber={this.props.mainContentNumber}
				searchFilterFeed={this.props.searchFilterFeed} changeContent={this.props.changeContent}	filter={this.props.filter}/>);
		} else if(this.props.mainContentNumber === this.LUNCHFEED){
			return (<LunchFeed />);
		} else if (this.props.mainContentNumber === this.ADD_EVENT) {
			return (<CreateEventCard changeContent={this.props.changeContent} />);
		} else if (this.props.mainContentNumber === this.NOTIFICATIONS) {
			return (<Notifications />);
		} else if (this.props.mainContentNumber === this.DESKTOP) {
			const actions = [
				<FlatButton label="Cancel" primary={true} onClick={this.handleClose}/>,
				<FlatButton label="Submit" primary={true} keyboardFocused={true} onClick={this.handleSubmit}/>
			];

			return (
				<div>
			  		<Dialog
						className="createEventWrapper"
						actions={actions}
						modal={false}
						open={false}
						onRequestClose={this.handleClose}
						style={{padding:"30px"}}
						contentStyle={{
							width: "95%",
							maxWidth: "none",
							paddingTop: "0px"
						}}
						bodyStyle={{
							padding: "0px",
							paddingTop: "0px"
						}}
						titleStyle={{
							paddingTop: "0px"
						}}
						autoScrollBodyContent={true}
					>

					<CreateEventCard ref={instance => {
						this.child = instance;
				  	}}/>
				</Dialog>
				<FloatingActionButton onClick={this.handleOpen} style={{marginRight: 20}}>
					<ContentAdd/>
				</FloatingActionButton>
				<Events 	webFeed={false} filter={this.props.filter} />
	  		</div>);
		} else if (this.props.mainContentNumber === this.PROFILE) {
			return (<ProfileContent/>);
		} else if (this.props.mainContentNumber === this.ADD_TEAM) {
			return (<CreateTeam/>);
		}
	}
}
