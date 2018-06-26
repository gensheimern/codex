import React from 'react';
import config from '../../config';
import { Redirect } from 'react-router-dom';
import logo from '../../IMG/logo/Logo_1.png';
import LinearProgress from 'material-ui/LinearProgress';

import './splashscreen.css';

/**
 * This component renders a splashscreen, showing the logo, covering the loading time.
 */
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
		}), 2200);
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

	isStandalone() {
		const navigatorSO = window.navigator.standalone;
		const restSO = window.matchMedia('(display-mode: standalone)').matches;

		return navigatorSO || restSO;
	}

	render() {
		if (!this.state.loaded || (!this.state.timeout && !this.isStandalone())) {
			return (
				<div className="splashscreenWrapper">
					<img
						className="splashscreenImage"
						src={logo}
						alt="Logo"
					/>
					<LinearProgress mode="indeterminate" />
				</div>
			);
		}

		return (
			<Redirect to={{
				pathname: this.state.loggedIn ? '/feed' : '/login',
			}} />
		);
	}
}
