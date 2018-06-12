import React from 'react';
import IconButton from 'material-ui/IconButton';
import AddList from 'material-ui/svg-icons/av/playlist-add';
import ClosedIcon from 'material-ui/svg-icons/navigation/close';

export default class ListOrganizations extends React.Component {
	render() {
		return this.props.organizations.map(organization => (
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
					}}
				>
					{organization.name} - {organization.description}
				</p>
				<IconButton
					onClick={() => { this.props.onJoin(organization.id) }}
					style={{
						float: 'left',
					}}
				>
					{organization.active ? <ClosedIcon /> : <AddList />}
				</IconButton>
			</div>
		));
	}
}
