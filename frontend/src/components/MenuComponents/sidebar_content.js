import React from 'react';
import "./sidebars.css";
import config from '../../config';
import CreateTeamButton from './CreateTeamButton.js';
import GroupSidebarButton from './GroupSidebarButton.js'
import { Link } from 'react-router-dom';

export default class SidebarContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      groups: [],
      activeIndex: "PUBLIC",
    };
    this.getMyGroups = this.getMyGroups.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.clickGroupName = this.clickGroupName.bind(this);
    this.clickGroupButton = this.clickGroupButton.bind(this);
  }

  getMyGroups() {
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
  componentDidMount() {
    this.getMyGroups();
  }

  clickGroupName(groupId){

    console.log(groupId);
    console.log(this.props.searchFilterFeed)
    this.props.searchFilterFeed(groupId,"FilterGroup");

  }

  clickGroupButton(index){

    console.log(index);
    this.setState({activeIndex:index});
    if(index === "PUBLIC"){
    this.props.searchFilterFeed("PUBLIC","FilterFeed");}
    if(index === "PERSONAL"){
    this.props.searchFilterFeed("PERSONAL","FilterFeed");}

  }

  render() {
    let myGroups = this.state.groups.map((group,index) => (
      <GroupSidebarButton
         key={"group"+index}
         index={index}
         isActive={this.state.activeIndex===index}
         clickGroupButton={this.clickGroupButton}
         name={group.name}
         main={false}>
       </GroupSidebarButton>));

    return (<div className="leftContent">
      <div>
          <GroupSidebarButton
             key={"group PUBLIC"}
             index={"PUBLIC"}
             isActive={this.state.activeIndex==="PUBLIC"}
             clickGroupButton={this.clickGroupButton}
             name={"PUBLIC"}
             main={true}>
           </GroupSidebarButton>
        <div className="divider"/>
          <GroupSidebarButton
             key={"group PERSONAL"}
             index={"PERSONAL"}
             isActive={this.state.activeIndex==="PERSONAL"}
             clickGroupButton={this.clickGroupButton}
             name={"PERSONAL"}
             main={true}>
           </GroupSidebarButton>
        <div className="divider"/>
        <div style={{width:"100%"}}>
          <p style={{
          textAlign: "left",
          color: "#ffffff",
          margin:"5%",
          float:"left",
          marginLeft: "10%",
          marginRight: "2%",
          marginTop:"3%"
          }}>
          GROUPS</p>
            <CreateTeamButton
              style={{
                float:"none",
                marginRight:"30%",
                minHeight:"38px",
                minWidth:"0px",
                width:"21%"
              }}
              changeContent={this.props.changeContent}
              closeDrawer={this.props.closeDrawer}
            />
          <div className="groups">
                {myGroups}
              </div>
        </div>
      </div>
    </div>);
  }
}
