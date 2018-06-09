import React from 'react';
import PropTypes from 'prop-types';
import { CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import Snackbar from 'material-ui/Snackbar';
import config from '../../config';
import TextNotification from './TextNotification';

export default class JoinNotification extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			decided: false,
			loaded: false,
			message: '',
			showMessage: false,
		};

		this.saveAction = this.saveAction.bind(this);
		this.handleAccept = this.handleAccept.bind(this);
		this.handleDecline = this.handleDecline.bind(this);
		this.handleRequestClose = this.handleRequestClose.bind(this);
	}

	handleAccept() {
		this.saveAction(true);
	}

	handleDecline() {
		this.saveAction(false);
	}

	saveAction(accepted) {
		if (this.state.loaded) {
			return;
		}

		this.setState({
			decided: true,
		});

		fetch(
			`${config.apiPath}/user/me/decide/${this.props.notification.id}`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'X-Access-Token': localStorage.getItem('apiToken'),
				},
				body: JSON.stringify({
					accepted,
				}),
			},
		)
			.then((res) => {
				if (!res.ok) {
					throw new Error('Response not ok.');
				} else if (res.status !== 200) {
					throw new Error('Decision not saved.');
				}
				return res.json();
			})
			.then(() => {
				this.setState({
					loaded: true,
					message: accepted ? 'You accepted successfully.' : 'You do not accepted.',
					showMessage: true,
				});
			}).catch(() => {
				this.setState({
					decided: false,
					loaded: false,
					message: 'An Error occured. Try again later.',
					showMessage: true,
				});
			});
	}

	handleRequestClose() {
		this.setState({
			message: '',
			showMessage: false,
		});
	}

	render() {
		let actions = (
			<CardActions>
				<FlatButton label="Accept" onClick={this.handleAccept} />
				<FlatButton label="Decline" onClick={this.handleDecline} />
			</CardActions>
		);

		const snackbar = (
			<Snackbar
				open={this.state.showMessage}
				message={this.state.message}
				autoHideDuration={4000}
				onRequestClose={this.handleRequestClose}
			/>
		);

		if (this.state.decided) {
			if (!this.state.loaded) {
				actions = (<CircularProgress style={{ margin: '5px 16px' }} />);
			} else {
				return snackbar;
			}
		}

		return (
			<TextNotification notification={this.props.notification}>
				{actions}
				{snackbar}
			</TextNotification>
		);
	}
}

JoinNotification.propTypes = {
	notification: PropTypes.shape({
		id: PropTypes.number,
		title: PropTypes.string,
		type: PropTypes.string,
		message: PropTypes.string,
		time: PropTypes.string,
		seen: PropTypes.bool,
	}).isRequired,
};
