import React from 'react';
import { Link } from 'react-router-dom';

export default class AddButton extends React.Component {

	render() {
		return (
			<Link to="/newEvent">
				<div style={{
					width: "30px",
					height: "30px",
					borderRadius: "50%",
					backgroundColor: "#aaa",
					float: "left",
					marginLeft: "2%",
					fontSize: "18pt",
				}}>&nbsp;&nbsp;+</div>
				<h2 style={{color: "white",}}>&nbsp;ADD EVENT</h2>
			</Link>
		);
	}

}