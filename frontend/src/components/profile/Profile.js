import React from 'react';
import config from '../../config';
import UserSettings from './UserSettings';
import AccountSettings from './AccountSettings';
import NotificationSettings from './NotificationSettings';
import LanguageSettings from './LanguageSettings';
import RetryPrompt from '../tools/RetryPrompt';

export default class ProfileContent extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			timeFormat24: false,
			dateFormat: 'dd.mm.yyyy',
			automaticDate: false,
		};
	}

	getMyProfile() {
		this.setState({
			loaded: false,
		});
		fetch(config.apiPath + "/user/my", {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'X-Access-Token': localStorage.getItem('apiToken')
			}
		}).then((res) => {
			if (!res.ok) {
				throw new Error("Request failed.");
			} else if (res.status !== 200) {
				throw new Error("Forbidden");
			}
			
			return res;
		}).then(res => res.json()).then(res => {
			this.setState({
				loaded: true,
				error: null,

				user: res,

				firstName: res.firstName,
				lastName: res.name,
				email: res.email,
				password: res.password,
				image: res.image,
			});
		})
		.catch((err) => {
			this.setState({
				loaded: true,
				error: new Error(),
				user: {},
			});
		});

	}

	componentDidMount() {
		// this.getMyProfile();
	}

	handleChange = name => ev => {
		this.setState({
			[name]: ev.target.value,
		});
	}

	handleError = (error) => {
		this.setState({
			error: true,
		});
	}

	render() {
		if (this.state.error) {
			return (
				<RetryPrompt
					message="Service currently unavailable."
					btnMessage="Retry"
					onRetry={() => {
						window.location.reload();
					}}
				/>
			);
		}

		return (
			<React.Fragment>
				<UserSettings
					handleError={this.handleError}
				/>

				<br />

				<AccountSettings
					handleError={this.handleError}
				/>

				<br/>

				<NotificationSettings
					handleChange={this.handleChange}
				/>

				<br />

				<LanguageSettings
					handleChange={this.handleChange}
				/>
			</React.Fragment>
		);
	}
}
