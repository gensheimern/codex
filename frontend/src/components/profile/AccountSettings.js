import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import AlertError from 'material-ui/svg-icons/alert/error';
import Done from 'material-ui/svg-icons/action/done';
import config from '../../config';
import { withRouter } from 'react-router-dom';
import DeleteAccount from './DeleteAccount';

import './profile.css';
import CircularProgress from 'material-ui/CircularProgress/CircularProgress';

class AccountSettings extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			oldPassword: '',
			newPassword: '',
			repeatNewPassword: '',

			showChangePassword: false,
			changePasswordError: null,
			changePasswordLoading: false,
			inputDisabled: false,
			passwordChanged: false,
		};
	}

	handleChange = name => ev => {
		if (!this.state.inputDisabled) {
			this.setState({
				[name]: ev.target.value,
			});
		}
	}

	
	changePassword = () => {
		if (!this.validPasswords()) {
			return;
		}

		this.setState({
			changePasswordLoading: true,
			changePasswordError: null,
			inputDisabled: true,
		});

		fetch(config.apiPath + "/user/me/", {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'X-Access-Token': localStorage.getItem('apiToken'),
			},
			body: JSON.stringify({
				password: this.state.newPassword,
				oldPassword: this.state.oldPassword,
			}),
		}).then((res) => {
			if (!res.ok) {
				throw new Error("Request failed.");
			} else if (res.status !== 200) {
				throw new Error("An error occured.");
			}
			
			return res.json();
		})
		.then(res => {
			this.setState({
				changePasswordError: null,
				changePasswordLoading: false,
				passwordChanged: true,
			});
			setTimeout(() => {
				this.setState({
					passwordChanged: false,
				});
			}, 2000);
			this.resetInputs();
		})
		.catch((err) => {
			this.setState({
				showChangePassword: true,
				changePasswordError: new Error('Could not change password.'),
				changePasswordLoading: false,
				inputDisabled: false,
			});
		});
	}

	resetInputs = () => {
		this.setState({
			oldPassword: '',
			newPassword: '',
			repeatNewPassword: '',
			showChangePassword: false,
			inputDisabled: false,
		});
	}

	showUnequalPasswordsError = () => {
		return this.state.newPassword !== this.state.repeatNewPassword
			&& (this.state.newPassword || this.state.repeatNewPassword);
	}

	validPasswords = () => {
		return this.state.newPassword === this.state.repeatNewPassword
			&& this.state.oldPassword
			&& this.state.newPassword
			&& this.state.repeatNewPassword;
	}

	render() {
		const hiddenPassword = (<TextField
			value={''}
			floatingLabelText="Change Password"
			style={{
				width: '100%',
				marginBottom: '10px',
			}}
			onClick={() => {
				this.setState({
					showChangePassword: true,
				});
			}}
		/>);
		
		const changePassword = (
			<React.Fragment>
				<TextField
					type="password"
					id="oldPassword"
					label="Old Password"
					value={this.state.oldPassword}
					onChange={this.handleChange('oldPassword')}
					floatingLabelText="Old Password"
					style={{
						width: '100%',
					}}
					autoFocus
				/>
				<TextField
					type="password"
					id="newPassword"
					label="New password"
					value={this.state.newPassword}
					onChange={this.handleChange('newPassword')}
					floatingLabelText="New Password"
					style={{
						width: '100%',
					}}
				/>
				<TextField
					type="password"
					id="repeatNewPassword"
					label="Repeat new password"
					value={this.state.repeatNewPassword}
					onChange={this.handleChange('repeatNewPassword')}
					floatingLabelText="Repeat new Password"
					style={{
						width: '100%',
					}}
					errorText={this.showUnequalPasswordsError() ? "Passwords don't match." : null}
				/>

				<RaisedButton
					label="Cancel"
					backgroundColor="#ED6559"
					color="white"
					onClick={this.resetInputs}
					style={{color: 'white'}}
				/>
				<RaisedButton
					label="Save"
					backgroundColor="#32AA90"
					color="white"
					onClick={this.changePassword}
					style={{
						color: 'white',
						marginBottom: '10px',
						marginLeft: '10px',
					}}
					disabled={!this.validPasswords() && !this.state.changePasswordLoading}
				/>
				{this.state.changePasswordError ? (<p><AlertError style={{width: 30}} color="red" />Old password is not correct.</p>) : null}
				{this.state.changePasswordLoading && ! this.state.changePasswordError ? <CircularProgress size={20} style={{marginLeft: '20px'}} /> : null}
			</React.Fragment>
		);

		const passwordChanged = (
			<p>
				<Done style={{width: 30}} color="green"/>
				Password successfully changed.
			</p>
		);

		


		return (
			<Paper className="profilePaper left" zDepth={2}>
				<h4 style={{textAlign: 'left'}}>Account settings</h4>

				{this.state.showChangePassword ? changePassword : hiddenPassword}

				{this.state.passwordChanged ? passwordChanged : null}

				<br/>

				<DeleteAccount />
			</Paper>
		);
	}
}

export default withRouter(AccountSettings);
