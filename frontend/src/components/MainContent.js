import React from 'react';
import Events from './event/Events';

export default class MainContent extends React.Component {
	render() {
		return (
			<div style={{
				width: this.props.width,
				marginTop: "",
				float: "left",
				height: "100%",
				overflowY: "scroll",
			}}>
				<Events />
			</div>
		);
	}
}