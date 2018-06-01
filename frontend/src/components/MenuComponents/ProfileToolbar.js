import React from "react";
import Toolbar, { ToolbarGroup } from 'material-ui/Toolbar';
import Avatar from 'material-ui/Avatar';
import Notification from 'material-ui/svg-icons/social/notifications';

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
					<Notification
						onClick={()=>{alert('Notifications clicked.')}}
					/>
					</ToolbarGroup>
					<ToolbarGroup>
						<Avatar onClick={() => {alert('Profile clicked.')}}>MM</Avatar>
					</ToolbarGroup>
				</Toolbar>
			</React.Fragment>
		);
	}

}
