import React from 'react';

class CreateGroup extends React.Component {

	constructor(props) {
		super(props);

		this.inputName = this.inputName.bind(this);
		this.handleClick = this.handleClick.bind(this);

		this.state = {
			name: "",
			showError: false
		}
	}

	inputName(e) {
		this.setState({
			name: e.target.value
		});

		this.setState({
			showError: e.target.value === ""
		});
	}

	handleClick(e) {
		e.preventDefault();

		if(this.state.name !== "") {
			/*fetch("http://localhost:3000/team", {
				method: 'POST',
				body: JSON.stringify({
					Teamname: this.state.name
				}),
				headers: {
					'content-type': 'application/json',
					'...': '...'
				}
			});*/
			console.log("Group '" + this.state.name + "' created.");
		}
		else {
			this.setState({showError: true});
		}		
	}

	render() {
		return(
			<div style={{
				textAlign: 'center',
				marginTop: '5%',
				padding: '1%',
				border: '1px solid blue'
			}}>
				<h1>Gruppe anlegen: </h1>
				<p style={{color: 'red', visibility: this.state.showError?'visible':'hidden'}}>Bitte Gruppenname eingeben!</p>
				<form>
					<label>Name:</label>
					<input type="text" value={this.state.name} onChange={this.inputName} />
					<br />
					<button onClick={this.handleClick}>Gruppe erstellen</button>
				</form>
			</div>
		);
	}
}

export default CreateGroup;