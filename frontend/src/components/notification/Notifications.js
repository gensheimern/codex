import React from 'react';
import getSocket from '../../Socket';
import config from '../../config';
import TextNotification from './TextNotification';
import JoinNotification from './JoinNotification';
import ReminderNotification from './ReminderNotification';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import Push from '../Push';

export default class Notifications extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			socket: getSocket(),
			notifications: [],
			loaded: false,
			error: null,
		};

		this.handleNotification = this.handleNotification.bind(this);
	}

	componentDidMount() {
		this.state.socket.subscribe('notification', this.handleNotification);

		this.loadNotifications();
	}

	handleNotification(notification) {
		const { title, message } = notification;

		Push.sendPush(title, message);
	}

	loadNotifications() {
		this.setState({
			error: null,
			loaded: false,
		});

		fetch(config.apiPath + "/user/me/notifications", {
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
                throw new Error("An error occured.");
            }
            return res;
		})
		.then(res => res.json())
		.then((res) => {
            this.setState({
				notifications: res,
				loaded: true,
				error: null,
			});
        }).catch((error) => {
			this.setState({
				notifications: [],
				loaded: true,
				error,
			});
        });
	}

	handleClick = () => {
		this.loadNotifications();
	}

	render() {
		if (!this.state.loaded) {
			return (
				<div style={{
					width: '100%',
					textAlign: 'center',
					marginTop: '16px',
				}}>
					<CircularProgress/>
				</div>
				);
		}

		if (this.state.error) {
			return (
				<div style={{
					width: '100%',
					textAlign: 'center',
					marginTop: '50px',
				}}>
					<p>Could not load notifications.</p>
					<RaisedButton label="Retry" onClick={this.handleClick}/>
				</div>
			);
		}

		if (this.state.notifications.length === 0) {
			return (
				<div style={{
					width: '100%',
					textAlign: 'center',
					marginTop: '50px',
				}}>
					<p>No notifications.</p>
					<RaisedButton label="Reload" onClick={this.handleClick}/>
				</div>
			);
		}

		return (
			<div style={{
				height: '100vh',
				overflowY: 'scroll'
			}}>
				{this.state.notifications.map(notification => {
					switch (notification.type) {
						case 'notification':	return(<TextNotification notification={notification} key={notification.id}/>);
						case 'joinTeam':		return(<JoinNotification notification={notification} key={notification.id}/>);
						case 'joinEvent':		return(<JoinNotification notification={notification} key={notification.id}/>);
						case 'reminder':		return(<ReminderNotification notification={notification} key={notification.id}/>);
						default:				return(<TextNotification notification={notification} key={notification.id}/>);
					}
				})}
			</div>
		);
	}
}