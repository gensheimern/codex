import React from 'react';
import Drawer from 'material-ui/Drawer';
import FlatButton from 'material-ui/FlatButton';
import SidebarContent from "./SidebarContent";
import "./sidebars.css";

import IconGroup from 'material-ui/svg-icons/social/group';

export default class GroupsDrawer extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			open: false,
		};
	}

	handleToggle = () => this.setState((prevState, props) => ({
		open: !prevState.open,
	}));

	handleClose = () => this.setState({ open: false });

	render() {
		return (
			<div className="GroupsDrawer">
				<FlatButton
					backgroundColor="#1EA185"
					icon={ <IconGroup color="#FFFFFF" /> }
					onClick={this.handleToggle}
				/>
				<Drawer
					docked={false}
					width="84%"
					open={this.state.open}
					onRequestChange={(open) => this.setState({ open })}
					containerStyle={{
						height: 'calc(100% - 58px)',
						marginTop: '56px',
					}}
					overlayStyle={{
						height: 'calc(100% - 56px)',
						marginTop: '56px',
					}}
				>
					<SidebarContent
						changeContent={this.props.changeContent}
						searchFilterFeed={this.props.searchFilterFeed}
						closeDrawer={this.handleClose}
					/>
				</Drawer>
			</div>
		);
	}
}