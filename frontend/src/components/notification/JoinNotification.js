import React from 'react';
import { Card, CardHeader, CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import Snackbar from 'material-ui/Snackbar';
import config from '../../config';

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
	}

	handleAccept = (event) => {
		this.saveAction(true);
	};

	handleDecline = (event) => {
		this.saveAction(false);
	};

	saveAction(accepted) {
		if (this.state.loaded) {
			return;
		}

		this.setState({
			decided: true,
		});
		
		fetch(config.apiPath + "/user/me/decide/" + this.props.notification.id, {
            method: 'POST',
            headers: {
				'Content-Type': 'application/json',
				'X-Access-Token': localStorage.getItem('apiToken'),
			},
			body: JSON.stringify({
				accepted,
			}),
		})
		.then((res) => {
            if(!res.ok) {
                throw new Error("Response not ok.");
            } else if(res.status !== 200) {
                throw new Error("Decision not saved.");
            }
            return res;
		})
		.then(res => res.json())
		.then((res) => {
            this.setState({
				loaded: true,
				message: accepted ? 'You accepted successfully.' : 'You do not accepted.',
				showMessage: true,
			});
        }).catch((err) => {
			this.setState({
				decided: false,
				loaded: false,
				message: 'An Error occured. Try again later.',
				showMessage: true,
			});
        });
	}

	handleRequestClose = () => {
		this.setState({
			message: '',
			showMessage: false,
		});
	}

	render() {
		const { id, title, type, message, targetId } = this.props.notification;

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
				actions = (<CircularProgress style={{margin: '5px 16px'}}/>);
			} else {
				return snackbar;
			}
		}

		return (
			<React.Fragment>
				<Card key={id} style={{margin: '5px'}}>
						<CardHeader
							title={`${title} - ${type}`}
							subtitle={message}
							style={{
								paddingTop: '10px',
								paddingBottom: 0,
							}}
						/>
						{actions}
				</Card>
				{snackbar}
			</React.Fragment>
		);
	}
}