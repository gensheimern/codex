import React from 'react';
import Paper from 'material-ui/Paper';
import Toggle from 'material-ui/Toggle';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';

import './profile.css';

/**
 * Shows the user settings about the reminder and notifications.
 */
export default class NotificationSettings extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			reminder: true,
			reminderTime: 1,
			notifications: true,
		};
	}

	handleToggle = name => (e, isChecked) => {
		this.setState({
			[name]: isChecked,
		});
	}

	handleChange = name => (event, index, value) => {
		this.setState({
			[name]: value,
		});
	}

	render() {
		return (
			<Paper
				className="profilePaper"
				zDepth={2}
				style={{
					textAlign: 'left',
				}}
			>

				<h4 style={{textAlign: 'left'}}>Notification Settings</h4>

				<div>
					<Toggle
						label="Reminder"
						toggled={this.state.reminder}
						onToggle={this.handleToggle('reminder')}
						style={{
							marginTop: '5%',
							width: '45%',
							marginRight: '10%',
							float: 'left',
						}}
					/>

					<SelectField
						value={this.state.reminderTime}
						onChange={this.handleChange('reminderTime')}
						disabled={!this.state.reminder}
						style={{
							width: '45%',
						}}
					>
						<MenuItem value={1} primaryText="Event time" />
						<MenuItem value={2} primaryText="5min" />
						<MenuItem value={3} primaryText="10min" />
						<MenuItem value={4} primaryText="30min" />
						<MenuItem value={5} primaryText="1h" />
					</SelectField>
				</div>

				<Toggle
					label="I want to receive notifications"
					toggled={this.state.notifications}
					onToggle={this.handleToggle('notifications')}
					style={{
						textAlign: 'left',
					}}
				/>

			</Paper>
		);
	}
}
