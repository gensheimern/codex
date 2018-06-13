import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import IconSearch from 'material-ui/svg-icons/action/search';


import "./sidebars.css"

export default class SearchFeed extends React.Component {
	render() {
		return (
			<FlatButton
				style={{
					padding: 0,
					width: '20%',
					height: '100%',
					float: 'left',
					minWidth: '50px',
				}}
				backgroundColor="#1EA185"
				icon={ <IconSearch color="white"/> }
				onClick={this.props.onClick}
			/>
		);
	}
}