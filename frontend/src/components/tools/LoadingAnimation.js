import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import PropTypes from 'prop-types';

export default class LoadingAnimation extends React.Component {
	render() {
		return (
			<div style={{
				width: '100%',
				height: '100%',
				textAlign: 'center',
				marginTop: '16px',
				...this.props.style,
			}}>
				<CircularProgress/>
			</div>
		);
	}
}

LoadingAnimation.propTypes = {
	style: PropTypes.object,
};
