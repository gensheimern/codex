import React from 'react';
import config from '../../config';

import FlatButton from 'material-ui/FlatButton';
import IconEdit from 'material-ui/svg-icons/image/edit';
import "./groupmanager.css";
import Dialog from 'material-ui/Dialog';
import EditTeamContent from './EditTeamContent';

import IconGroup from 'material-ui/svg-icons/social/group';

const defaultSelectedIcon = {
                        icon : <IconGroup style={{height:"100%",
                                                  width:"100% !important",}}/>
                            }

export default class EditTeam extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false,
                  name: "",
                  description:"",
                  invitePeople: [],
                  selectedIcon : defaultSelectedIcon,};
    this.handleOpen = this.handleOpen.bind(this);
    this.handleChangeN = this.handleChangeN.bind(this);
    this.handleChangeD = this.handleChangeD.bind(this);
    this.handleChangeI = this.handleChangeI.bind(this);
    this.callBackInvitePeople = this.callBackInvitePeople.bind(this);


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
 handleSubmit(e) {
     e.preventDefault();

     if(this.state.name !== "") {
         fetch(config.apiPath + "/team ", {
             method: 'POST',
             body: JSON.stringify({
                 name: this.state.name
             }),
             headers: {
                 'Content-Type': 'application/json',
                 'X-Access-Token': localStorage.getItem('apiToken')
             }
         }).then(() => {
             this.props.update();
         }).catch((err) => {
             console.log("display error");

         });
     } else {
         this.setState({
             showError: true
         });
     }
 }

 handleChangeN = event => {
     this.setState({
         name: event.target.value
     });
 }
 handleChangeD = event => {
     this.setState({
         description: event.target.value
     });
 }
 handleChangeI(x){
     this.setState({
         selectedIcon : x
     });
 }
 callBackInvitePeople(invitePeople){
   this.setState({ invitePeople })
 }
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
                       onClick={this.handleSubmit}
                     />,
                   ];


    return (<div>
      <div className="CreateTeamButton">
        <FlatButton
          icon={<IconEdit color="#FFFFFF"/>}
          onClick={this.handleClick}
          target="_blank"
          style={{color:"white",
            minWidth:"0px",
            margin:"0px",
            float:"right",
            marginRight:"2%",
            marginLeft:"2%",
                                      }}
          />

      </div>

      <Dialog
         title="Create you´re fabulous group!"
         actions={actions}
         modal={false}
         open={this.state.open}
         onRequestClose={this.handleClose}
         autoScrollBodyContent = {true}
       >
       <div>
         <EditTeamContent
           name={this.state.name}
           description={this.state.description}
           invitePeople={this.state.invitePeople}
           selectedIcon={this.state.selectedIcon}
           handleChangeN={this.handleChangeN}
           handleChangeD={this.handleChangeD}
           handleChangeI={this.handleChangeI}
           callBackInvitePeople={this.callBackInvitePeople}/>
       </div>
       </Dialog>
    </div>
    );
  }
}


        // {(this.props.isActive) ? this.props.main || <EditTeam /> :<div></div>
        // }