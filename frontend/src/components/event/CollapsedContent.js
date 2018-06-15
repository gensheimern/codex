import React from 'react';
import config from '../../config';
import dateParser from './dateParser';
// import GroupFA from 'react-icons/lib/fa/group';
import PlaceMUI from 'react-icons/lib/md/place';
import TextField from 'material-ui/TextField';
import DeleteMUI from 'react-icons/lib/md/delete';
import FlatButton from 'material-ui/FlatButton';
import SendIcon from 'material-ui/svg-icons/content/send';
import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
import UserAvatar from './UserAvatar';
import IconDesc from 'material-ui/svg-icons/notification/event-note';

export default class CollapsedContent extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			imgPath: '',
			userInitials: '',
			value: '',
			comment: '',
		};

		this.handleChange = this.handleChange.bind(this);
		this._onKeyPress = this._onKeyPress.bind(this);
	}

	_onKeyPress(event) {
		if (event.key === 'Enter') { // enter key pressed
			event.preventDefault();

			this.sendComment();
		}
	}

	sendComment = () => {
		fetch(`${config.apiPath}/activity/${this.props.event.id}/message`, {
			method: 'POST',
			body: JSON.stringify({
				content: this.state.value,
			}),
			headers: {
				'Content-Type': 'application/json',
				'X-Access-Token': localStorage.getItem('apiToken'),
			},
		})
		.then((res) => {
			if (!res.ok) {
				throw new Error("Request failed.");
			} else if (res.status !== 201) {
				throw new Error("Forbidden");
			}

			return res.json();
		})
		.then(res => {
			this.props.loadMessages();
			this.setState({value: ''});
		})
		.catch((err) => {
			this.setState({
				error: 'An Error occured.',
			});
		});
	}

	componentDidMount() {
		fetch(`${config.apiPath}/user/me`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'X-Access-Token': localStorage.getItem('apiToken')
			},
		})
		.then((res) => {
			if (!res.ok) {
				throw new Error("Request failed.");
			} else if (res.status !== 200) {
				throw new Error("Forbidden");
			}

			return res.json();
		})
		.then(res => {
			this.setState({
				imgPath: res.image,
				userInitials: `${res.firstName[0]}${res.name[0]}`,
			});
		})
		.catch((err) => {
			// TODO
		});
	}

	handleChange(e){
		this.setState({
			value: e.target.value,
		});
	}

	deleteComment = (eventId, messageId) => () => {
		fetch(`${config.apiPath}/activity/${eventId}/message/${messageId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				'X-Access-Token': localStorage.getItem('apiToken'),
			}
		})
		.then((res) => {
			this.props.loadMessages();
			// TODO: Error handling
		})
	}

	ToggleCollapse(){
		if(this.props.collapse) {

			let message;

			if (this.props.messages.length !==0 ) {
				message = this.props.messages.map((messageItem, index) => {
					const avatar = messageItem.author.image
						? <Avatar src={messageItem.author.image} />
						: <Avatar>{messageItem.author.firstName[0]}{messageItem.author.name[0]}</Avatar>;
					return (
						<div className="commentWrapper" key={"messageItem"+index}>
							<div className="commentUserImage">
								{avatar}
								{/*<img src={messageItem.author.image} alt="" />*/}
							</div>
							<div className="commentInfoWrapper">
								<div className="commentContentWrapper">
									<span id="commentName"> {messageItem.author.name + " " + messageItem.author.firstName} </span>
									<h6>{messageItem.content}</h6>
									<h6>{dateParser.DateparserTime(messageItem.time)}</h6>
								</div>
							</div>
							<div className="commentDelete">
								{messageItem.author.me
									? <FlatButton
										icon={<DeleteMUI/>}
										onClick={this.deleteComment(this.props.event.id, messageItem.id)}
									/>
									: <span />
								}
							</div>
						</div>
					)
				});
			}

			const avatar = <UserAvatar user={{
				image: this.state.imgPath,
				firstName: this.state.userInitials[0],
				name: this.state.userInitials[1],
			}} style={{float: 'left'}} />;

			return (
				<div className="collapse-activity">
					<div className="event-extend-info">
						<hr/>
						<h4>  <IconDesc style={{width:"1em", height:"1em"}}/> {'"'}{this.props.event.description}{'"'} </h4>
						<h4> <PlaceMUI />  {this.props.event.place} </h4>
					</div>

					<div className="extendedInfo">

						</div>
						<div style={{ clear: 'both' }} />
						<hr className="activity-hr" />
						<div className="event-textfield">
							{message}
							<div className="texfield-profile-picture">
								{avatar}
								{/*<img src= {this.state.imgPath} alt=""/>*/}
							</div>
							<div  className="myTextfield">
							<TextField
								value={this.state.value}
								hintText= "Add a new comment"
								fullWidth={true}
								className="addComment"
								onKeyPress={this._onKeyPress}
								onChange={this.handleChange}
								style={{
									float: 'left',
									width: 'auto',
								}}
							/>
							<IconButton
								disabled={this.state.value === ''}
								onClick={this.sendComment}
								style={{
									float: 'rignt',
								}}
							>
								<SendIcon color="#f8c947" />
							</IconButton>
						</div>
					</div>
				</div>
			);
		} else {
			return(
			<div className="collapse-activity">
					<hr className="activity-hr" />
			</div>
		);
		}
	}

	render () {
		return (
			<div>
				{this.ToggleCollapse()}
			</div>
		)
	}
}
