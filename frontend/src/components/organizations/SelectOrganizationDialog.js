import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

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
				label="Cancel"
				primary={true}
				onClick={this.props.close}
			/>,
		];

		return (
			<Dialog
				title="Select Organizations"
				modal={false}
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
