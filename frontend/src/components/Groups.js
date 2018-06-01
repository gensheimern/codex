import React from 'react';
import GroupSidebar from "./MenuComponents/sidebar_content"

export default class Groups extends React.Component {
	render() {
		console.log(this.props.searchFilterFeed)

	return (
		<GroupSidebar changeContent={this.props.changeContent} searchFilterFeed={this.props.searchFilterFeed} closeDrawer={this.props.closeDrawer}/>

	)
	}
}
