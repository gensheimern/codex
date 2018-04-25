import React from "react";
import {
    Button,Alert,Grid,Row,Col,
    ButtonGroup,Popover,Tooltip,Modal,OverlayTrigger,Navbar,Nav,NavItem,MenuItem,NavDropdown,FormGroup,FormControl
} from "react-bootstrap";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import "./groupmanager.css";
import CreateTeam from './CreateTeam.js';
import NavbarMenu from '../MenuComponents/NavbarMenu.js';
import Sidebar from '../MenuComponents/Sidebar.js';
import config from '../../config';
import ListGroups from './ListGroups.js'
import logo from '../../IMG/codex_logo1x.png';
import CreateActivity from '../activity/CreateActivity.js'

export default class Groupmanager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            groups: [],
            show: false,
            description: "",
            activityName: "",
            place: "",
            time: "",
            eventTag: false,
            host: ""
        };

        this.loadContent = this.loadContent.bind(this);
          this.createGroupDeleteButtons = this.createGroupDeleteButtons.bind(this);
            this.SendTeamToDelete = this.SendTeamToDelete.bind(this);
            this.handleShow = this.handleShow.bind(this);
            this.handleClose = this.handleClose.bind(this);
            this.handleSelect = this.handleSelect.bind(this);}

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
            let TMid = this.state.groups[i].Teammanager;
            let Tid = this.state.groups[i].Team_Id;
            let resNM = this.state.groups;

            let theButtongroup
            theButtongroup = <ButtonGroup>
            <Button
              onClick = {
                    () => this.SendTeamToDelete.bind(this)(Tid)
                } >
              <span class="glyphicon glyphicon-trash"></span> </Button> <Button onClick = {
                () => this.SendTeamToDelete.bind(this)(Tid)
            } >
            Free Space </Button> </ButtonGroup >

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
  if(eventKey == 2){
    this.handleShow();
  }
  }

    render() {
      const popover = (
  <Popover id="modal-popover" title="popover">
    very popover. such engagement
  </Popover>);
    const tooltip = <Tooltip id="modal-tooltip">wow.</Tooltip>;

        return(  <React.Fragment>
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
            <NavItem eventKey={2} href="">
              Aktivität erstellen
            </NavItem>
            <NavDropdown eventKey={3} title="Gruppen" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>Action</MenuItem>
              <MenuItem eventKey={3.2}>Another action</MenuItem>
              <MenuItem eventKey={3.3}>Something else here</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.3}>Separated link</MenuItem>
            </NavDropdown>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={5} href="#">
              Link Right
            </NavItem>
            <NavItem eventKey={6} href="/logout">
              Log Out
            </NavItem>
          </Nav>
          </Navbar.Collapse>
          </Navbar>
                <CreateTeam update={this.loadContent}/>
                <ListGroups update = {this.loadContent} teams = {this.state.groups}/>

          </React.Fragment>)
    }
}