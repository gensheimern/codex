import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import config from '../../../config';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, /*CardMedia, CardTitle,*/ CardText} from 'material-ui/Card';
import './signup.css';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import {Link} from 'react-router-dom';

export default class Signup extends React.Component {
	emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	//Recaptcha = require('react-recaptcha');

	constructor(props) {
		super(props);

		this.handleChange.bind(this);
		this.signupUser.bind(this);

		this.state = {
			email: "",
			restaurantName: "",
			googlePlacesID: '',
			place: '',
			zipcode: '',
			street: '',
			streetNumber: '',
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
				paddingLeft: 100,
				paddingRight: 197,
				marginBottom: 16,
				fontWeight: 0,
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
				<h2 className="h2header">SIGN UP FOR YOUR RESTAURANT</h2>

				<TextField
					id="restaurantName"
					label="restaurantName"
					value={this.state.restaurantName}
					onChange={this.handleChange('restaurantName')}
					floatingLabelText="Restaurant Name"
					style= {styles.textField}
				/>

				<TextField
					id="googlePlacesID"
					label="googlePlacesID"
					value={this.state.googlePlacesID}
					onChange={this.handleChange('googlePlacesID')}
					floatingLabelText="Find your Restaurant"
					style= {styles.textField}
				/>

				<TextField
					id="place"
					label="Place"
					value={this.state.place}
					onChange={this.handleChange('place')}
					floatingLabelText="Place"
					style= {styles.textField}
				/>
				<TextField
					id="zipcode"
					label="Zipcode"
					value={this.state.zipcode}
					onChange={this.handleChange('zipcode')}
					floatingLabelText="Zipcode"
					style= {styles.textField}
				/>
				<TextField
					id="street"
					label="Street"
					value={this.state.street}
					onChange={this.handleChange('street')}
					floatingLabelText="Street"
					style= {styles.textField}
				/>
				<TextField
					id="streetNumber"
					label="Street number"
					value={this.state.streetNumber}
					onChange={this.handleChange('streetNumber')}
					floatingLabelText="Street number"
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
					sitekey="6LfY-1wUAAAAAAjaNfCOZrbJKO8fmWdLSgC0u9xm"
					style = {styles.reCAPTCHA}
					onChange={(captcha) => this.setState({ captcha })}
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
