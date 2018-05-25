import React from 'react';
import PropTypes from 'prop-types';
import "./sidebars.css";
import config from '../../config';

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
    let myGroups = this.state.groups.map(group => (<a className="groupName">
      {group.name}
    </a>));
    console.log(myGroups);

    return (<div className="leftContent">
      <div style={styles.content}>
        <div className="divider"/>
        <a className="highlightSidebarContent" href="activity">PUBLIC</a>
        <div className="divider"/>
        <a className="highlightSidebarContent" href="activity">PERSONAL</a>
        <div className="divider"/>
        <p className="groups">
          Gruppen</p>
        {myGroups}
      </div>
    </div>);
  }
}
