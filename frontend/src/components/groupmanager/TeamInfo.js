import React from "react";
import "./groupmanager.css";
import config from '../../config';
import TextOrTextField from '../tools/TextOrTextField';
import IconGroup from 'material-ui/svg-icons/social/group';
import LoadingAnimation from '../tools/LoadingAnimation';

/*
 *	The component renders the customizable (for Team-Admin) Team-Information which each Team owns.
 */
export default class GroupInfo extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			isAdmin : '',
			name: '',
			description: '',
			invitePeople: [],
			selectedIcon: '',
			memberCount: 0,
			loading: false,
			team: {},
		};

		this.callBackInvitePeople = this.callBackInvitePeople.bind(this);
		this.loadGroup = this.loadGroup.bind(this);
		this.loadTeamMembers = this.loadTeamMembers.bind(this);
	}

	componentDidMount() {
		this.loadGroup(this.props.filter.filterFeed);
	}

	componentDidUpdate(prevProps) {
		if (this.props.filter.filterFeed !== prevProps.filter.filterFeed) {
			this.loadGroup(this.props.filter.filterFeed);
		}
	}

	loadGroup(id) {
		if(id === "PUBLIC") {
			this.setState({
				isAdmin : false,
				team: {
					name: 'PUBLIC',
					description: 'This is the PUBLIC Channel of VSF Experts! You can find all your colleagues here.',
				},
			});
		} else {
			this.setState({
				loading: true,
			});

			fetch(`${config.apiPath}/team/${id}`, {
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

				return res.json();
			})
			.then(team => {
				this.setState({
					team,
					loading: false,
				});

				this.loadTeamMembers(team.id);
			}).catch((err) => {
				console.log('Request failed.');
			});
		}
	}

	loadTeamMembers(id) {
		fetch(`${config.apiPath}/team/${id}/member`, {
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
			
			return res.json();
		}).then(res => {
			this.setState({
				memberCount: res.length,
				loading: false,
			});
		})
		.catch((err) => {
			console.log('Request failed.');
		});
	}

	handleSubmit(e) {
		e.preventDefault();

		if (this.state.name === "") {
			this.setState({
				showError: true,
			});
			return;
		}

		fetch(`${config.apiPath}/team`, {
			method: 'POST',
			body: JSON.stringify({
				name: this.state.name
			}),
			headers: {
				'Content-Type': 'application/json',
				'X-Access-Token': localStorage.getItem('apiToken')
			}
		})
		.then(() => {
			this.props.update();
		})
		.catch((err) => {
			console.log("display error");
		});
	}

	handleChange = name => e => {
		this.setState({
			[name]: e.target.value,
		});
	}

	handleChangeI = (selectedIcon) => {
		this.setState({ selectedIcon });
	}

	callBackInvitePeople(invitePeople) {
		this.setState({ invitePeople })
	}

	render() {
		if (this.state.loading) {
			return (
				<React.Fragment>
					<LoadingAnimation />
					<div style={{
						boxSizing: 'border-box',
						margin: '2%',
						marginTop: '3%',
						opacity: '0.2',
						width: '100%',
						border: '1px solid #727272',
					}}/>
				</React.Fragment>
			);
		}

		return (
			<React.Fragment>
				<div
					style={{
						height: '32px',
						width: '273px',
						color: '#4A4A4A',
						fontFamily: 'Trebuchet MS',
						fontSize: '18px',
						fontWeight: 'bold',
						lineHeight: '21px',
						marginLeft: '5%',
						marginTop: '2%',
					}}
				>
					<TextOrTextField
						value={this.state.team.name}
						onChange={this.handleChange('name')}
						isTextField={this.isAdmin}
					/>
				</div>

				<span style={{
					float: 'left',
					margin: '0% 5% 3% 5%',
				}}>
					{<IconGroup/>}
					{this.state.memberCount}
				</span>

				<div style={{
					height: '32px',
					width: '90%',
					color: '#727272',
					fontFamily: 'Trebuchet MS',
					fontSize: '14px',
					lineHeight: '16px',
					marginLeft: '5%',
				}}>
					<TextOrTextField
						value={this.state.team.description}
						onChange={this.handleChange('description')}
						isTextField={this.isAdmin}
					/>
				</div>

				<div style={{
					boxSizing: 'border-box',
					margin: '2%',
					opacity: '0.2',
					width: '100%',
					border: '1px solid #727272',
				}}/>
			</React.Fragment>
		);
	}
}