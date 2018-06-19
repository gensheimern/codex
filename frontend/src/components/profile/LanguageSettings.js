import React from 'react';
import Paper from 'material-ui/Paper';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';
import SelectField from 'material-ui/SelectField';

import './profile.css';

/**
 * Show the profile settings to change the language and date format.
 */
export default class LanguageSettings extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			language: 1,
			automaticDate: true,
			dateFormat: 1,
			hour24: true,
		}
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
			<Paper className="profilePaper" zDepth={2}>
				<h4 style={{textAlign: 'left'}}>Language and Time</h4>

				<SelectField
					value={this.state.language}
					onChange={this.handleChange('language')}
					disabled={this.state.automaticDate}
				>
					<MenuItem value={1} primaryText="English" />
					<MenuItem value={2} primaryText="Deutsch" />
					<MenuItem value={3} primaryText="Italiano" />
				</SelectField>

				<Toggle
					onToggle={this.handleToggle('automaticDate')}
					toggled={this.state.automaticDate}
					label="Automatic date and time"
					labelPosition="left"
				/>

				<SelectField
					value={this.state.dateFormat}
					onChange={this.handleChange('dateFormat')}
				>
					<MenuItem value={1} primaryText="dd.mm.yyyy" />
				</SelectField>

				<Toggle
					onToggle={this.handleToggle('hour24')}
					toggled={this.state.hour24}
					label="User 24-hour format"
					labelPosition="left"
				/>

			</Paper>
		);
	}
}
