import React from 'react';
//import Recaptcha from 'react-recaptcha';
import ReCAPTCHA from 'react-google-recaptcha';
import config from '../../config';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, /*CardMedia, CardTitle,*/ CardText} from 'material-ui/Card';
//import ImageBackground from 'react';
import './signup.css';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';

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
			checked: false,
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
			&& this.state.password === this.state.retypePassword
			&& this.state.checked;
	}

	updateCheck() {
		this.setState((oldState) => {
		  return {
			checked: !oldState.checked,
		  };
		});
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
		const styles = {
			block: {
			  maxWidth: 250,
			},
			checkbox: {				
			paddingLeft: 100,
			paddingRight: 197,
			marginBottom: 16,
			
			},
			
			cardStyle:{
				height: 800,
				width: 439,
				borderRadius: 5,
				backgroundColor: "#FFFFFF",
				boxShadow: "0 2 20 0 rgba(57,56,56,0.5)",
				display: 'block',
				marginLeft: 'auto',
				marginRight: 'auto',
			},

			paperStyle:{
				height: 62,
				width: 62,
				borderRadius: 7,
				display: 'block',
				marginLeft: 'auto',
				marginRight: 'auto',	
			},
			textField:{
				height: 72,
				width: 305,
				display: 'block',
				marginLeft: 'auto',
				marginRight: 'auto',
			},
			reCAPTCHA:{
				heigth: 76,
				width: 305,
				boarder:"1 solid #D6D6D6",
				borderRadius: 2.43,
				backgroundColor: "#FAFAFA",
				boxShadow: "0 1 2 0 rgba(0,0,0,0.1)",
				display: 'block',
				marginLeft: 'auto',
				marginRight: 'auto',
				
			},
			signupButton:{
				heigt: 40.57,
				width: 130,
				borderRadius: 3,
				boxShadow: "inset 0 1 3 0 rgba(0,0,0,0.5),0 1 2 0 rgba(0,0,0,0.5)",
				backgroundColor: "#1EA185",
				display: 'block',
				marginLeft: 'auto',
				marginRight: 'auto',
			},


		  };
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
					<Paper style={styles.paperStyle} zDepth={1} />
 				</div>
				<br/>
				<center>
					<h3>Lunchplanner</h3>
				</center>
				<Card style={styles.cardStyle}>
				<CardText>
				<h2>SIGN UP</h2>
				<TextField
					id="firstName"
					label="first name"
					value={this.state.firstName}
					onChange={this.handleChange('firstName')}
					floatingLabelText="First name"
					style= {styles.textField}
				/>

				<TextField
					id="name"
					label="Last name"
					value={this.state.name}
					onChange={this.handleChange('name')}
					floatingLabelText="Last name"
					style= {styles.textField}				
				/>

				<TextField
					id="email"
					label="E-Mail"
					value={this.state.email}
					onChange={this.handleChange('email')}
					floatingLabelText="E-Mail"
					style= {styles.textField}
				/>

				<TextField
					id="password"
					label="Password"
					type="password"
					value={this.state.password}
					onChange={this.handleChange('password')}
					floatingLabelText="Password"
					style= {styles.textField}
				/>

				<TextField
					id="retypePassword"
					label="Retype password"
					type="password"
					value={this.state.retypePassword}
					onChange={this.handleChange('retypePassword')}
					floatingLabelText="Retype Password"
					{ ...retypeError }
					style= {styles.textField}
				/>
				<br/>
				
				<ReCAPTCHA 
					ref="recaptcha"
					sitekey="6LfY-1wUAAAAAAjaNfCOZrbJKO8fmWdLSgC0u9xm"
					style = {styles.reCAPTCHA}
				/>
				<br/>
				
				<Checkbox
          			label="Datenschutzerklärung "
          			checked={this.state.checked}
          			onCheck={this.updateCheck.bind(this)}
          			style={styles.checkbox}
        		/>
				
				<RaisedButton
					backgroundColor="#b9b9b9"
					type="submit"
					label="Sign Up"
					primary={true}
					disabled={!this.validateForm()}
					style = {styles.signupButton}
				/>
				<br/>
				<center>
					<p>Have an account already ?
						<a href ="#">
						 Log in here
						</a>
					</p>
				</center>
				
				</CardText>
				</Card>
				
			</form>
		
		);
	}
}
