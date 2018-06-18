import React from 'react';
import getSocket from '../../Socket'
import Snackbar from 'material-ui/Snackbar';

export default class GlobalMessage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			open: false,
			message: '',
		};
	}

	componentDidMount() {
		getSocket().subscribe('globalMessage', (message) => {
			this.setState({
				open: true,
				message,
			});
		});
	}

	componentWillUnmount() {
		getSocket().unsubscribe('globalMessage');
	}

	handleRequestClose = () => {
		this.setState({
			open: false,
		});
	}

	render() {
		return (
			<Snackbar
				open={this.state.open}
				message={this.state.message}
				autoHideDuration={4000}
				onRequestClose={this.handleRequestClose}
			/>
		);
	}
}
