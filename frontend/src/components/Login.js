import React from 'react';
import {withRouter} from 'react-router-dom';

class Login extends React.Component {

	constructor(props) {
		super(props);

		this.inputEmail = this.inputEmail.bind(this);
		this.inputPassword = this.inputPassword.bind(this);
		this.handleClick = this.handleClick.bind(this);

		this.state = {
			email: "",
			pw: ""
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

		if(this.state.email === "support@codex-team.de" &&
			this.state.pw === "password") {
			this.props.history.push("/create_group");
		}
		else {
			console.log("Wrong credentials");
		}

		//console.log("Mail: " + this.state.email);
		//console.log("Password: " + this.state.pw);
	}

	render() {
		return(
			<div style={{
				textAlign: 'center',
				marginTop: '5%',
				padding: '1%',
				border: '1px solid blue'
			}}>
				<h1>Anmelden: </h1>
				<form>
					<label>E-Mail:</label>
					<input type="email" value={this.state.email} onChange={this.inputEmail} />
					<br />
					<label>Password:</label>
					<input type="password" value={this.state.pw} onChange={this.inputPassword} />
					<button onClick={this.handleClick}>Login</button>
				</form>
			</div>
		);
	}
}

export default Login;