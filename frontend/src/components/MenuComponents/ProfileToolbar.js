import React from "react";
import Toolbar, { ToolbarGroup } from 'material-ui/Toolbar';
import Avatar from 'material-ui/Avatar';
import Notification from 'material-ui/svg-icons/social/notifications';
import { Link, withRouter } from 'react-router-dom';
import notificationChecker from '../notification/notificationChecker';
import Badge from 'material-ui/Badge';
import config from '../../config';

class ProfileToolbar extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			newNotifications: 0,
			unseenNotifications: 0,
			unsubscribed: false,
		};
	}

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

	render(){
		const notificationIcon = this.state.newNotifications + this.state.unseenNotifications > 0
			? 	(<Badge
					badgeContent={this.state.newNotifications + this.state.unseenNotifications}
					badgeStyle={{
						backgroundColor: 'red',
						color: 'white',
						top: 12,
						right: 12,
					}}
				>
					<Notification onClick={() => {
						this.readNotifications();
						this.props.history.push('/notifications');
					}}
					style={{
						cursor: 'pointer',
					}}/>
				</Badge>)
			:	(<Notification onClick={() => {
					this.readNotifications();
					this.props.history.push('/notifications');
				}}/>);

		return (
			<React.Fragment>
				<Toolbar style={{
					backgroundColor: 'white',
				}}>
					<ToolbarGroup firstChild={true} style={{
						marginLeft: 0,
					}}>
					{notificationIcon}
					</ToolbarGroup>

					<ToolbarGroup>
						<Link to="/profile">
							<Avatar>MM</Avatar>
						</Link>
					</ToolbarGroup>
				</Toolbar>
			</React.Fragment>
		);
	}

}

export default withRouter(ProfileToolbar);
