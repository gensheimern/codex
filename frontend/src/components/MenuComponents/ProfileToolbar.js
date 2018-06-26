import React from "react";
import Toolbar, { ToolbarGroup } from 'material-ui/Toolbar';
import Avatar from 'material-ui/Avatar';
import Notification from 'material-ui/svg-icons/social/notifications';
import { withRouter } from 'react-router-dom';
import notificationChecker from '../notification/notificationChecker';
import Badge from 'material-ui/Badge';
import config from '../../config';
import SettingsMenu from './SettingsMenu';

class ProfileToolbar extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			show:false,
			previousIndex: "",
			newNotifications: 0,
			unseenNotifications: 0,
			unsubscribed: false,
			menuOpen: false,
			anchor: null,
			userImg: '',
			userFirstName: '',
			userLastName: '',
		};
	}

	showSettings = (event) => {
		event.preventDefault();

		this.setState({
			menuOpen: true,
			anchor: event.currentTarget,
		});
	}

	hideSettings = () => {
		this.setState({
			menuOpen: false,
		});
	}

	componentDidMount() {

		if(this.props.activeIndex === "notification"){
		this.props.changeTeamIndex("notification")
		this.setState({show:true});}
		notificationChecker.enable('notification', () => {
			if (!this.state.unsubscribed) {
				this.setState((prevState, props) => ({
					newNotifications: prevState.newNotifications + 1,
				}));
			}
		});

		this.loadUnseenNotifications();
		this.loadProfileData();
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

	loadProfileData() {
		fetch(config.apiPath + "/user/me/", {
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
            return res.json();
		})
		.then((res) => {
            this.setState({
				userImg: res.image,
				userFirstName: res.firstName,
				userLastName: res.name,
			});
        }).catch((error) => {
			this.setState({
				userImg: '',
				userFirstName: '',
				userLastName: '',
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

	componentDidUpdate(prevProps) {
		if(this.state.previousIndex !== this.props.activeIndex && this.props.activeIndex !== "notification"){
			this.setState({previousIndex: this.props.activeIndex})
		}
	}

	render(){

		let changeInd = this.state.previousIndex;
		console.log(changeInd);
		console.log(this.props.activeIndex);
		const IconNotStyle = {
			marginLeft: 0,
		}
		const UsedIconNotStyle = {
			marginLeft: 0,
			borderBottom : "5px solid #1ea185"
		}
		const IconProStyle = {
			cursor: 'pointer',

		}
		const UsedIconProStyle = {
			cursor: 'pointer',
			border : "3px solid #1ea185",
			borderRadius:"49%"
		}


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
			:	(<Notification
					onClick={() => {
						if(this.state.show === false){
						this.setState({show:true})
						this.readNotifications();
						this.props.changeTeamIndex("notification")
						this.props.history.push('/notifications');
					} else if(this.state.show === true){
						this.props.changeTeamIndex(changeInd);
						this.setState({show:false})
						this.readNotifications();
						this.props.history.goBack();
						}
					}}
					style={{
						cursor: 'pointer',
					}}
				/>);

				let iconNotifStyle = (this.props.activeIndex === "notification") ? UsedIconNotStyle : IconNotStyle;
				let iconProfileStyle = (this.props.activeIndex === "profile") ? UsedIconProStyle : IconProStyle;

		return (
			<React.Fragment>
				<Toolbar style={{
					backgroundColor: 'white',
				}}>
					<ToolbarGroup firstChild={true} style={iconNotifStyle}>
					{notificationIcon}
					</ToolbarGroup>

					<ToolbarGroup>
						{!this.state.userImg
							? (<Avatar
								onClick={this.showSettings}
								style={{
									cursor: 'pointer',
								}}
							>
								{this.state.userFirstName[0]}{this.state.userLastName[0]}
							</Avatar>)
							: (<Avatar
								src={this.state.userImg}
								onClick={this.showSettings}
								style={iconProfileStyle}
							/>)
						}

						<SettingsMenu
							menuOpen={this.state.menuOpen}
							anchor={this.state.anchor}
							hideSettings={this.hideSettings}
							history={this.props.history}
							activeIndex={this.props.activeIndex}
							changeTeamIndex={this.props.changeTeamIndex}
							/>
						</ToolbarGroup>
				</Toolbar>
			</React.Fragment>
		);
	}

}

export default withRouter(ProfileToolbar);
