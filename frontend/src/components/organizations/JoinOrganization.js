import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField'
import config from '../../config';

export default class JoinOrganization extends React.Component {
	constructor(props) {
		super(props);
	
		this.state = {
			password: '',
			retypePassword: '',
			changedError: false,
		};

		this.joinOrganization = this.joinOrganization.bind(this);
	}

	joinOrganization(organizationId, password) {
		this.setState({
			changedError: false,
		});

		fetch(`${config.apiPath }/user/me/organizations/${organizationId}`, {
            method: 'POST',
            headers: {
				'Content-Type': 'application/json',
				'X-Access-Token': localStorage.getItem('apiToken'),
			},
			body: JSON.stringify({
				password,
			}),
		})
		.then((res) => {
            if(!res.ok) {
                throw new Error("Response not ok.");
            } else if(res.status !== 200) {
                throw new Error("An error occured.");
            }
            return res.json();
		})
		.then((res) => {
            this.setState({
				changed: true,
				showOtherOrganizations: false,
				changedError: false,
			});

			this.props.saveChange(organizationId);
			this.props.close();
        }).catch((error) => {
			this.setState({
				changedError: true,
			});
        });
	}

	createOrganization() {
		console.log('Created new Organization.');
		// TODO:
	}

	handleChange = name => e => {
		this.setState({
			[name]: e.target.value
		});
	}

	render() {
		if (!this.props.show) {
			return null;
		}

		const errorMessage = (
			<p style={{
				color: 'red',
			}}>Incorrect Password.</p>
		);

		return (
			<React.Fragment>
				<h4>Join '{this.props.organization.name}':</h4>
				<TextField
					type="password"
					floatingLabelText="Organization password"
					value={this.state.password}
					onChange={this.handleChange('password')}
				/>
				<RaisedButton
					label="Join"
					primary={true}
					onClick={() => {
						this.joinOrganization(this.props.id, this.state.password);
					}}
					style={{
						float: 'right',
						marginTop: '25px',
					}}
				/>
				{this.state.changedError ? errorMessage : null}
			</React.Fragment>
		);
	}
}
