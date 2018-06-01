import React from 'react';
import "./sidebars.css";
import config from '../../config';
import CreateTeamButton from './CreateTeamButton.js';
import FlatButton from 'material-ui/FlatButton';
import GroupSidebarButton from './GroupSidebarButton.js'

export default class SidebarContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      groups: [],
      activeIndex: null,
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
      console.log(res.status);
      if (!res.ok) {
        throw new Error("Request failed.");
      } else if (res.status !== 200) {
        throw new Error("Forbidden");
      } else {
        return res;
      }
    }).then(res => res.json()).then(res => {
      console.log(res);
      this.setState({groups: res});
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
  }

  render() {
    console.log(this.state.groups);
    let myGroups = this.state.groups.map((group,index) => (
      <GroupSidebarButton
         key={"group"+index}
         index={index}
         isActive={this.state.activeIndex===index}
         clickGroupButton={this.clickGroupButton}
         name={group.name}>
       </GroupSidebarButton>));

    console.log(myGroups);

    return (<div className="leftContent">
      <div>
        <p className="highlightSidebarContent" href="activity">PUBLIC</p>
        <div className="divider"/>
        <p className="highlightSidebarContent" href="activity">PERSONAL</p>
        <div className="divider"/>
        <p style={{
          textAlign: "left",
          color: "#ffffff",
          margin:"5%",
          float:"left",
          marginRight: "2%",
          marginTop:"7%"

          }}>
          GROUPS</p>
        <CreateTeamButton style={{float:"left",minHeight:"38px",minWidth:"0px", width:"15%"}} changeContent={this.props.changeContent} closeDrawer={this.props.closeDrawer}/>
        <div className="groups">
                {myGroups}
        </div>
      </div>
    </div>);
  }
}
