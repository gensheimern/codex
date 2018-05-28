import React from 'react';
import GroupSidebar from "./MenuComponents/sidebar_content"

export default class Groups extends React.Component {
	render() {
	return (
		<GroupSidebar changeContent={this.props.changeContent} closeDrawer={this.props.closeDrawer}/>

	)
	}
}
