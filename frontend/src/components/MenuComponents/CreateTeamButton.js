import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import IconAdd from 'material-ui/svg-icons/content/add-circle';
import "./sidebars.css";
import Dialog from 'material-ui/Dialog';
import CreateGroupContent from '../groupmanager/CreateTeam.js';


export default class CreateTeamButton extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
    this.handleOpen = this.handleOpen.bind(this);

  }

  handleClick = () => {
    this.props.closeDrawer();
    this.handleOpen();
  };

  handleOpen = () => {
   this.setState({open: true});
 };

 handleClose = () => {
   this.setState({open: false});
 };

  render() {

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


    return (<div>
      <div className="CreateTeamButton">
        <FlatButton
          icon={<IconAdd color="#FFFFFF"/>}
          onClick={this.handleClick}
          target="_blank"
          style={{color:"white",
            minWidth:"0px",
            margin:"0px"}}/>
      </div>

      <Dialog
         title="Create you´re fabulous group!"
         actions={actions}
         modal={false}
         open={this.state.open}
         onRequestClose={this.handleClose}
       >
        <CreateGroupContent/>
       </Dialog>
    </div>
    );
  }
}