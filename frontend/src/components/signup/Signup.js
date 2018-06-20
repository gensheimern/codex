import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import config from '../../config';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardText } from 'material-ui/Card';
import './signup.css';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import { Link, withRouter } from 'react-router-dom';
import Dsgvo from './Dsgvo'; // In english General Data Protection (GDPR)
import logo from '../../IMG/logo/Logo_3.png';
import SelectOrganization from '../organizations/SelectOrganization';

/**
 * Shows a signup form to create a new user.
 */
class Signup extends React.Component {
	emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	constructor(props) {
		super(props);

		this.handleChange = this.handleChange.bind(this);
		this.loadOrganizations = this.loadOrganizations.bind(this);

		this.state = {
			email: "",
			firstName: "",
			lastName: '',
			password: "",
			retypePassword: "",
			img: "",
			checked: false,
			captcha: '',
			errorMessage: '',
			showSelectOrganization: false,
			organizations: [],
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

		this.setState({
			errorMessage: '',
		});

		fetch(config.apiPath + "/user", {
			method: 'POST',
			body: JSON.stringify({
				firstName: this.state.firstName,
				name: this.state.lastName,
				email: this.state.email,
				password: this.state.password,
				image: this.state.img,
				captcha: this.state.captcha,
			}),
			headers: {
				'Content-Type': 'application/json',
				'X-Access-Token': localStorage.getItem('apiToken')
			}
		})
		.then((res) => {
            if (res.status === 409) {
				throw new Error('Email address already in use.');
			} else if (res.status === 400) {
				throw new Error('Invalid user data.');
			} else if(res.status !== 201 || !res.ok) {
                throw new Error("An error occured.");
            }
            return res.json();
		})
		.then((res) => {
			localStorage.setItem('apiToken', res.token);
			this.loadOrganizations();
			this.setState({
				showSelectOrganization: true,
			});
            //this.props.history.push('/organization');
        }).catch((error) => {
			this.setState({
				errorMessage: error.message,
			});
        });
	}

	loadOrganizations() {
		return fetch(config.apiPath + "/user/me/organizations", {
            method: 'GET',
            headers: {
				'Content-Type': 'application/json',
				'X-Access-Token': localStorage.getItem('apiToken'),
            }
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
				organizations: res,
			});
        }).catch((error) => {
			this.setState({
				organizations: [],
			});
        });
	}

	hideSelectDialog = () => {
		this.props.history.push('/feed');
	}

	render() {
		const styles = {
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
				marginTop: '20px',
                backgroundColor: 'transparent',
                boxShadow: 'none',
			},
			textField:{
				width: '80%',
				marginLeft: '10%',
				marginRight: '10%',
			},
			reCAPTCHA:{
				heigth: 78,
				width: 304,
				boarder:"1 solid #D6D6D6",
				borderRadius: 2.43,
				backgroundColor: "#FAFAFA",
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
				<Paper style={styles.paperStyle} zDepth={1}>
					<img src={logo} alt="logo" style={{
                        width: 'calc(100% + 18px)',
                        margin: '-8px',
                    }} />
				</Paper>

				<br/>
				<center>
					<h3 className="h3header">Meet'n'eat</h3>
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
					onChange={(captcha) => {
						this.setState({captcha});
					}}
				/>
				<br/>

				<div style={{paddingLeft: '10%'}}>
					<Checkbox
						checked={this.state.checked}
						onCheck={this.updateCheck.bind(this)}
						style={{
							width: '24px',
							float: 'left',
						}}
					/>
					
					<Dsgvo/>
				</div>
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
					{this.state.errorMessage ? <p style={{color: 'red'}}>{this.state.errorMessage}</p> : null}
					<p>Have an account already?&nbsp;
						<Link to = "/login">Log in here </Link>
					</p>
				</center>
				
				</CardText>
				</Card>

				<SelectOrganization
					show={this.state.showSelectOrganization}
					close={this.hideSelectDialog}
					reload={this.loadOrganizations}
					myOrganizations={this.state.organizations}
					modal={true}
				/>
				
			</form>
			</div>
		
		);
	}
}

export default withRouter(Signup);
