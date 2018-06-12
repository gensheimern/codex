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
import IconGroup from 'material-ui/svg-icons/social/group';

{/*
      The Component renders the customizable (for Team-Admin) Team-Information which each Team owns.
  */}
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
                  MemberCount:0
                };
    this.handleChangeN = this.handleChangeN.bind(this);
    this.handleChangeD = this.handleChangeD.bind(this);
    this.handleChangeI = this.handleChangeI.bind(this);
    this.callBackInvitePeople = this.callBackInvitePeople.bind(this);
    this.loadGroup = this.loadGroup.bind(this);
    this.loadTeamMembers = this.loadTeamMembers.bind(this);


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
async loadTeamMembers(id){
    let count = 0;
    let arrayOfMembers = fetch(config.apiPath + "/team/" + id + "/member", {
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
      res.map((member) => {
        count++;
      })
      console.log("begin");
      this.setState({MemberCount:count})

    })
    .catch((err) => {
      console.log('Request failed.');
    });
    let wow = await arrayOfMembers.json();
    console.log("end");
    return count;

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
    let MemberCount;
    if(this.props.filter.filterFeed === "PUBLIC"){
      selectedTeam = this.state;
    }else {
      console.log(this.state);
    this.state.groups.map((groups) => {if(groups.id === this.props.filter.filterFeed){
                                        return selectedTeam = groups;
                                      }else return "blub";
                                    });

     MemberCount = this.loadTeamMembers(selectedTeam.id);
    }


    return (<div style={{}}>
      <div style={{	height: "32px",
                    width: "273px",
                    color: "#4A4A4A",
                    fontFamily: "Trebuchet MS",
                    fontSize: "18px",
                    fontWeight: "bold",
                    lineHeight: "21px",
                    marginLeft:"5%",
                    marginTop:"2%"}}>
        <TextOrTextField
          value={selectedTeam.name}
          onChange={this.handleChangeN}
          isTextField={this.isAdmin}
          />
      </div>
      <span style={{float:"left",
                    margin:"0% 5% 3% 5%"}}>
        {<IconGroup/>}
        {MemberCount}
      </span>
      <div style={{	height: "32px",
                    width: "90%",
                    color: "#727272",
                    fontFamily: "Trebuchet MS",
                    fontSize: "14px",
                    lineHeight: "16px",
                    marginLeft:"5%",
                    }}>
        <TextOrTextField
          value={selectedTeam.description}
          onChange={this.handleChangeD}
          isTextField={this.isAdmin}
          />
      </div>
      <div style={{	boxSizing: "border-box",
                    margin:"2% 2% 2% 2%",
                    opacity:"0.2",
                    width: "100%",
                    border: "1px solid #727272",
                  }}/>
    </div>
    );
  }
}

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