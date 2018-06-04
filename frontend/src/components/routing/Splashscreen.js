import React from 'react';
import LoadingAnimation from '../tools/LoadingAnimation';
import config from '../../config';
import { Redirect } from 'react-router-dom';

export default class Splashscreen extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loaded: false,
			loggedIn: false,
			timeout: false,
		};

		setTimeout(() => this.setState({
			timeout: true,
		}), 1000);
	}

	componentDidMount() {
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

	render() {
		if (!this.state.loaded || !this.state.timeout) {
			return <LoadingAnimation/>;
		}

		return (
			<Redirect to={{
				pathname: this.state.loggedIn ? '/feed' : '/login'
			}} />
		);
	}
}
