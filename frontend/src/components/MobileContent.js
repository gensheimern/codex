import React from 'react';
import MainContent from './MainContent';
import PropTypes from 'prop-types';
import AppNavBottom from './MenuComponents/AppNavBottom';
import AppNavTop from './MenuComponents/AppNavTop';

export default class MobileContent extends React.Component {
	render() {
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
							mainContentNumber={this.props.mainContentNumber}
							filterWord={this.props.filterWord}
							searchWord={this.props.searchWord}
						/>
					</div>
					<AppNavBottom
						changeContent={this.props.changeContent}
						width="100%"
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
