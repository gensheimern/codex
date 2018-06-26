import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

/**
 * Show a dialog to manage the users organizations.
 */
export default class SelectOrganizationDialog extends React.Component {
	render() {
		const back = this.props.backBtn
			? <FlatButton
				label="Back"
				primary={true}
				onClick={this.props.back}
			/>
			: null;

		const actions = [
			back,
			<FlatButton
				label="Close"
				primary={true}
				onClick={this.props.close}
			/>,
		];

		return (
			<Dialog
				title="Select Organizations"
				modal={this.props.modal}
				autoScrollBodyContent={true}
				actions={actions}
				open={this.props.open}
				onRequestClose={this.props.close}
			>
				{this.props.children}
			</Dialog>
		);
	}
}
