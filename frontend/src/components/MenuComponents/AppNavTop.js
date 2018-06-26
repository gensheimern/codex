import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import GroupsDrawer from './GroupsDrawerMobile';
import SettingsMenu from './SettingsMenu';
import SearchFeed from './SearchFeed';
import SearchBar from './SearchBar';
import AppMore from './AppMore';

import './navbar.css';

class AppNavTop extends Component {
	constructor(props) {
		super(props);

		this.state = {
			show: false,
			showSettingsMenu: false,
			anchor: null,
		};
	}

	changeShow = () => {
		this.setState((prevState, props) => ({
			show: !prevState.show,
		}));
	}

	showSettings = (event) => {
		event.preventDefault();

		this.setState({
			showSettingsMenu: true,
			anchor: event.currentTarget,
		});
	}

	hideSettings = () => {
		this.setState({
			showSettingsMenu: false,
		});
	}

	render() {
		const searchFeed = (
			<React.Fragment>
				<div style={{
					width: 'calc(100% - 168px)',
					height: '100%',
					textAlign: 'center',
					float: 'left',
					fontSize: '20px',
					paddingTop: '15px',
					paddingLeft: '56px',
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

		const nameField = (
			<div style={{
				width: 'calc(100% - 112px)',
				height: '100%',
				textAlign: 'center',
				float: 'left',
				fontSize: '20px',
				paddingTop: '15px',
				paddingLeft: '56px',
				paddingRight: '56px',
				color: 'white',
			}}>
				{this.props.name}
			</div>
		);

		const searchBar = (
			<SearchBar
				searchFilterFeed={this.props.searchFilterFeed}
				changeShow={this.changeShow}
			/>
		);

		let search = this.state.show ? searchBar : searchFeed;

		if (!this.props.showSearch) {
			search = nameField;
		}


		return (
			<div className="navbartop">
				<GroupsDrawer
					activeIndex={this.props.activeIndex}
					changeTeamIndex={this.props.changeTeamIndex}
					searchFilterFeed={this.props.searchFilterFeed}
					changeContent={this.props.changeContent}
				/>
				{search}

				<AppMore onClick={this.showSettings} />
				<SettingsMenu
					activeIndex={this.props.activeIndex}
					changeTeamIndex={this.props.changeTeamIndex}
					menuOpen={this.state.showSettingsMenu}
					anchor={this.state.anchor}
					hideSettings={this.hideSettings}
					history={this.props.history}
				/>
			</div>
		);
	}
}

export default withRouter(AppNavTop);