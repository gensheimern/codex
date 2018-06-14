import React from "react";
import "./groupmanager.css";
import config from '../../config';
import TextOrTextField from '../tools/TextOrTextField';
import IconGroup from 'material-ui/svg-icons/social/group';
import LoadingAnimation from '../tools/LoadingAnimation';


/*
      The Component renders the customizable (for Team-Admin) Team-Information which each Team owns.
  */
export default class GroupInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {isAdmin : "",
                  name: "",
                  description:"",
                  invitePeople: [],
                  selectedIcon : "",
                  MemberCount:0,
                  loading: false,
                  team:{},
                  groups:[],
                };
    this.handleChangeN = this.handleChangeN.bind(this);
    this.handleChangeD = this.handleChangeD.bind(this);
    this.handleChangeI = this.handleChangeI.bind(this);
    this.callBackInvitePeople = this.callBackInvitePeople.bind(this);
    this.loadGroup = this.loadGroup.bind(this);
    this.loadTeamMembers = this.loadTeamMembers.bind(this);


  }
  componentDidMount() {

  }
  shouldComponentUpdate(nextProps, nextState) {
      return nextProps.filter !== this.props.filter ;
    }

loadGroup(x){
  this.setState({
    loading: true,
  });

    if(x === "PUBLIC"){
      this.setState({
                      isAdmin : false,
                      team:{name: "PUBLIC",description:"Welcome into the PUBLIC Channel of VSF Experts! You can find all your colleagues here.",},
                        loading: false,


      });
    } else {

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
      (this.state.groups === null) ? console.log("wow") :
      this.state.groups.map((groups) => {if(groups.id === this.props.filter.filterFeed){
                                              return this.setState({team : groups});
                                            }else return "blub";
                                          });
      this.loadTeamMembers(this.state.team.id);
    }
    ).catch((err) => {
      console.log('Request failed.');
    });
  }
}

loadTeamMembers(id){
    let count = 0;
    fetch(config.apiPath + "/team/" + id + "/member", {
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
        return count++;
      })
      this.setState({MemberCount:count})
      this.setState({
        loading: false,
      });

    })
    .catch((err) => {
      console.log('Request failed.');
    });
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
    this.loadGroup(this.props.filter.filterFeed);

    if (this.state.loading) {
      return <LoadingAnimation/>
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
          value={this.state.team.name}
          onChange={this.handleChangeN}
          isTextField={this.isAdmin}
          />
      </div>
      <span style={{float:"left",
                    margin:"0% 5% 3% 5%"}}>
        {<IconGroup/>}
        {this.state.MemberCount}
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
          value={this.state.team.description}
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