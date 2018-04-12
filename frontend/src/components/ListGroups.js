import React from 'react';
import config from '../config';

class ListTeams extends React.Component {
	constructor(props) {
		super(props);
		this.state = {groups: []};
	}

	componentDidMount() {
		this.refresh();
	}

	refresh() {
		fetch(config.apiPath + "/team")
			.then(res => res.json())
			.then(res => {
				this.setState({
					groups: res
				});
			})
			.catch((err) => {
				this.setState({
					groups: []
				});
			});;
	}

	render() {
		let groups;

		if(this.state.groups.length === 0) {
			groups = (<p>Noch keine Gruppen vorhanden.</p>);
		}
		else {
			groups = (
				<ul>
				{this.state.groups.map((group) => {
					return (<li key={group.Team_Id}>{group.Team_Id + "; " + group.Teamname + ", " + group.Teammanager}</li>);
				})}
				</ul>
			);
		}

		return(
			<div style={{border: "2px solid black", margin: "5%"}}>
				<h1>Vorhandene Gruppen:</h1>
				{groups}
			</div>
		);
	}
}

export default ListTeams;