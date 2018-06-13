import React from 'react';
import IconButton from 'material-ui/IconButton';
import AddList from 'material-ui/svg-icons/av/playlist-add';
import ClosedIcon from 'material-ui/svg-icons/navigation/close';
import DeleteIcon from 'material-ui/svg-icons/action/delete'

export default class ListOrganizations extends React.Component {
	render() {
		return this.props.organizations.map(organization => {
				let actionIcon;
				let action;

				if (!this.props.joined) {
					actionIcon = <AddList />;
					action = this.props.onJoin;
				} else {
					if (organization.admin.me) {
						actionIcon = <DeleteIcon />;
						action = this.props.onDelete;
					} else {
						actionIcon = <ClosedIcon />;
						action = this.props.onLeave;
					}
				}

			return (
				<div
					key={organization.id}
					style={{
						clear: 'both',
						overflow: 'hidden',
					}}
				>
					<p
						style={{
							float: 'left',
							margin: '2%',
							maxWidth: '80%',
						}}
					>
						<span style={{fontWeight: '600'}}>{organization.name}</span> - {organization.description}
					</p>
					<IconButton
						onClick={() => { action(organization.id) }}
						style={{
							float: 'right',
						}}
					>
						{actionIcon}
					</IconButton>
				</div>
			)
		});
	}
}
