import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField'

export default class JoinOrganization extends React.Component {
	constructor(props) {
		super(props);
	
		this.state = {
			password: '',
			retypePassword: '',
		};
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
						this.props.changeOrganization(this.props.id, this.state.password);
					}}
					style={{
						float: 'right',
						marginTop: '25px',
					}}
				/>
				{this.props.changedError ? errorMessage : null}
			</React.Fragment>
		);
	}
}
