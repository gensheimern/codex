import React from 'react';

export default class Groups extends React.Component {
	render() {
	return (<div style={{
		width: this.props.width,
		marginTop: "",
		float: "left",
		height: "100%",
		padding: "2%",
		borderRight: "2px dashed black",
		overflowY: "scroll",
	}}>
		<li>Developers</li>
		<li>Designer</li>
		<li>Gruppe</li>
	</div>);
	}
}