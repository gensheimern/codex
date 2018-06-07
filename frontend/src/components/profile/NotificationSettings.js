import React from 'react';
import Paper from 'material-ui/Paper';
import Toggle from 'material-ui/Toggle';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import './profile.css';

export default class NotificationSettings extends React.Component {
	render() {
		return (
			<Paper className="profilePaper" zDepth={2}>

				<h4 style={{textAlign: 'left'}}>Notification Settings</h4>

				<div>
					<Toggle
						label="Reminder"
						labelPosition="left"
						style={{
							marginTop: '5%',
							width: '40%',
							float: 'left',
						}}
					/>

					<DropDownMenu value={1} onChange={this.propshandleChange} style={{
						width: '40%',
						float: 'left',
					}}>
						<MenuItem value={1} primaryText="Event time" />
						<MenuItem value={2} primaryText="5min" />
						<MenuItem value={3} primaryText="10min" />
						<MenuItem value={4} primaryText="30min" />
						<MenuItem value={5} primaryText="1h" />
					</DropDownMenu>
				</div>

				<Toggle
					label="Receive Notifications"
					labelPosition="right"
					style={{
						textAlign: 'left',
					}}
				/>

			</Paper>
		);
	}
}
