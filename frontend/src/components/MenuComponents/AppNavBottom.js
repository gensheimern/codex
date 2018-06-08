import React, {Component} from 'react';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconAdd from 'material-ui/svg-icons/content/add-circle';
import IconProfile from 'material-ui/svg-icons/social/person';
import IconCalendar from 'material-ui/svg-icons/action/event';
import IconFeed from 'material-ui/svg-icons/action/assignment';
import Notification from 'material-ui/svg-icons/social/notifications';
import { withRouter } from 'react-router-dom';
import notificationChecker from '../notification/notificationChecker';
import Badge from 'material-ui/Badge';
import config from '../../config';
import './sidebars.css';

const FeedIcon = <IconFeed/>;
const CalendarIcon = <IconCalendar/>;
const AddIcon = <IconAdd/>;
const ProfileIcon = <IconProfile />;

/**
 * A simple example of `BottomNavigation`, with three labels and icons
 * provided. The selected `BottomNavigationItem` is determined by application
 * state (for instance, by the URL).
 */
class AppNavBottom extends Component {
	state = {
		selectedIndex: 0,
		newNotifications: 0,
		unseenNotifications: 0,
		unsubscribed: false,
	};

	select = (index) => {
		this.readNotifications();

		this.setState({selectedIndex: index})
		this.props.changeContent(index);
	};

	componentDidMount() {
		notificationChecker.enable('notification', () => {
			if (!this.state.unsubscribed) {
				this.setState((prevState, props) => ({
					newNotifications: prevState.newNotifications + 1,
				}));
			}
		});

		this.loadUnseenNotifications();
	}

	loadUnseenNotifications() {
		fetch(config.apiPath + "/user/me/notifications/unseen", {
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
				unseenNotifications: res.unseenNotifications,
			});
				}).catch((error) => {
			this.setState({
				unseenNotifications: 0,
			});
				});
	}

	componentWillUnmount() {
		this.setState({
			unsubscribed: true,
		});
		notificationChecker.disable('notification');
	}

	readNotifications = () => {
		this.setState({
			newNotifications: 0,
			unseenNotifications: 0,
		});
	}

	render() {
		const notificationIcon = this.state.newNotifications + this.state.unseenNotifications > 0
			? 	(<Badge
					badgeContent={this.state.newNotifications + this.state.unseenNotifications}
					badgeStyle={{
						backgroundColor: 'red',
						color: 'white',
						top: 1,
						right: 12,
						fontSize: '10px',
						width: '16px',
						height: '16px',
						padding : '0px !important',
						margin : '0px !important',
					}}
					style={{
						padding : "0px !important",
					}}
				>
					<Notification onClick={() => {
						this.readNotifications();
						this.props.history.push('/notifications');
					}}
					className="BadgeNotif"
					style={{
						cursor: 'pointer',
						padding : '0px !important',
						top: 1,
						right: 12,
					}}
					/>
				</Badge>)
			:	(<Notification onClick={() => {
					this.readNotifications();
					this.props.history.push('/notifications');
				}}/>);

		const itemStyle = {
			minWidth: '56px',
		};

		return (
			<Paper className="navbarbottom" zDepth={1}>
				<BottomNavigation selectedIndex={this.props.index}>
					<BottomNavigationItem
						icon={FeedIcon}
						onClick={() => this.props.history.push('/feed')}
						style={itemStyle}
					/>
					<BottomNavigationItem
						icon={CalendarIcon}
						onClick={() => this.props.history.push('/personal')}
						style={itemStyle}
					/>
					<BottomNavigationItem
						icon={AddIcon}
						onClick={() => this.props.history.push('/addevent')}
						style={{
							...itemStyle,
							padding: '0px !important',
						}}
					/>
					<BottomNavigationItem
						icon={notificationIcon}
						onClick={() => this.props.history.push('/notifications')}
						style={itemStyle}
					/>
					<BottomNavigationItem
						icon={ProfileIcon}
						onClick={() => this.props.history.push('/profile')}
						style={itemStyle}
					/>
				</BottomNavigation>
			</Paper>
		);
	}
}

export default withRouter(AppNavBottom);
