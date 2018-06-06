import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import config from '../../config';

import './profile.css';
import CircularProgress from 'material-ui/CircularProgress/CircularProgress';

export default class AccountSettings extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			oldPassword: '',
			newPassword: '',
			repeatNewPassword: '',

			activated: false,
			showChangePassword: false,
			changePasswordError: null,
			changePasswordLoading: true,
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

	changePassword = () => {
		if (!this.validPasswords()) {
			return;
		}

		this.setState({
			changePasswordLoading: true,
			changePasswordError: null,
		});

		fetch(config.apiPath + "/user/my", {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'X-Access-Token': localStorage.getItem('apiToken'),
			},
			body: {
				password: this.state.newPassword,
			},
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
				loaded: true,
				error: false,

				firstName: res.firstName,
				lastName: res.name,
				email: res.email,
				password: res.password,
				image: res.image,
			});
		})
		.catch((err) => {
			this.props.handleError(err);
			this.setState({
				loaded: true,
				error: true,
			});
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
					onClick={() => {
						this.setState({
							oldPassword: '',
							newPassword: '',
							repeatNewPassword: '',
							showChangePassword: false,
						});
					}}
					style={{color: 'white'}}
				/>
				<RaisedButton
					label="Save"
					backgroundColor="#32AA90"
					color="white"
					onClick={() => {
						this.setState({
							showChangePassword: false,
							changePasswordError: null,
							changePasswordLoading: true,
						});
					}}
					style={{
						color: 'white',
						marginBottom: '10px',
						marginLeft: '10px',
					}}
					disabled={!this.validPasswords() && !this.state.changePasswordLoading}
				/>
				{this.state.changePasswordLoading ? <CircularProgress /> : null}
			</React.Fragment>
		);


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

				{this.state.showChangePassword ? changePassword : hiddenPassword}

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
