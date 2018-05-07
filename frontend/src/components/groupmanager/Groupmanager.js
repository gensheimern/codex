import React from 'react';
import Sidebar from '../MenuComponents/Sidebar.js';
import SidebarContent from '../MenuComponents/sidebar_content';
import SidebarCalender from '../MenuComponents/SidebarContentCalender';
import {
    Button,
    ButtonGroup
} from "react-bootstrap";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import CreateTeam from '../groupmanager/CreateTeam.js';
import config from '../../config';
import ListGroups from '../groupmanager/ListGroups.js'

import MediaQuery from 'react-responsive';
import NavbarMenu from "../MenuComponents/NavbarMenu.js";

const styles = {
  contentHeaderMenuLink: {
    textDecoration: 'none',
    color: 'white',
    padding: 8,
  },
  content: {
    padding: '16px',
  },
};

class Example extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      docked: false,
      open: false,
      transitions: true,
      touch: true,
      shadow: false,
      pullRight: false,
      touchHandleWidth: 20,
      dragToggleDistance: 30,
      groups: [],
      show: false,
      description: "",
      activityName: "",
      place: "",
      time: "",
      eventTag: false,
      host: ""
    };
this.displayControllerDockedSidebar = this.displayControllerDockedSidebar.bind(this);
    this.renderPropCheckbox = this.renderPropCheckbox.bind(this);
    this.renderPropNumber = this.renderPropNumber.bind(this);
    this.onSetOpen = this.onSetOpen.bind(this);
    this.menuButtonClick = this.menuButtonClick.bind(this);
    this.loadContent = this.loadContent.bind(this);
    this.createGroupDeleteButtons = this.createGroupDeleteButtons.bind(this);
      this.SendTeamToDelete = this.SendTeamToDelete.bind(this);;
  }

loadContent() {
fetch(config.apiPath + "/team", {
  headers: {
      'Content-Type': 'application/json',
      'X-Access-Token': localStorage.getItem('apiToken')
  }
}).then((res) => {
  if(!res.ok) {
      throw new Error("Request failed.");
  } else if(res.status !== 200) {
      throw new Error("Forbidden");
  } else {
      return res;
  }
}).then(res => res.json()).then(res => {
  this.setState({
      groups: res
  });
  let resNM = this.state.groups;
  for(let i = 0; i < this.state.groups.length; i++) {
      let TMNameR;
      TMNameR = this.state.groups[i].Firstname + " " + this.state.groups[i].Name;
      resNM[i].TMName = TMNameR;
  }
  this.createGroupDeleteButtons();
}).catch((err) => {
  this.setState({
      groups: [],
      errorPrompt:""
  });
});

}
createGroupDeleteButtons() {
for(let i = 0; i < this.state.groups.length; i++) {
  let Tid = this.state.groups[i].id;
  let resNM = this.state.groups;

  let theButtongroup
  theButtongroup = <ButtonGroup>
  <Button
    onClick = {
          () => this.SendTeamToDelete.bind(this)(Tid)
      } >
    <span className="glyphicon glyphicon-trash"></span> </Button> </ButtonGroup>

  // <button type="button" onClick={() => this.SendTeamToDelete.bind(this)(Tid)}>
  //   Delete the Group
  // </button>
  resNM[i].buttongroup = theButtongroup;

  this.setState({
      groups: resNM
  });
}}

displayControllerDockedSidebar() {
  if(this.state.docked === true){
    this.setState({docked:false});
  }else if(this.state.docked === false){
    this.setState({docked:true});
  }
}

SendTeamToDelete(Tid) {
fetch(config.apiPath + "/team/" + Tid, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json',
          'X-Access-Token': localStorage.getItem('apiToken')
      }
  }).then((resN) => {
      if(!resN.ok) {
          throw new Error("Request failed.");
      } else if(resN.status !== 200) {
          throw new Error("Forbidden");
      } else {
          return resN;
      }
  })
  .then(() => {
      this.loadContent();
  });
}
  onSetOpen(open) {
    this.setState({open: open});
  }

  menuButtonClick(ev) {
    ev.preventDefault();
    this.onSetOpen(!this.state.open);
  }

  renderPropCheckbox(prop) {
    const toggleMethod = (ev) => {
      const newState = {};
      newState[prop] = ev.target.checked;
      this.setState(newState);
    };

    return (
      <p key={prop}>
        <input type="checkbox" onChange={toggleMethod} checked={this.state[prop]} id={prop} />
        <label htmlFor={prop}> {prop}</label>
      </p>);
  }
  renderPropNumber(prop) {
    const setMethod = (ev) => {
      const newState = {};
      newState[prop] = parseInt(ev.target.value, 10);
      this.setState(newState);
    };

    return (
      <p key={prop}>
         {prop} <input type="number" onChange={setMethod} value={this.state[prop]} />
      </p>);
  }

  render() {
    const sidebar = <SidebarContent/>;

    const sidebarProps = {
      sidebar: sidebar,
      docked: this.state.docked,
      sidebarClassName: 'custom-sidebar-class',
      open: this.state.open,
      touch: this.state.touch,
      shadow: this.state.shadow,
      pullRight: this.state.pullRight,
      touchHandleWidth: this.state.touchHandleWidth,
      dragToggleDistance: this.state.dragToggleDistance,
      transitions: this.state.transitions,
      onSetOpen: this.onSetOpen,
    };


    return (     <Sidebar {...sidebarProps}>
                  <div style={styles.content}>
                    <React.Fragment>
                        <NavbarMenu dockSidebar={this.displayControllerDockedSidebar}/>
                      <MediaQuery minWidth={1000}>
                        {(matches) => {
                          if (matches) {
                            return <div className="groupdisplay">
                               <CreateTeam update={this.loadContent}/>
                                <ListGroups update = {this.loadContent} teams = {this.state.groups}/>
                              </div>
                      } else {
                        return <div className="groupdisplay">
                           <CreateTeam update={this.loadContent}/>
                           <ListGroups update = {this.loadContent} teams = {this.state.groups}/>
                         </div>
                      }
                    }}
                  </MediaQuery>
                      <div style={{backgroundColor:"#D3D3D3"}}>
                        <MediaQuery minWidth={1000}>
                          {(matches) => {
                            if (matches) {
                              return  <SidebarCalender/>
                        } else {
                          return <div></div>;
                        }
                      }}
                    </MediaQuery>
                  </div>
                </React.Fragment>
                </div>
              </Sidebar>

    );
  }
}

export default Example;