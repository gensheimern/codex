import React from "react";

import "./groupmanager.css";
import FlatButton from 'material-ui/FlatButton';
import config from '../../config';
import TextField from 'material-ui/TextField';
import InviteChip from '../event/CreateEventChip';
import CreateTeamIconButton from './CreateTeamIconButton'
import InvitePeople from '../event/CreateEventInvitePeople';
import IconEdit from 'material-ui/svg-icons/image/edit';
import TextOrTextField from '../tools/TextOrTextField';

export default class GroupInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {isAdmin : "",
                  name: "",
                  description:"",
                  invitePeople: [],
                  selectedIcon : "",
                  groups:[],
                  team:{},
                };
    this.handleChangeN = this.handleChangeN.bind(this);
    this.handleChangeD = this.handleChangeD.bind(this);
    this.handleChangeI = this.handleChangeI.bind(this);
    this.callBackInvitePeople = this.callBackInvitePeople.bind(this);
    this.loadGroup = this.loadGroup.bind(this);


  }
  componentDidMount() {
    this.loadGroup(this.props.filter.filterFeed);
  }

  loadGroup(x){
    if(x === "PUBLIC"){
      this.setState({
                      isAdmin : false,
                      name: "PUBLIC",
                      description:"Welcome into the PUBLIC Channel of VSF Experts! You can find all your colleagues here.",
      });
    }

    fetch(config.apiPath + "/team", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': localStorage.getItem('apiToken')
      }
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Request failed.");
      } else if (res.status !== 200) {
        throw new Error("Forbidden");
      } else {
        return res;
      }
    }).then(res => res.json()).then(res => {
      this.setState({groups: res});
    })
    .catch((err) => {
      console.log('Request failed.');
    });

}

  handleClick = () => {
    this.handleOpen();
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
    let selectedTeam;
    console.log("kappa");
    console.log(this.state.groups);
    if(this.props.filter.filterFeed === "PERSONAL"){
          selectedTeam={name: this.state.name, description:this.state.description}
    }else {
      selectedTeam= this.state.groups.map((groups) => {if(groups.id === this.props.filter.filterFeed)
                                                          return (groups)
                                                      });

    }
    console.log(selectedTeam);


    return (<div>

      <TextOrTextField
        value={selectedTeam.name}
        onChange={this.handleChangeN}
        isTextField={this.isAdmin}
        />
      <TextOrTextField
        value={selectedTeam.description}
        onChange={this.handleChangeD}
        isTextField={this.isAdmin}
        />




    </div>
    );
  }
}


        // {(this.props.isActive) ? this.props.main || <EditTeam /> :<div></div>
        // }











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



