import React from 'react';
import Events from './event/Events';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import CreateEventtCard from './event/CreateEventCard';

export default class MainContent extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			open : false,
		}
	}

	handleOpen = () => {
	this.setState({open: true});
};

handleClose = () => {
	this.setState({open: false});
};

	render() {
		const style = {
  marginRight: 20,
};

const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose}
      />,
    ];


		return (
			<div style={{
				width: this.props.width,
				marginTop: "0%",
				float: "left",
				height: "100%",
				overflowY: "scroll",
			}}>

	 <Dialog
		 actions={actions}
		 modal={false}
		 open={this.state.open}
		 onRequestClose={this.handleClose}
		 contentStyle={{width:"100%",maxWidth:"none",}}
	 >
		 <CreateEventtCard />
	 </Dialog>



			<FloatingActionButton onClick={this.handleOpen} style={style}>
		<ContentAdd />
	</FloatingActionButton>

				<Events />
			</div>
		);
	}
}
