import React from 'react';
//import Recaptcha from 'react-recaptcha';
import ReCAPTCHA from 'react-google-recaptcha';
import config from '../../config';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, /*CardMedia, CardTitle,*/ CardText} from 'material-ui/Card';
//import ImageBackground from 'react';
import './signup.css';
import Avatar from 'material-ui/Avatar';

//TEMP
/*
<Recaptcha
				sitekey="6LfY-1wUAAAAAAjaNfCOZrbJKO8fmWdLSgC0u9xm"
				render="explicit"
				h1={"ja"}
				onloadCallback={callbackRECAP}
				  />

*/




export default class Signup extends React.Component {
	emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	//Recaptcha = require('react-recaptcha');

	constructor(props) {
		super(props);

		this.handleChange.bind(this);
		this.signupUser.bind(this);

		this.state = {
			email: "",
			name: "",
			firstName: "",
			password: "",
			retypePassword: "",
			img: "",
		}
	}

	handleChange = name => e => {
		this.setState({
			[name]: e.target.value
		});
	}

	validateForm() {
		return this.emailRegExp.test(this.state.email)
			&& this.state.firstName !== ""
			&& this.state.name !== ""
			&& this.state.password !== ""
			&& this.state.retypePassword !== ""
			&& this.state.password === this.state.retypePassword;
	}

	signupUser = (e) => {
		e.preventDefault();

		fetch(config.apiPath + "/user", {
			method: 'POST',
			body: JSON.stringify({
				firstName: this.state.firstName,
				name: this.state.name,
				email: this.state.email,
				password: this.state.password,
				image: this.state.img,
			}),
			headers: {
				'Content-Type': 'application/json',
				'X-Access-Token': localStorage.getItem('apiToken')
			}
		});
	}

	render() {
		let retypeError = {};
		if (this.state.password !== this.state.retypePassword) {
			retypeError = {
				errorText: 'Passwords do not match.',
			};
		}
		let callbackRECAP = function(){
			alert("loaded Recaptcha!");
		};
		return(

			<form className="signup" onSubmit={this.signupUser}>
				<div>
					<Avatar alt="" src="#"  />
 				</div>
				<Card>
				<CardText>
				<TextField
					id="firstName"
					label="first name"
					value={this.state.firstName}
					onChange={this.handleChange('firstName')}
					floatingLabelText="First name"
				/>
				<br/>

				<TextField
					id="name"
					label="Last name"
					value={this.state.name}
					onChange={this.handleChange('name')}
					floatingLabelText="Last name"
				/>
				<br/>

				<br />

				<TextField
					id="email"
					label="E-Mail"
					value={this.state.email}
					onChange={this.handleChange('email')}
					floatingLabelText="E-Mail"
				/>
				<br/>

				<TextField
					id="password"
					label="Password"
					type="password"
					value={this.state.password}
					onChange={this.handleChange('password')}
					floatingLabelText="Password"
				/>
				<br/>

				<TextField
					id="retypePassword"
					label="Retype password"
					type="password"
					value={this.state.retypePassword}
					onChange={this.handleChange('retypePassword')}
					floatingLabelText="Retype Password"
					{ ...retypeError }
				/>
				<br/>
				<ReCAPTCHA 
					ref="recaptcha"
					sitekey="6LfY-1wUAAAAAAjaNfCOZrbJKO8fmWdLSgC0u9xm"
				/>
				<br/>
				<RaisedButton
					type="submit"
					label="Sign Up"
					primary={true}
					disabled={!this.validateForm()}
				/>
				</CardText>
				</Card>
				
			</form>
				
				


		);
	}
}
