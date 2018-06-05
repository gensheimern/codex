import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import './profile.css';

export default class AccountSettings extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			password: '',
			retypePassword: '',
			activated: false,
		};
	}

	handleChange = name => ev => {
		this.setState({
			[name]: ev.target.value,
		});
	}

	deleteAccount = () => {
		alert('Account deleted.');
	}

	render() {
		return (
			<Paper className="profilePaper left" zDepth={2}>
				<h4 style={{textAlign: 'left'}}>Account settings</h4>

				{/* <TextField
					id="password"
					label="Password"
					value={this.props.password}
					onChange={this.props.handleChange('password')}
					floatingLabelText="Change Password"
					style={{
						width: '100%',
						marginBottom: '10px',
					}}
				/>*/}

				<TextField
					id="password"
					label="Password"
					value={this.state.password}
					onChange={this.handleChange('password')}
					floatingLabelText="Change Password"
					style={{
						width: '100%',
						marginBottom: '10px',
					}}
				/>

				<br/>

				<RaisedButton
					label="Delete Account"
					backgroundColor="#ED6559"
					color="white"
					onClick={this.deleteAccount}
					style={{color: 'white'}}
				/>
			</Paper>
		);
	}
}
