import React from 'react';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import Badge from 'material-ui/Badge';
import config from '../../config';
import LoadingAnimation from '../tools/LoadingAnimation';
import PropTypes from 'prop-types';
import ImageIcon from 'material-ui/svg-icons/image/image';
import RaisedButton from 'material-ui/RaisedButton';
import ImageUpload from './ImageUpload';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import axios from 'axios';


import './profile.css';

/**
 * Shows inputs to change the personal user data saved by the lunch planner.
 */
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
			uploadFile:null,
			open: false,

			loaded: false,
			error: false,
			saved: true,
		};
		this.handleFile = this.handleFile.bind(this);
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

	handleFile(file) {
		console.log(file);
			this.setState({uploadFile: file, open: true,});
	}


handleDialogYes = () => {
	console.log("yes");
	this.setState({open: false});

	if(this.state.uploadFile !== null){
	const fd = new FormData();
	const configAxios = {
						 headers: { 'content-type': 'multipart/form-data',
						 'X-Access-Token': localStorage.getItem('apiToken'),

					 }
				 }

	fd.append('image',this.state.uploadFile[0],"user_" + this.state.uploadFile[0].name);
	axios.post(config.apiPath +'/upload/profile',fd, configAxios)
		.then(res => {
				console.log(res);
		});
	}

};

handleDialogNo = () => {
	this.setState({open: false});
};

showPreview(){
  if(this.state.uploadFile !== null){
    return <img alt="uploadedImage" style={{width:"300px", height:"auto"}} src={this.state.uploadFile[0].preview} />
  } else {
    return <ImageUpload handleFile={this.handleFile} />
  }
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


		const actions = [
				 <FlatButton
					 label="NO"
					 primary={true}
					 onClick={this.handleDialogNo}
				 />,
				 <FlatButton
					 label="YES"
					 primary={true}
					 keyboardFocused={true}
					 onClick={this.handleDialogYes}
				 />,
			 ];


		return (

			<Paper className="profilePaper" zDepth={2}>

			<Dialog
				 actions={actions}
				 title="Would you really like to upload this photo?"
				 modal={false}
				 open={this.state.open}
				 onRequestClose={this.handleDialogNo}
			 >
			 	Use 100x100 for the best fit <br/><br/>
			 	{this.showPreview()}
			 </Dialog>

			<div className="ImageWrapper">
			<ImageUpload handleFile={this.handleFile} />
				<Badge
					badgeContent={<ImageIcon style={{color: '#ffffff'}}/>}
					badgeStyle={{
						backgroundColor: '#1ea185',
						top: 80,
						marginLeft: "60px !important",
					}}
					onClick={() => {console.log('Change image');}}
				>
				{this.state.image
					? (<Avatar
						src={this.state.image}
						size={100}
						style={{padding:"0px"}}
						className="ProfileAvatar"
					/>)
					: (<Avatar size={100}>
							{this.state.firstName[0]}{this.state.lastName[0]}
					</Avatar>)
				}
				</Badge>
				</div>
				<br/>

				{this.makeTextField('firstName', 'First name')}

				{this.makeTextField('lastName', 'Last name')}

				<br />

				{this.makeTextField('email', 'E-Mail')}

				{this.makeTextField('position', 'Position')}

				<br />

				{this.makeTextField('division', 'Division')}

				{this.makeTextField('room', 'Room')}

				<br />

				<RaisedButton
					label="Save"
					disabled={this.state.saved}
					backgroundColor="#32AA90"
					color="#ffffff"
					onClick={this.saveUserData}
					style={{
						color: '#ffffff',
						float: 'right',
					}}
				/>
			</Paper>
		);
	}
}


UserSettings.propTypes = {
	handleError: PropTypes.func.isRequired,
};
