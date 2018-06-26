import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';

/**
 * Shows a prompt with a retry option.
 */
export default class RetryPrompt extends React.Component {
	render() {
		return (
			<div style={{
				width: '100%',
				height: '100%',
				textAlign: 'center',
				marginTop: '50px',
				...this.props.style,
			}}>
				<p>{this.props.message}</p>
				<RaisedButton
					label={this.props.btnMessage || 'Retry'}
					onClick={this.props.onRetry}/>
			</div>
		);
	}
}

RetryPrompt.propTypes = {
	onRetry: PropTypes.func.isRequired,
	message: PropTypes.string.isRequired,
	btnMessage: PropTypes.string,
	style: PropTypes.object,
};
