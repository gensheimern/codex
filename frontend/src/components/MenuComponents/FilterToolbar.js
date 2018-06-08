import React from "react";
import Toolbar, { ToolbarGroup } from 'material-ui/Toolbar';
import DesktopSearchBar from './DesktopSearchBar';
import FilterDropDown from './FilterDropDown';

export default class FilterToolbar extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			show: true,
		};
	}

	changeShow = () => {
		// Do nothing
	}

	render(){
		return (
			<React.Fragment>
				<Toolbar style={{
					backgroundColor: 'white',
				}}>
					<ToolbarGroup firstChild={true} style={{
						marginLeft: 0,
					}}>
					<DesktopSearchBar
						searchFilterFeed={this.props.searchFilterFeed}
					/>
					
					</ToolbarGroup>
					<ToolbarGroup>
						<FilterDropDown
							searchFilterFeed={this.props.searchFilterFeed}
						/>
					</ToolbarGroup>
				</Toolbar>
			</React.Fragment>
		);
	}

}
