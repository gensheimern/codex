import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';

export default class UserAvatar extends React.Component {
	render() {
		const onClick = this.props.onClick || (() => {});

		if (this.props.user.image) {
			return (
				<Avatar
					src={this.props.user.image}
					style={{
						marginBottom: '7px',
						...this.props.style,
					}}
					onClick={onClick}
				/>
			);
		} else {
			return (
				<Avatar
					style={this.props.style}
					onClick={onClick}
				>
					{this.props.user.firstName[0]}{this.props.user.name[0]}
				</Avatar>
			);
		}
	}
}

UserAvatar.propTypes = {
	style: PropTypes.object,
	onClick: PropTypes.func,
	user: PropTypes.shape({
		image: PropTypes.string.isRequired,
		firstName: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
	}).isRequired,
};
