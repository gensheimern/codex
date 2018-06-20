import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import config from '../../config';

/**
 * This component show a dialog to add an organization.
 */
export default class AddOrganization extends React.Component {
	constructor(props) {
		super(props);
	
		this.state = {
			name: '',
			description: '',
			password: '',
			retypePassword: '',
			createdError: false,
			clicked: false,
		};

		this.createOrganization = this.createOrganization.bind(this);
	}

	createOrganization() {
		this.setState({
			createdError: false,
		});

		fetch(`${config.apiPath }/organization`, {
            method: 'POST',
            headers: {
				'Content-Type': 'application/json',
				'X-Access-Token': localStorage.getItem('apiToken'),
			},
			body: JSON.stringify({
				name: this.state.name,
				description: this.state.description,
				password: this.state.password,
			}),
		})
		.then((res) => {
            if(!res.ok) {
                throw new Error("Response not ok.");
            } else if(res.status !== 201) {
                throw new Error("An error occured.");
            }
            return res.json();
		})
		.then((res) => {
            this.setState({
				createdError: false,
			});

			this.joinOrganization(res.organizationId, this.state.password)
				.then(this.props.reload).catch();

			this.props.back();
        }).catch((error) => {
			this.setState({
				createdError: true,
			});
        });
	}

	joinOrganization(organizationId, password) {
		return fetch(`${config.apiPath }/user/me/organizations/${organizationId}`, {
            method: 'POST',
            headers: {
				'Content-Type': 'application/json',
				'X-Access-Token': localStorage.getItem('apiToken'),
			},
			body: JSON.stringify({
				password,
			}),
		});
	}

	handleChange = name => e => {
		this.setState({
			[name]: e.target.value
		});
	}

	differentPasswords = () => {
		return this.state.password !== this.state.retypePassword;
	}

	validParams = () => {
		return this.state.name
			&& this.state.password
			&& this.state.retypePassword
			&& this.state.password === this.state.retypePassword;
	}

	render() {
		const errorMessage = (
			<p style={{
				color: 'red',
			}}>Invalid values.</p>
		);

		return (
			<React.Fragment>
				<h4>Create Organization:</h4>
				<TextField
					id="AOname"
					type="text"
					floatingLabelText="Name"
					value={this.state.name}
					onChange={this.handleChange('name')}
					style={{
						width: '100%',
					}}
				/>
				<br/>
				<TextField
					id="AOdescription"
					type="text"
					floatingLabelText="Description"
					value={this.state.description}
					onChange={this.handleChange('description')}
					style={{
						width: '100%',
					}}
				/>
				<br/>
				<TextField
					id="AOpassword"
					type="password"
					floatingLabelText="Password"
					value={this.state.password}
					onChange={this.handleChange('password')}
					style={{
						width: '100%',
					}}
				/>
				<br/>
				<TextField
					id="AOretypePassord"
					type="password"
					floatingLabelText="Retype password"
					value={this.state.retypePassword}
					onChange={this.handleChange('retypePassword')}
					errorText={this.differentPasswords() ? 'Passwords not matching' : null}
					style={{
						width: '100%',
					}}
				/>
				<br/>

				<RaisedButton
					id="AOcreate"
					label="Create"
					primary={true}
					disabled={!this.validParams()}
					onClick={() => {
						if (this.state.clicked) return;
						this.setState({
							clicked: true,
						});
						this.createOrganization();
					}}
					style={{
						float: 'right',
					}}
				/>
				{this.state.createdError ? errorMessage : null}
			</React.Fragment>
		);
	}
}
