import React from 'react';

class ListUsers extends React.Component {
	constructor(props) {
		super(props);
		this.state = {users: []};
	}

	componentDidMount() {
		fetch("http://localhost:3000/user")
			.then(res => res.json())
			.then(res => {
				this.setState({
					users: res
				});
			});
	}

	render() {
		return(
			<div style={{border: "2px solid black", margin: "5%"}}>
				<h1>Vorhandene Benutzer</h1>
				<ul>
				{this.state.users.map((user) => {
					return (<li key={user.User_Id}>{user.User_Id + ": " + user.Vorname + " " + user.Nachname + ", " + user.Email + ", " + user.Passwort}</li>);
				})}
				</ul>
			</div>
		);
	}
}

export default ListUsers;