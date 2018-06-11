import React from 'react';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import Badge from 'material-ui/Badge';
import config from '../../config';
import LoadingAnimation from '../tools/LoadingAnimation';
import PropTypes from 'prop-types';
import ImageIcon from 'material-ui/svg-icons/image/image';

import './profile.css';

export default class UserSettings extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			image: '',
			position: 'Chef',
			division: 'Team CODEX',
			room: '000',

			loaded: false,
			error: false,
			saved: true,
		};
	}

	componentDidMount() {
		this.loadUserData();
	}

	loadUserData = () => {
		this.setState({
			loaded: false,
		});

		fetch(config.apiPath + "/user/my", {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'X-Access-Token': localStorage.getItem('apiToken'),
			},
		}).then((res) => {
			if (!res.ok) {
				throw new Error("Request failed.");
			} else if (res.status !== 200) {
				throw new Error("An error occured.");
			}
			
			return res.json();
		})
		.then(res => {
			this.setState({
				loaded: true,
				error: false,

				firstName: res.firstName,
				lastName: res.name,
				email: res.email,
				password: res.password,
				image: res.image,
			});
		})
		.catch((err) => {
			this.props.handleError(err);
			this.setState({
				loaded: true,
				error: true,
			});
		});
	}

	saveUserData = () => {
		fetch(config.apiPath + "/user/my", {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'X-Access-Token': localStorage.getItem('apiToken'),
			},
			body: JSON.stringify({
				firstName: this.state.firstName,
				name: this.state.lastName,
				email: this.state.email,
				password: this.state.password,
				image: this.state.image,
			}),
		}).then((res) => {
			if (!res.ok) {
				throw new Error("Request failed.");
			} else if (res.status !== 200) {
				throw new Error("An error occured.");
			}
			
			return res.json();
		})
		.then(res => {
			this.setState({
				saved: true,
			});
		})
		.catch((err) => {
			this.setState({
				saved: false,
			});
		});
	}

	makeTextField = (id, label) => {
		return (
			<TextField
				id={id}
				label={label}
				value={this.state[id]}
				onChange={this.handleChange(id)}
				floatingLabelText={label}
				className="userSettingTextfield"
			/>
		);
	}

	handleChange = name => ev => {
		this.setState({
			[name]: ev.target.value,
			saved: false,
		});
	}

	render() {
		if (!this.state.loaded) {
			return (
				<Paper className="profilePaper" zDepth={2}>
					<LoadingAnimation/>
				</Paper>
			);
		}

		if(this.state.error) {
			return null;
		}

		return (
			<Paper className="profilePaper" zDepth={2}>
				<Badge
					badgeContent={<ImageIcon style={{color: 'white'}}/>}
					badgeStyle={{
						backgroundColor: '#1ea185',
						top: 100,
						right: 30,
						padding: '3%',
					}}
					onClick={() => {console.log('Change image');}}
				>
				{this.state.image
					? (<Avatar
						src={this.state.image}
						size={100}
					/>)
					: (<Avatar size={100}>
							{this.state.firstName[0]}{this.state.lastName[0]}
					</Avatar>)
				}
				</Badge>

				<br/>

				{this.makeTextField('firstName', 'First name')}

				{this.makeTextField('lastName', 'Last name')}

				<br />

				{this.makeTextField('email', 'E-Mail')}

				{this.makeTextField('position', 'Position')}

				<br />

				{this.makeTextField('division', 'Division')}

				{this.makeTextField('room', 'Room')}
			</Paper>
		);
	}
}

UserSettings.propTypes = {
	handleError: PropTypes.func.isRequired,
};
