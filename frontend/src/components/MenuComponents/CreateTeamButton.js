import React from 'react';
import config from '../../config';

import FlatButton from 'material-ui/FlatButton';
import IconAdd from 'material-ui/svg-icons/content/add-circle';
import "./sidebars.css";
import Dialog from 'material-ui/Dialog';
import CreateGroupContent from '../groupmanager/CreateTeam.js';

import IconGroup from 'material-ui/svg-icons/social/group';

const defaultSelectedIcon = {
	icon : <IconGroup
		style={{
			height: '100%',
			width: '100% !important',
		}}
	/>
}

export default class CreateTeamButton extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			open: false,
			name: '',
			errTextName: '',
			description: '',
			errTextDescription: '',
			invitePeople: [],
			selectedIcon: defaultSelectedIcon,
			sending: false,
		};

		this.validateInput = this.validateInput.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleChangeN = this.handleChangeN.bind(this);
		this.handleChangeD = this.handleChangeD.bind(this);
		this.handleChangeI = this.handleChangeI.bind(this);
		this.callBackInvitePeople = this.callBackInvitePeople.bind(this);
	}

	validateInput(){
		if (this.state.name.length < 1) {
			return true;
		} else if (this.state.errTextName === '' && this.state.errTextDescription === '') {
			return false
		} else {
			return true;
		}
	}

	handleClick = () => {
		// this.props.closeDrawer();
		this.handleOpen();
	};

	handleOpen = () => {
		this.setState({open: true});
	};

	handleClose = () => {
		this.props.reload();
		this.setState({
			open: false,
			name: '',
			errTextName: '',
			description: '',
			errTextDescription: '',
			invitePeople: [],
			selectedIcon: defaultSelectedIcon,
			sending: false,
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();

		if(this.state.name !== '') {
			this.setState({
				sending: true,
			});
			fetch(`${config.apiPath}/team`, {
				method: 'POST',
				body: JSON.stringify({
					name: this.state.name,
					description: this.state.description,
					icon: this.state.selectedIcon.icon,
				}),
				headers: {
					'Content-Type': 'application/json',
					'X-Access-Token': localStorage.getItem('apiToken')
				}
			})
			.then(this.handleClose())
			.catch((error) => {
				this.setState({
					sending: false,
				});
			});
		} else {
			this.setState({
				showError: true
			});
		}

		let email = this.state.invitePeople.map(e => e.ValueEmail).join(',');
console.log(email)
	 	fetch(config.apiPath + "/sendmail/joinevent", {
	 		method: 'POST',
	 		body: JSON.stringify({
	 			email,
	 		}),
	 		headers: {
	 			'Content-Type': 'application/json',
	 			'X-Access-Token': localStorage.getItem('apiToken'),
	 		},
	 	})
	 	.then((res) => {
	 		if (!res.ok || res.status !== 201) {
	 			// handle error
	 		} else {
	 			this.renderSnackbar();
	 			this.props.history.push('/feed');
	 		}
	 	});
	}

	handleChangeN = event => {
		this.setState({
			name: event.target.value
		});

		if (event.target.value.length > 30) {
			this.setState({
				errTextName: 'Too many characters for a name, max.30!',
			});
		} else {
			this.setState({
				errTextName: '',
			});
		}

		this.validateInput();
	}

	handleChangeD = event => {
		this.setState({
			description: event.target.value
		});

		if (this.state.description.length > 80) {
			this.setState({
				errTextDescription: 'Too many characters for a description, max.80!',
			});
		} else {
			this.setState({
				errTextDescription: '',
			});
		}

		this.validateInput();
	}

	handleChangeI(x){
		this.setState({
			selectedIcon : x
		});
	}

	callBackInvitePeople(invitePeople){
		this.setState({ invitePeople })
	}

	render() {
		const actions = [
			<FlatButton
				label="Cancel"
				primary={true}
				onClick={this.handleClose}
			/>,
			<FlatButton
				label="Submit"
				primary={true}
				keyboardFocused={true}
				disabled={this.validateInput()}
				onClick={this.handleSubmit}
			/>,
		];

		return (
			<div>
				<div className="CreateTeamButton">
					<FlatButton
						icon={<IconAdd color='#FFFFFF' />}
						onClick={this.handleClick}
						target="_blank"
						style={{
							color: 'white',
							minWidth: '0px',
							margin: '0px',
							marginTop: '-3%',
						}}
					/>
				</div>

				<Dialog
					title="Create your group"
					actions={actions}
					modal={false}
					open={this.state.open}
					onRequestClose={this.handleClose}
					autoScrollBodyContent={true}
					>
					<div>
						<CreateGroupContent
							name={this.state.name}
							errTextName = {this.state.errTextName}
							description={this.state.description}
							errTextDescription = {this.state.errTextDescription}
							invitePeople={this.state.invitePeople}
							selectedIcon={this.state.selectedIcon}
							handleChangeN={this.handleChangeN}
							handleChangeD={this.handleChangeD}
							handleChangeI={this.handleChangeI}
							callBackInvitePeople={this.callBackInvitePeople}
						/>
					</div>
				</Dialog>
			</div>
		);
	}
}
