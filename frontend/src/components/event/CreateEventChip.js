import React from 'react';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';

const styles = {
	wrapper: {
		display: 'flex',
		flexWrap: 'wrap',
	},
};

function handleClick() {
	// TODO: Show info about user
}

export default class CreateEventChip extends React.Component {

	render() {
		return (
			<div style={styles.wrapper}>
				<Chip
					onRequestDelete={this.props.delete}
					onClick={handleClick}
					style={{ margin: 4 }}
				>
					<Avatar src={this.props.peopleImage} />
					{this.props.name}
				</Chip>
			</div>
		);
	}
}
