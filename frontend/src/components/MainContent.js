import React from 'react';
import Events from './event/Events';

import Personal from './MenuComponents/SidebarContentCalender';
import ProfileContent from './Profile.js';
import CreateEventCard from './event/CreateEventCard';
import CreateTeam from './groupmanager/CreateTeam';
import Notifications from './notification/Notifications';
import FilterDropDown from './MenuComponents/FilterDropDown.js';

export default class MainContent extends React.Component {
	FEED = 0;
	PERSONAL = 1;
	ADD_EVENT = 2;
	NOTIFICATIONS = 3;
	PROFILE = 4;
	ADD_TEAM = 6;

	render() {
		if (this.props.mainContentNumber === this.FEED) {
			return (
				<React.Fragment>
					<div className="FilterDiv">
						<FilterDropDown searchFilterFeed={this.props.searchFilterFeed}/>
					</div>
					<Events
						filterWord={this.props.filterWord}
						searchWord={this.props.searchWord}
					/>
				</React.Fragment>
			);
		} else if (this.props.mainContentNumber === this.PERSONAL) {
			return (<Personal />);
		} else if (this.props.mainContentNumber === this.ADD_EVENT) {
			return (<CreateEventCard changeContent={this.props.changeContent} />);
		} else if (this.props.mainContentNumber === this.NOTIFICATIONS) {
			return (<Notifications />);
		} else if (this.props.mainContentNumber === this.PROFILE) {
			return (<ProfileContent/>);
		} else if (this.props.mainContentNumber === this.ADD_TEAM) {
			return (<CreateTeam/>);
		}
	}
}
