import React from 'react';
import GroupSidebar from "./MenuComponents/sidebar_content"

export default class Groups extends React.Component {
	render() {
		return (
			<GroupSidebar
				changeContent={this.props.changeContent}
				searchFilterFeed={this.props.searchFilterFeed}
				closeDrawer={this.props.closeDrawer}
			/>
		);
	}
}
