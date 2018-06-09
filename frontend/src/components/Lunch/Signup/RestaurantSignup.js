import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import config from '../../../config';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, /*CardMedia, CardTitle,*/ CardText} from 'material-ui/Card';
import './signup.css';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import Maps from './GooglePlaces';
import {Link} from 'react-router-dom';
import Toggle from './SignupToggle';

export default class Signup extends React.Component {
	emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	//Recaptcha = require('react-recaptcha');

	constructor(props) {
		super(props);

		this.handleChange.bind(this);
		this.signupUser.bind(this);
		this.callbackAddress = this.callbackAddress.bind(this);
		this.callbackToggle = this.callbackToggle.bind(this);

		this.state = {
			email: "",
			restaurantName: "",
			googlePlacesId: '',
			place: '',
			zipcode: '',
			street: '',
			streetNumber: '',
			password: "",
			retypePassword: "",
			checked: false,
			captcha: '',
			addressValue: '',
			toggle: true,
			signupGoogleSearch: true,
		}
	}

	handleChange = name => e => {
		this.setState({
			[name]: e.target.value
		});
	}

	callbackToggle(event, isInputChecked){
		this.setState({ signupGoogleSearch: isInputChecked });
	}

	validateForm() {
		return this.emailRegExp.test(this.state.email)
			&& this.state.restaurantName !== ""
			&& this.state.googlePlacesId !== ""
			&& this.state.password !== ""
			&& this.state.retypePassword !== ""
			&& this.state.password === this.state.retypePassword
			&& this.state.checked
	}

	updateCheck() {
		this.setState((oldState) => {
		  return {
			checked: !oldState.checked,
		  };
		});
	}

	callbackAddress(myAddress){
		this.setState({ googlePlacesId: myAddress.split(',') });
	}

	handleChangeAddressValue(e){
		this.setState({ addressValue: e.target.value });
	}

	toggle(){

	}

	signupUser = (e) => {
		e.preventDefault();

		fetch(config.apiPath + "/restaurant", {
			method: 'POST',
			body: JSON.stringify({
					googlePlacesId: this.state.googlePlacesId,
	        name: this.state.restaurantName,
	        email: this.state.email,
	        password: this.state.password,
	        place: this.state.place,
	        zipcode: this.state.zipcode,
	        street: this.state.street,
	        streetNumber: this.state.streetNumber
			}),
			headers: {
				'Content-Type': 'application/json',
			}
		})
		.then((res) => {
			if (!res.ok || res.status !== 201) {
				// handle error
			} else {

				this.props.history.push('/feed');
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


		if(this.state.signupGoogleSearch){
			var content =
			<Maps
				styles={styles.textField}
				callbackAdress={this.handleChangeAddressValue}
				myAddress={this.callbackAddress}
				>
				{renderFunc}
			</Maps>

		}
		else {
			var content =
			<div>
			<TextField
				id="restaurantName"
				label="restaurantName"
				value={this.state.restaurantName}
				onChange={this.handleChange('restaurantName')}
				floatingLabelText="Restaurant Name"
				style= {styles.textField}
			/>



			<TextField
				id="googlePlacesId"
				label="googlePlacesId"
				value={this.state.googlePlacesId}
				onChange={this.handleChange('googlePlacesId')}
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
		</div>
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

				<div className="toggleWrapper">
						<label style={{float:"left", width:"50%",paddingLeft:"10%"}}> Google Search </label>
						<Toggle toggle={this.callbackToggle}  />
				</div>
				{content}
				<br/>
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
const renderFunc = ({ getInputProps, getSuggestionItemProps, suggestions }) => (
	<div className="autocomplete-root">
		<input {...getInputProps()} />
		<div className="autocomplete-dropdown-container">
			{suggestions.map(suggestion => (
				<div {...getSuggestionItemProps(suggestion)}>
					<span>{suggestion.description}</span>
				</div>
			))}
		</div>
	</div>
);
