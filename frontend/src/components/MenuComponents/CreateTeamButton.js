import React from 'react';
import config from '../../config';

import FlatButton from 'material-ui/FlatButton';
import IconAdd from 'material-ui/svg-icons/content/add-circle';
import "./sidebars.css";
import Dialog from 'material-ui/Dialog';
import CreateGroupContent from '../groupmanager/CreateTeam.js';

import IconGroup from 'material-ui/svg-icons/social/group';

const defaultSelectedIcon = {
                        icon : <IconGroup style={{height:"100%",
                                                  width:"100% !important",}}/>
                            }

export default class CreateTeamButton extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false,
                  name: "",
                  errtextName:"",
                  description:"",
                  errTextDescription:"",
                  invitePeople: [],
                  selectedIcon : defaultSelectedIcon,};
    this.handleOpen = this.handleOpen.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateInput = this.validateInput.bind(this);

    this.handleChangeN = this.handleChangeN.bind(this);
    this.handleChangeD = this.handleChangeD.bind(this);
    this.handleChangeI = this.handleChangeI.bind(this);
    this.callBackInvitePeople = this.callBackInvitePeople.bind(this);


  }
  componentDidUpdate(prevProps) {
    if (this.props.errTextName !== prevProps.errTextName || this.props.errTextDescription !== prevProps.errTextDescription) {
      this.validateInput();
    }
  }

  validateInput(){
    if(this.props.errTextName === "" && this.props.errTextDescription === ""){
      return false
    } else {
      return true
    }
  }

  handleClick = () => {
  //  this.props.closeDrawer();
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

     console.log(this.state);

     if(this.state.name !== "") {
         fetch(config.apiPath + "/team ", {
             method: 'POST',
             body: JSON.stringify({
                 name: this.state.name,
                 Description: this.state.description,
                 Group_Icon : this.state.selectedIcon.icon,
             }),
             headers: {
                 'Content-Type': 'application/json',
                 'X-Access-Token': localStorage.getItem('apiToken')
             }
         }).then(() => {
           this.handleClose();
         }).catch((err) => {
             console.log("display error");

         });
     } else {
         this.setState({
             showError: true
         });
     }


     let emails = this.state.invitePeople.map((e) => {
   		return(e.ValueEmail + ",")
   	});
    console.log(emails);
   	fetch(config.apiPath + "/sendmail/joinevent", {
   		method: 'POST',
   		body: JSON.stringify({
   			email: emails,

   		}),
   		headers: {
   			'Content-Type': 'application/json',
   			'X-Access-Token': localStorage.getItem('apiToken'),
   		}
   	})
   	.then((res) => {
   		if (!res.ok || res.status !== 201) {
   			// handle error
   		} else {
   			this.renderSnackbar();
   			this.props.history.push('/feed');
   		}
   	});
 }

 handleChangeN = event => {
     this.setState({
         name: event.target.value
     });

     let xn = this.state.name;
     (xn.length > 30) ? this.setState({errtextName:"Too many characters for a name, max.30!"}) : this.setState({errtextName:""})
 }
 handleChangeD = event => {
     this.setState({
         description: event.target.value
     });
     let xd = this.state.description;
     (xd.length > 80) ? this.setState({errTextDescription:"Too many characters for a description, max.80!"}) : this.setState({errTextDescription:""})

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
                       disabled={(this.validateInput) ? true : false}
                       onClick={this.handleSubmit}
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
         autoScrollBodyContent = {true}
       >
       <div>
         <CreateGroupContent
           name={this.state.name}
           errTextName = {this.state.errtextName}
           description={this.state.description}
           errTextDescription = {this.state.errTextDescription}
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