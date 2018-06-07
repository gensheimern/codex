import React, { Component } from 'react';
import GroupsDrawer from './GroupsDrawerMobile';
import SearchFeed from './SearchFeed';
import SearchBar from './SearchBar';

import "./sidebars.css";

class AppNavTop extends Component {
	constructor(props) {
		super(props);

		this.state = {
			show: false,
		};
	}

	changeShow = () => {
		this.setState((prevState, props) => ({
			show: !prevState.show,
		}));
	}

	render() {
		const searchFeed = (
			<React.Fragment>
				<div className="AppNameDisplay">
					{this.props.name}
				</div>
				<SearchFeed
					searchFilterFeed={this.props.searchFilterFeed}
					changeShow={this.changeShow}
				/>
			</React.Fragment>
		);

		const searchBar = (
			<SearchBar
				searchFilterFeed={this.props.searchFilterFeed}
				show={this.state.show}
				changeShow={this.changeShow}
				style={{ float: 'left' }}
			/>
		);

		return (
			<div className="MobileNavTop">
				<GroupsDrawer
					searchFilterFeed={this.props.searchFilterFeed}
					changeContent={this.props.changeContent}
				/>
				{this.state.show ? searchBar : searchFeed}
			</div>
		);
	}
}

export default AppNavTop;