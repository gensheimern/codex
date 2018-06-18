import React from 'react';
import MainContent from './MainContent';
import PropTypes from 'prop-types';
import AppNavBottom from './MenuComponents/AppNavBottom';
import AppNavTop from './MenuComponents/AppNavTop';

export default class MobileContent extends React.Component {
	render() {
		let content = 0;
		let displayName;

		switch (this.props.match.params[0]) {
			case 'feed': content = 0; displayName = "FEED"; break;
			case 'notifications': content = 3; displayName = "Notifications"; break;
			case 'profile': content = 4; displayName = "Profile"; break;
			case 'addteam': content = 6; displayName = "add Team"; break;
			case 'addevent': content = 2; displayName = "add EVENT"; break;
			case 'personal': content = 1; displayName = "Schedule"; break;
			case 'lunchfeed': content = 7; displayName = "Lunchfeed"; break;

			default: content = 0; break;
		}


		return (
			<div className="mobileContent-wrapper">

					<div style={{width: '100%'}}>
						<MainContent
							filterPersonalFeed = {this.props.filterPersonalFeed}
							searchFilterFeed={this.props.searchFilterFeed}
							mainContentNumber={content}
							filter={this.props.filter}
						/>
					</div>
					{/* This is the inteded order of components, because it stacks them in the right order. */}
					<AppNavBottom
						index={content}
					/>
					<AppNavTop
						searchFilterFeed={this.props.searchFilterFeed}
						name={displayName}
						showSearch={content === 0}
						activeIndex={this.props.activeIndex}
						changeTeamIndex={this.props.changeTeamIndex}
					/>
				</div>
		);
	}
}

MobileContent.propTypes = {
	changeContent: PropTypes.func,
	searchFilterFeed: PropTypes.func,
	filterWord: PropTypes.string,
	searchWord: PropTypes.string,
	mainContentNumber: PropTypes.number,
};
