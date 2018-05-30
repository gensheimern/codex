import React from 'react';
import "./sidebars.css";
import config from '../../config';
import CreateTeamButton from './CreateTeamButton.js';

const styles = {
  sidebar: {
    width: 256,
    height: '100%'
  },
  sidebarLink: {
    display: 'block',
    padding: '16px 0px',
    color: '#ffffff',
    textDecoration: 'none'
  },
  content: {
    padding: '1px',
    height: '100%'
  }
};
export default class SidebarContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      groups: []
    };
    this.getMyGroups = this.getMyGroups.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
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

  render() {
    console.log(this.state.groups);
    let myGroups = this.state.groups.map((group,index) => (<a key={"group"+index} className="groupName">
      {group.name}
    </a>));
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
          float:"left"
          }}>
          GROUPS</p>
        <CreateTeamButton style={{float:"left",minHeight:"38px", width:"15%"}} changeContent={this.props.changeContent} closeDrawer={this.props.closeDrawer}/>
        <div className="groups">
                {myGroups}
        </div>
      </div>
    </div>);
  }
}
