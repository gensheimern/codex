import React from 'react';
import './Login.css';

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

		// TODO fetch(login...)
		let loggedIn = this.state.email === "support@codex-team.de" && this.state.pw === "password";

		if(loggedIn) {
			this.props.history.push("/create_group");
		}
		else {
			this.setState({showErrorPrompt: true});
		}
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