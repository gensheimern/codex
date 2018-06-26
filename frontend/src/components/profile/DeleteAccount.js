import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import AlertError from 'material-ui/svg-icons/alert/error';
import config from '../../config';

/**
 * Shows a button to delete the account.
 */
export default class DeleteAccount extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			showDeleteAccountPrompt: false,
			showDeleteAccountError: null,
		};
	}

	handleDeleteAccount = () => {
		this.setState({
			showDeleteAccountPrompt: true,
		});
	}

	deleteAccount = () => {
		fetch(config.apiPath + "/user/me", {
			method: 'DELETE',
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
			localStorage.removeItem('apiToken');
			this.props.history.push('/');
		})
		.catch((err) => {
			this.setState({
				showDeleteAccountError: new Error('Could not delete account.'),
			});
		});
	}


	render() {
		const deleteAccountError = (
			<p>
				<AlertError style={{width: 30}} color="red" />
				Could not delete account.
			</p>
		);

		const deleteAccountPromptActions = [
			<RaisedButton
        		label="Cancel"
        		primary={false}
				onClick={() => {this.setState({ showDeleteAccountPrompt: false })}}
				style={{marginRight: '5%'}}
    		/>,
    		<RaisedButton
    			label="Delete"
				onClick={this.deleteAccount}
				backgroundColor="#ED6559"
				labelColor="#ffffff"
    		/>
		];

		const deleteAccountPrompt = (
			<Dialog
				title="Delete Account"
        		actions={deleteAccountPromptActions}
        		modal={true}
        		open={this.state.showDeleteAccountPrompt}
        	>
        		Are you sure, that you want to delete your account?
        	</Dialog>
		);

		return (
			<React.Fragment>
				<RaisedButton
					label="Delete Account"
					backgroundColor="#ED6559"
					color="#ffffff"
					onClick={this.handleDeleteAccount}
					labelColor="#ffffff"
				/>

				{this.state.showDeleteAccountError ? deleteAccountError : null}

				{this.state.showDeleteAccountPrompt ? deleteAccountPrompt : null}
			</React.Fragment>
		);
	}
}
