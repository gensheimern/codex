import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import MoreIcon from 'material-ui/svg-icons/navigation/more-vert';

export default class AppMore extends React.Component {
	render() {
		return (
			<FlatButton
				style={{
					padding: 0,
					width: '56px',
					height: '100%',
					float: 'left',
					minWidth: '56px',
				}}
				backgroundColor="#1EA185"
				icon={ <MoreIcon color="white"/> }
				onClick={this.props.onClick}
			/>
		);
	}
}
