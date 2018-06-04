import React from "react";
import Toolbar, { ToolbarGroup } from 'material-ui/Toolbar';
import Avatar from 'material-ui/Avatar';
import Notification from 'material-ui/svg-icons/social/notifications';
import { Link } from 'react-router-dom';

export default class ProfileToolbar extends React.Component {
	render(){
		return (
			<React.Fragment>
				<Toolbar style={{
					backgroundColor: 'white',
				}}>
					<ToolbarGroup firstChild={true} style={{
						marginLeft: 0,
					}}>
					<Link to="/notifications"><Notification/></Link>
					</ToolbarGroup>

					<ToolbarGroup>
						<Link to="/profile">
							<Avatar>MM</Avatar>
						</Link>
					</ToolbarGroup>
				</Toolbar>
			</React.Fragment>
		);
	}

}
