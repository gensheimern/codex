/*
 Author: Nico Gensheimer
*/


import "./activity.css";
import ActivityItem from "./ActivityItem";
import React from 'react';
import Sidebar from '../MenuComponents/Sidebar.js';
import SidebarContent from '../MenuComponents/sidebar_content';
import SidebarCalender from '../MenuComponents/SidebarContentCalender';
import {
    Button,
    ButtonGroup,Modal,Navbar,Nav,NavItem,MenuItem,NavDropdown
} from "react-bootstrap";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import config from '../../config';
import CreateActivity from '../activity/CreateActivity.js'

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
export default class Activity extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        activitys:[],
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

    this.renderPropCheckbox = this.renderPropCheckbox.bind(this);
    this.renderPropNumber = this.renderPropNumber.bind(this);
    this.onSetOpen = this.onSetOpen.bind(this);
    this.menuButtonClick = this.menuButtonClick.bind(this);
    this.loadContent = this.loadContent.bind(this);
    this.createGroupDeleteButtons = this.createGroupDeleteButtons.bind(this);
      this.SendTeamToDelete = this.SendTeamToDelete.bind(this);
      this.handleShow = this.handleShow.bind(this);
      this.handleClose = this.handleClose.bind(this);
      this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    this.loadActivityData();

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
    let Tid = this.state.groups[i].Team_Id;
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
  handleClose() {
  this.setState({ show: false });
  }

  handleShow() {
  this.setState({ show: true });
  }

  handleSelect(eventKey) {
  if(eventKey === 2){
  this.handleShow();
  }
  if(eventKey === 3){
  if(this.state.docked === false)
      this.setState({ docked: true });;
    if(this.state.docked === true)
      this.setState({ docked: false });;
  }
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

  loadActivityData() {
    fetch(config.apiPath + "/activity/", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': localStorage.getItem('apiToken')
      }
    }).then((resN) => {

      if (!resN.ok) {
        throw new Error("Request failed.");
      } else if (resN.status !== 200) {
        throw new Error("Forbidden");
      } else {
        return resN;
      }
    }).then(resN => resN.json()).then(resN => {


      this.setState({
        activitys: resN

      });

    });

  }

  render() {
    const sidebar = <SidebarContent/>;
        const sidebarCalender = <SidebarCalender/>;

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
    const sidebarProps2 = {
      sidebar: sidebarCalender,
      docked: true,
      sidebarClassName: 'custom-sidebar-class',
      open: this.state.open,
      touch: this.state.touch,
      shadow: this.state.shadow,
      pullRight: true,
      touchHandleWidth: this.state.touchHandleWidth,
      dragToggleDistance: this.state.dragToggleDistance,
      transitions:false,
      onSetOpen: this.onSetOpen,
    };
    let Item;
    if (this.state.activitys.length !== 0){
      Item = this.state.activitys.map(activity => {


        return (
          <ActivityItem key={activity.Activity_Id} activity={activity} />
        );

      });
    }else {
      Item = <p> loading.. </p>;
}
    return (      <Sidebar {...sidebarProps}>

              <div style={styles.content}>
                <React.Fragment>
                      <Modal show={this.state.show} onHide={this.handleClose}>
                          <Modal.Header closeButton>
                             <Modal.Title>Erstelle eine Aktivität</Modal.Title>
                           </Modal.Header>
                           <Modal.Body>
                              <CreateActivity/>
                           </Modal.Body>
                          <Modal.Footer>
                              <Button onClick={this.handleClose}>Close</Button>
                          </Modal.Footer>
                      </Modal>
                  <Navbar inverse fixedTop collapseOnSelect activekey="1" onSelect={k => this.handleSelect(k)}>
                  <Navbar.Header>
                    <Navbar.Brand>
                      <a href="#brand">CODEX</a>
                    </Navbar.Brand>
                    <Navbar.Toggle/>
                  </Navbar.Header>
                  <Navbar.Collapse>
                    <Nav>
                      <NavItem eventKey={1} href="/groupmanager">
                        Home
                      </NavItem>
                      <NavItem eventKey={2.1} href="/activity">
                        Aktivitäten
                      </NavItem>
                    <NavItem eventKey={2} href="">
                      Aktivität erstellen
                    </NavItem>
                    <NavItem eventKey={3} href="">
                      Gruppen
                    </NavItem>
                  </Nav>
                  <Nav pullRight>
                    <NavDropdown eventKey={3} title="Sidebar Options" id="basic-nav-dropdown">
                      <MenuItem eventKey={3.1}>{['open'].map(this.renderPropCheckbox)}</MenuItem>
                      <MenuItem eventKey={3.2}>{['docked'].map(this.renderPropCheckbox)}</MenuItem>
                      <MenuItem eventKey={3.3}>{['transitions'].map(this.renderPropCheckbox)}</MenuItem>
                      <MenuItem divider />
                      <MenuItem eventKey={3.3}>{['pullRight'].map(this.renderPropCheckbox)}</MenuItem>
                    </NavDropdown>
                    <NavItem eventKey={6} href="/logout">
                      Log Out
                    </NavItem>
                  </Nav>
                  </Navbar.Collapse>
                  </Navbar>

                  </React.Fragment>
              </div>
              <div className="Feed" >
            <Sidebar {...sidebarProps2}>
              <div style={{backgroundColor:"#D3D3D3"}}>
              {Item}
              </div>
            </Sidebar>
              </div>
          </Sidebar>
  );

}
}
