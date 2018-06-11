import React from 'react';
import config from '../../config';
import { Redirect } from 'react-router-dom';
import logo from '../../IMG/codex_logo1x.png';
import LinearProgress from 'material-ui/LinearProgress';

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

	render() {
		if (!this.state.loaded || !this.state.timeout) {
			return (
				<div style={{
					width: '80vw',
					height: '80vw',
					maxHeight: '60vh',
					marginTop: '20vh',
					marginLeft: 'auto',
					marginRight: 'auto',
					textAlign: 'center',
				}}>
					<img
						style={{
							marginBottom: '5%',
							height: '100%',
						}}
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
