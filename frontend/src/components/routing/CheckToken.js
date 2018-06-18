import React from 'react';
import { Redirect } from 'react-router-dom';
import config from '../../config';

/**
 * Checks if the authentification token is valid when mounted.
 * If the token expired, the user is redirected to the login.
 */
class CheckToken extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loaded: false,
			loggedIn: false,
		};
	}

	componentDidMount() {
		this.checkToken();
	}

	checkToken() {
		this.setState({
			loaded: false,
			loggedIn: false,
		});

		fetch(config.apiPath + "/user/me", {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'X-Access-Token': localStorage.getItem('apiToken'),
			}
		})
		.then((res) => {
			if(!res.ok) {
				throw new Error("Response not ok.");
			} else if(res.status !== 200) {
				throw new Error("Not logged in.");
			}
			
			this.setState({
				loaded: true,
				loggedIn: true,
			});
		})
		.catch((error) => {
			this.setState({
				loaded: true,
				loggedIn: false,
			});
		});
	}

	componentDidUpdate(prevProps) {
		if (prevProps.route !== this.props.route
			&& this.state.loaded) {
				this.checkToken();
		}
	}
	
	render() {
		if (this.state.loaded && !this.state.loggedIn) {
			return (
				<Redirect to={{
					pathname: '/login',
				}} />
			);
		}
		return null;
	}
}

export default CheckToken;
