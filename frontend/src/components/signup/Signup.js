import React from 'react';
import {FormGroup, FormControl, Button, ControlLabel} from 'react-bootstrap';
import config from '../../config';

import './signup.css';

export default class Signup extends React.Component {
	constructor(props) {
		super(props);

		this.handleChange.bind(this);
		this.signupUser.bind(this);

		this.state = {
			email: "",
			name: "",
			firstName: "",
			password: "",
			retypePassword: ""
		}
	}

	handleChange = e => {
		this.setState({
			[e.target.id]: e.target.value
		});
	}

	validateForm() {
		return this.state.email !== ""
			&& this.state.firstName !== ""
			&& this.state.name !== ""
			&& this.state.password !== "";
	}

	signupUser = (e) => {
		e.preventDefault();

		fetch(config.apiPath + "/user", {
			method: 'POST',
			body: JSON.stringify({
				Firstname: this.state.firstName,
				Name: this.state.name,
				Email: this.state.email,
				Password: this.state.password
			}),
			headers: {
				'Content-Type': 'application/json',
				'X-Access-Token': localStorage.getItem('apiToken')
			}
		});
	}

	render() {
		return(
			<form className="signup" onSubmit={this.signupUser}>
				<h1>Signup</h1>

                <FormGroup controlId="email" bsSize="large">
                    <FormControl id="email" placeholder="E-Mail" type="email" value={this.state.email} onChange={this.handleChange}/>
                </FormGroup>

				<FormGroup controlId="password" bsSize="large">
                    <FormControl id="password" placeholder="Password" type="password" value={this.state.password} onChange={this.handleChange}/>
                </FormGroup>

				<FormGroup controlId="firstName" bsSize="large">
					<FormControl id="firstName" placeholder="First name" type="text" value={this.state.firstName} onChange={this.handleChange}/>
				</FormGroup>

				<FormGroup controlId="name" bsSize="large">
					<FormControl id="name" placeholder="Name" type="text" value={this.state.name} onChange={this.handleChange}/>
				</FormGroup>

                <Button bsStyle="primary" block={true} bsSize="large" disabled={!this.validateForm()} type="submit">
                    Create user
                </Button>
            </form>
			
		);
	}
}
