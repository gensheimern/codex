import React from 'react';
import FeedToolbar from './MenuComponents/FeedToolbar';
import SidebarContent from './MenuComponents/SidebarContent';
import MainContent from './MainContent';
import SidebarContentCalendar from './personal/SidebarContentCalendar';
import PropTypes from 'prop-types';

export default class Dashboard extends React.Component {
	render() {
		const defaultStyle = {
			float: 'left',
			margin: 0,
			overflowX: 'hidden',
			overflowY: 'scroll',
			height: 'calc(100% - 56px)',
		};

		let content = 0;

		switch (this.props.match.params[0]) {
			case 'feed': content = 0; break;
			case 'notifications': content = 3; break;
			case 'profile': content = 4; break;
			case 'addteam': content = 6; break;
			case 'addevent': content = 2; break;
			case 'personal': content = 0; break;
			case 'lunchfeed': content = 7; break;
			default: content = 0; break;
		}

		return (
			<React.Fragment>
				<FeedToolbar
				searchFilterFeed={this.props.searchFilterFeed}
				activeIndex={this.props.activeIndex}
				changeTeamIndex={this.props.changeTeamIndex} />
				<div style={{
					...defaultStyle,
					width: '20%',
					overflow: 'hidden',
					boxShadow: '5px 5px 5px lightgrey',
				}}>
					<SidebarContent
						activeIndex={this.props.activeIndex}
						changeTeamIndex={this.props.changeTeamIndex}
						changeContent={this.props.changeContent}
						searchFilterFeed={this.props.searchFilterFeed}
						closeDrawer={() => {}}
					/>
				</div>
				<div style={{
					...defaultStyle,
					width: '52%',
					borderRight: '1px solid lightgrey',
				}}>
					<MainContent
						mainContentNumber={content}
						searchFilterFeed={this.props.searchFilterFeed}
						filter={this.props.filter}
					/>
				</div>
				<div style={{
					...defaultStyle,
					width: '28%',
				}}>
					<SidebarContentCalendar
						filter={this.props.filter}
						filterPersonalFeed = {this.props.filterPersonalFeed}
 						mainContentNumber={this.props.mainContentNumber}
						searchFilterFeed={this.props.searchFilterFeed}
						changeContent={this.props.changeContent}
					/>
				</div>
			</React.Fragment>
		);
	}
}

Dashboard.propTypes = {
	changeContent: PropTypes.func,
	searchFilterFeed: PropTypes.func,
	filterWord: PropTypes.string,
	searchWord: PropTypes.string,
};
