import React from 'react';
import './Login.css';
import config from '../../config';

class Login extends React.Component {

	constructor(props) {
		super(props);

		this.inputEmail = this.inputEmail.bind(this);
		this.inputPassword = this.inputPassword.bind(this);
		this.handleClick = this.handleClick.bind(this);

		this.state = {
			email: "",
			pw: "",
			showErrorPrompt: false
		}
	}

	inputEmail(e) {
		this.setState({
			email: e.target.value
		});
	}

	inputPassword(e) {
		this.setState({
			pw: e.target.value
		});
	}

	handleClick(e) {
		e.preventDefault();

		fetch(config.apiPath + "/authenticate", {
			method: 'POST',
			body: JSON.stringify({
				Email: this.state.email,
				Password: this.state.pw
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then((res) => {
			if(!res.ok) {
				throw new Error("Invalid Password");
			}
			return res;
		})
		.then(res => res.json())
		.then((res) => {
			//console.log("Token: " + res.token)

			if (typeof(Storage) !== "undefined") {
				localStorage.setItem("apiToken", res.token);
			} else {
				// TODO Code without local storage
			}
			
			this.props.history.push("/create_group");
		})
		.catch((err) => {
			//console.log("Fehler" + err);
			this.setState({showErrorPrompt: true});
		});
	}

	render() {
		let errorPrompt = "";
		
		if(this.state.showErrorPrompt) {
			errorPrompt = (
				<p style={{color: 'red'}}>Login fehlgeschlagen!</p>
			);
		}

		return(
			<div className={"loginArea"}>
				<h1 style={{textAlign: 'center'}}>Anmelden:</h1>
				<form>
					{errorPrompt}
					<p>
						<label>E-Mail: </label>
						<input type="email" value={this.state.email} onChange={this.inputEmail} />
					</p>
					<p>
						<label>Password: </label>
						<input type="password" value={this.state.pw} onChange={this.inputPassword} />
					</p>
					<button onClick={this.handleClick}>Login</button>
				</form>
			</div>
		);
	}
}

export default Login;