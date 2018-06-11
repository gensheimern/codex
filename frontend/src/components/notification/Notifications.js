import React from 'react';
import config from '../../config';
import TextNotification from './TextNotification';
import JoinNotification from './JoinNotification';
import ReminderNotification from './ReminderNotification';
// import Push from '../Push';
import LoadingAnimation from '../tools/LoadingAnimation';
import RetryPrompt from '../tools/RetryPrompt';

export default class Notifications extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			notifications: [],
			loaded: false,
			error: null,
		};

		this.loadNotifications = this.loadNotifications.bind(this);
	}

	componentDidMount() {
		/* this.state.socket.subscribe('notification', (notification) => {
			const { title, message } = notification;
			Push.sendPush(title, message);
		}); */

		this.loadNotifications();
	}

	loadNotifications() {
		this.setState({
			error: null,
			loaded: false,
		});

		fetch(`${config.apiPath}/user/me/notifications`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'X-Access-Token': localStorage.getItem('apiToken'),
			},
		})
			.then((res) => {
				if (!res.ok) {
					throw new Error('Response not ok.');
				} else if (res.status !== 200) {
					throw new Error('An error occured.');
				}
				return res.json();
			})
			.then((res) => {
				this.setState({
					notifications: res,
					loaded: true,
					error: null,
				});
			})
			.catch((error) => {
				this.setState({
					notifications: [],
					loaded: true,
					error,
				});
			});
	}

	render() {
		if (!this.state.loaded) {
			return (<LoadingAnimation />);
		}

		if (this.state.error) {
			return (
				<RetryPrompt
					onRetry={this.loadNotifications}
					message="Could not load notifications."
					btnMessage="Retry"
				/>
			);
		}

		if (this.state.notifications.length === 0) {
			return (
				<RetryPrompt
					onRetry={this.loadNotifications}
					message="No notifications."
					btnMessage="Reload"
				/>
			);
		}

		return (
			<div
				style={{
					padding: '2%',
				}}
			>
				{this.state.notifications.map((notification) => {
					switch (notification.type) {
					case 'notification':	return (<TextNotification notification={notification} key={notification.id} />);
					case 'joinTeam':		return (<JoinNotification notification={notification} key={notification.id} />);
					case 'joinEvent':		return (<JoinNotification notification={notification} key={notification.id} />);
					case 'reminder':		return (<ReminderNotification notification={notification} key={notification.id} />);
					default: return (<TextNotification notification={notification} key={notification.id} />);
					}
				})}
			</div>
		);
	}
}
