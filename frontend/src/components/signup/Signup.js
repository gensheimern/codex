import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import config from '../../config';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, /*CardMedia, CardTitle,*/ CardText} from 'material-ui/Card';
import './signup.css';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import {Link} from 'react-router-dom';
import Dsgvo from './Dsgvo'; // In englisch General Data Protection (GDPR)

export default class Signup extends React.Component {
	emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	//Recaptcha = require('react-recaptcha');

	constructor(props) {
		super(props);

		this.handleChange.bind(this);
		this.signupUser.bind(this);

		this.state = {
			email: "",
			firstName: "",
			lastName: '',
			password: "",
			retypePassword: "",
			img: "",
			checked: false,
			captcha: '',
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
			&& this.state.lastName !== ""
			&& this.state.password !== ""
			&& this.state.retypePassword !== ""
			&& this.state.password === this.state.retypePassword
			&& this.state.checked
			&& this.state.captcha;
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
				lastName: this.state.lastName,
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
				//paddingLeft: 100,
				//paddingRight: 180,
				width: '60%',
				float: 'left',
				paddingTop: 8,
				//marginBottom: 16,
				//fontWeight: 0,
			},
			
			cardStyle:{
				width: 440,
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
				width: '80%',
				marginLeft: '10%',
				marginRight: '10%',
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
				width: '30%',
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

		return(
			<div className="signupBg">
			<form className="signup" onSubmit={this.signupUser}>
				<div>
					<Paper style={styles.paperStyle} zDepth={1} />
 				</div>

				<br/>
				<center>
					<h3 className="h3header">Lunchplanner</h3>
				</center>

				<Card className="signupCard">
				<CardText>
				<h2 className="h2header">SIGN UP</h2>

				<TextField
					id="firstName"
					label="first name"
					value={this.state.firstName}
					onChange={this.handleChange('firstName')}
					floatingLabelText="First name"
					style= {styles.textField}
				/>

				<TextField
					id="lastName"
					label="Last name"
					value={this.state.lastName}
					onChange={this.handleChange('lastName')}
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
				<br/>
				
				<ReCAPTCHA 
					ref="recaptcha"
					sitekey={config.recaptchaKey}
					style = {styles.reCAPTCHA}
					onChange={(captcha) => this.setState({ captcha })}
				/>
				<br/>
				
				<Checkbox
          			label="General Data Protection "
          			checked={this.state.checked}
          			onCheck={this.updateCheck.bind(this)}
          			style={styles.checkbox}
				/>
				<Dsgvo/>
				<br/>
				
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
					<p>Have an account already?&nbsp;
						<Link to = "/login">Log in here </Link>
					</p>
				</center>
				
				</CardText>
				</Card>
				
			</form>
			</div>
		
		);
	}
}
