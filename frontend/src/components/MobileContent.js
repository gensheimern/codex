import React from 'react';
import MainContent from './MainContent';
import PropTypes from 'prop-types';
import AppNavBottom from './MenuComponents/AppNavBottom';
import AppNavTop from './MenuComponents/AppNavTop';

export default class MobileContent extends React.Component {
	render() {
		let content = 0;

		switch (this.props.match.params[0]) {
			case 'feed': content = 0; break;
			case 'notifications': content = 3; break;
			case 'profile': content = 4; break;
			case 'addteam': content = 6; break;
			case 'addevent': content = 2; break;
			case 'personal': content = 1; break;
			default: content = 0; break;
		}

		return (
			<div className="mobileContent-wrapper">
					<AppNavTop
						changeContent={this.props.changeContent}
						searchFilterFeed={this.props.searchFilterFeed}
						width="100%"
					/>
					<div className="mainContentMobile-wrapper">
						<MainContent
							changeContent={this.props.changeContent}
							searchFilterFeed={this.props.searchFilterFeed}
							mainContentNumber={content}
							filter={this.props.filter}
						/>
					</div>
					<AppNavBottom
						changeContent={this.props.changeContent}
						width="100%"
						index={content}
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
