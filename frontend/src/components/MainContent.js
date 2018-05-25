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
			value: "",
			address: "",
		}
	}



	componentDidMount() {
	  const script = document.createElement("script");

	    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAZvkEYTPa9zx8xs99WxPQDled7GJ4pjcg&libraries=places";
	    script.async = true;

	    document.body.appendChild(script);
	}

	handleOpen = () => {
			this.setState({open: true});
	};

	handleClose = () => {
			this.setState({open: false});
	};

	handleSubmit = () => {
			this.child.createEvent();
			this.setState({open: false});
	}

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
        onClick={this.handleSubmit}
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
	 	 className="createEventWrapper"
		 actions={actions}
		 modal={false}
		 open={this.state.open}
		 onRequestClose={this.handleClose}
		 contentStyle={{ width:"95%",maxWidth:"none", paddingTop:"0px"}}
		 bodyStyle={{padding:"0px",paddingTop:"0px"}}
		 titleStyle={{paddingTop:"0px"}}
		autoScrollBodyContent={true}

	 >


	 	<CreateEventtCard ref={instance => { this.child = instance; }}/>


	 </Dialog>



			<FloatingActionButton onClick={this.handleOpen} style={style}>
		<ContentAdd />
	</FloatingActionButton>

				<Events />
			</div>
		);
	}
}
