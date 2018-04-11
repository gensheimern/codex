import React from 'react';

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

		console.log("Mail: " + this.state.email);
		console.log("Password: " + this.state.pw);
	}

	render() {
		return(
			<div style={{
				textAlign: 'center',
				marginTop: '5%',
				border: '1px solid black'
			}}>
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