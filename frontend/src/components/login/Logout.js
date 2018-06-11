import React from 'react';
import Snackbar from 'material-ui/Snackbar';

export default class Logout extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			open: false,
		};
	}

	componentDidMount() {
		window.localStorage.removeItem('apiToken');

		this.setState({
			open: true,
		});
	}

	handleRequestClose = () => {
		this.setState({
			open: false,
		});
	};	

	render() {
		return (
			<Snackbar
				open={this.state.open}
				message="Successfully logged out."
				autoHideDuration={4000}
				onRequestClose={this.handleRequestClose}
			/>
		);
	}
}