import React from 'react';
import Paper from 'material-ui/Paper';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';

import './profile.css';

export default class LanguageSettings extends React.Component {
	render() {
		return (
			<Paper className="profilePaper" zDepth={2}>
				<h4 style={{textAlign: 'left'}}>Language and Time</h4>

				<DropDownMenu value={1} onChange={this.handleChange} style={{width: '100%'}}>
					<MenuItem value={1} primaryText="English (British)" />
					<MenuItem value={2} primaryText="English (American)" />
					<MenuItem value={3} primaryText="Deutsch" />
					<MenuItem value={4} primaryText="..." />
				</DropDownMenu>

				<Toggle
					label="Automatic date and time"
					labelPosition="left"
				/>

				<DropDownMenu value={1} onChange={this.handleChange} style={{width: '100%'}}>
					<MenuItem value={1} primaryText="dd.mm.yyyy" />
				</DropDownMenu>

				<Toggle
					label="User 24-hour format"
					labelPosition="left"
				/>

			</Paper>
		);
	}
}
