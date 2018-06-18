import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import "./sidebars.css"
import IconGroup from 'material-ui/svg-icons/social/group';

export default class CreateTeamButton extends React.Component {

	handleClick = () => {
		this.props.clickGroupButton(this.props.index)
	}

	render() {
		let className;
		if (this.props.main) {
			className = this.props.isActive
				? 'highlightSidebarContent'
				: 'nonHighlightSidebarContent';
		} else {
			className = this.props.isActive
				? 'selectedGroup'
				: 'groupName';
		}

		return (
			<div className="GroupSidebarButton">
				<FlatButton
					icon={
						<IconGroup style={{
							float: 'left',
							marginRight: '3%',
							marginTop: '2%',
							marginLeft: '6%',
						}} />
					}
					className={className}
					onClick={this.handleClick}
					target="_blank"
					style={{
						color: 'white',
						minWidth: '0px',
						margin: '0px',
						width: '100%',
						textAlign: 'left',
					}}
				>
					{this.props.name}
				</FlatButton>
			</div>
		);
	}
}