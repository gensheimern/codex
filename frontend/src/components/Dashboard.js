import React from 'react';
import FeedToolbar from './MenuComponents/FeedToolbar';
import Groups from './Groups';
import MainContent from './MainContent';
import SidebarContentCalender from './MenuComponents/SidebarContentCalender';
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

		return (
			<React.Fragment>
				<FeedToolbar searchFilterFeed={this.props.searchFilterFeed} />

				<div style={{
					...defaultStyle,
					width: '20%',
					overflow: 'hidden',
					boxShadow: '5px 5px 5px lightgrey',
				}}>
					<Groups
						changeContent={this.props.changeContent}
						searchFilterFeed={this.props.searchFilterFeed}
						closeDrawer={() => {}}
						id="groups-wrapper"
					/>
				</div>
				<div style={{
					...defaultStyle,
					width: '52%',
					borderRight: '1px solid lightgrey',
				}}>
					<MainContent
						mainContentNumber={0}
						searchFilterFeed={this.props.searchFilterFeed}
						filterWord={this.props.filterWord} 
						searchWord={this.props.searchWord}
					/>
				</div>
				<div style={{
					...defaultStyle,
					width: '28%',
				}}>
					<SidebarContentCalender/>
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
