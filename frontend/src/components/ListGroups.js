import React from 'react';

class ListGroups extends React.Component {
	constructor(props) {
		super(props);
		this.state = {groups: []};
	}

	componentDidMount() {
		fetch("http://localhost:3000/group")
			.then(res => res.json())
			.then(res => {
				this.setState({
					groups: res
				});
			});
	}

	render() {
		return(
			<div style={{border: "2px solid black", margin: "5%"}}>
				<h1>Vorhandene Gruppen</h1>
				<ul>
				{this.state.groups.map((group) => {
					return (<li key={group.Gruppen_Id}>{group.Gruppen_Id + "; " + group.Gruppenname + ", " + group.Gruppenleiter}</li>);
				})}
				</ul>
			</div>
		);
	}
}

export default ListGroups;