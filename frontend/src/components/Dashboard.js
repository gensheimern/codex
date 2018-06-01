import React from 'react';
import NavbarMenu from './MenuComponents/NavbarMenu';
import Groups from './Groups';
import MainContent from './MainContent';
import SidebarContentCalender from './MenuComponents/SidebarContentCalender';
import PropTypes from 'prop-types';

export default class Dashboard extends React.Component {
	render() {
		return (
			<div style={{
				marginTop: '5%',
			}}>
				<NavbarMenu/>
				<Groups
					changeContent={this.props.changeContent}
					searchFilterFeed={this.props.searchFilterFeed}
					id="groups-wrapper" 
					height="100%"
				/>
				<div style={{
					float: 'left',
					margin: 0,
					overflowX: 'hidden',
					overflowY: 'scroll',
				}}>
					<MainContent
						mainContentNumber={5} 
						filterWord={this.props.filterWord} 
						searchWord={this.props.searchWord} 
						width="55%"
					/>
				</div>
				<SidebarContentCalender/>
			</div>
		);
	}
}

Dashboard.propTypes = {
	changeContent: PropTypes.func,
	searchFilterFeed: PropTypes.func,
	filterWord: PropTypes.string,
	searchWord: PropTypes.string,
};
