import React from 'react';
import config from '../config';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import CircularProgress from 'material-ui/CircularProgress';

export default class ProfileContent extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			user: {},

			firstName: 'Max',
			lastName: 'Granzow',
			email: 'max@codex-team.de',
			password: '',
			position: 'Chef',
			division: 'kp',
			room: '000',

			timeFormat24: false,
			dateFormat: 'dd.mm.yyyy',
			automaticDate: false,

			loaded: false,
			error: null,
		};

		this.getMyProfile = this.getMyProfile.bind(this);
		this.handleChange = this.handleChange.bind(this);
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
			console.log(res.status);
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
		this.getMyProfile();
	}

	handleChange = name => ev => {
		this.setState({
			[name]: ev.target.value,
		});
	}

	render() {
		if (!this.state.loaded) {
			return (
				<div style={{
					width: '100%',
					textAlign: 'center',
					marginTop: '10px',
				}}>
					<CircularProgress size={60} thickness={7} />
				</div>
			);
		}

		if(this.state.loaded && this.state.error) {
			return(
				<div style={{
					width: '100%',
					textAlign: 'center',
					marginTop: '30%',
				}} >
					<p>Service currently unavailable.</p>
					<RaisedButton
						label="Retry"
						color="white"
						onClick={() => window.location.reload()}
					/>
				</div>
			);
		}

		const paperStyle = {
			width: '96%',
			margin: '2%',
			padding: '6%',
			textAlign: 'center',
			display: 'inline-block',
		};

		return (
			<React.Fragment>
				{/* Profile settings */}
				<Paper style={paperStyle} zDepth={2}>

					<Avatar size={100}>
						{this.state.firstName[0]}{this.state.lastName[0]}
					</Avatar>

					<TextField
						id="firstName"
						label="First name"
						value={this.state.firstName}
						onChange={this.handleChange('firstName')}
						floatingLabelText="First name"
					/>

					<TextField
						id="lastName"
						label="Last name"
						value={this.state.lastName}
						onChange={this.handleChange('lastName')}
						floatingLabelText="Last name"
					/>

					<br />

					<TextField
						id="email"
						label="Email"
						value={this.state.email}
						onChange={this.handleChange('email')}
						floatingLabelText="E-Mail"
					/>

					<br />

					<TextField
						id="position"
						label="Position"
						value={this.state.position}
						onChange={this.handleChange('position')}
						floatingLabelText="Position"
					/>

					<br />

					<TextField
						id="division"
						label="Division"
						value={this.state.division}
						onChange={this.handleChange('division')}
						floatingLabelText="Division"
					/>

					<TextField
						id="room"
						label="Room"
						value={this.state.room}
						onChange={this.handleChange('room')}
						floatingLabelText="Room"
					/>
					
				</Paper>

				<br />

				{/* Account settings */}
				<Paper style={{...paperStyle, textAlign: 'left'}} zDepth={2}>
					<h4 style={{textAlign: 'left'}}>Account settings</h4>

					<TextField
						id="password"
						label="Password"
						value={this.state.password}
						onChange={this.handleChange('password')}
						floatingLabelText="Change Password"
						style={{
							width: '100%',
							marginBottom: '10px',
						}}
					/>

					<br/>

					<RaisedButton
						label="Delete Account"
						backgroundColor="red"
						color="white"
						onClick={() => alert('Account deleted.')}
					/>
				</Paper>

				<br/>

				{/* Notification settings */}
				<Paper style={paperStyle} zDepth={2}>

					<h3>Notification Settings</h3>

					<div>
						<Toggle
							label="Reminder"
							labelPosition="left"
							style={{
								marginTop: '5%',
								width: '40%',
								float: 'left',
							}}
						/>

						<DropDownMenu value={1} onChange={this.handleChange} style={{
							width: '40%',
							float: 'left',
						}}>
							<MenuItem value={1} primaryText="Event time" />
							<MenuItem value={2} primaryText="5min" />
							<MenuItem value={3} primaryText="10min" />
							<MenuItem value={4} primaryText="30min" />
							<MenuItem value={5} primaryText="1h" />
						</DropDownMenu>
					</div>

					<Toggle
						label="Receive Notifications"
						labelPosition="right"
						style={{
							textAlign: 'left',
						}}
					/>

				</Paper>

				<br />

				{/* Language and Time settings */}
				<Paper style={paperStyle} zDepth={2}>
					<h3>Language and Time</h3>

					<DropDownMenu value={1} onChange={this.handleChange} style={{width: '100%'}}>
						<MenuItem value={1} primaryText="English (British)" />
						<MenuItem value={2} primaryText="English (American)" />
						<MenuItem value={3} primaryText="Deutsch" />
						<MenuItem value={4} primaryText="..." />
					</DropDownMenu>

					<Toggle
						label="Automatic date and time"
						labelPosition="left"
					/>

					<DropDownMenu value={1} onChange={this.handleChange} style={{width: '100%'}}>
						<MenuItem value={1} primaryText="dd.mm.yyyy" />
					</DropDownMenu>

					<Toggle
						label="User 24-hour format"
						labelPosition="left"
					/>

				</Paper>
			</React.Fragment>
		);
	}
}
