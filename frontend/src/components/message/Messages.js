import React from 'react';
import Socket from '../../Socket';

export default class Messages extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			socket: new Socket(),
		};
	}

	componentDidMount() {
		this.state.socket.subscribe('test', console.log);
	}

	render() {
		return (
			<div>
				card
			</div>
		);
	}
}