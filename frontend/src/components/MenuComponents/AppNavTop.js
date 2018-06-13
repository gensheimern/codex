import React, { Component } from 'react';
import GroupsDrawer from './GroupsDrawerMobile';
import SearchFeed from './SearchFeed';
import SearchBar from './SearchBar';
import AppMore from './AppMore';

import './navbar.css';

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
				<div style={{
					width: '40%',
					height: '100%',
					textAlign: 'center',
					float: 'left',
					fontSize: '20px',
					paddingTop: '15px',
					color: 'white',
				}}>
					{this.props.name}
				</div>
				<SearchFeed
					searchFilterFeed={this.props.searchFilterFeed}
					onClick={this.changeShow}
				/>
			</React.Fragment>
		);

		const searchBar = (
			<SearchBar
				searchFilterFeed={this.props.searchFilterFeed}
				changeShow={this.changeShow}
			/>
		);

		return (
			<div className="navbartop">
				<GroupsDrawer
					searchFilterFeed={this.props.searchFilterFeed}
					changeContent={this.props.changeContent}
				/>
				{this.state.show ? searchBar : searchFeed}
				<AppMore />
			</div>
		);
	}
}

export default AppNavTop;