import React from "react";
import {
    Button,Alert,
    ButtonGroup,Popover,Tooltip,Modal,OverlayTrigger,Navbar,Nav,NavItem,MenuItem,NavDropdown,FormGroup,FormControl
} from "react-bootstrap";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import "./groupmanager.css";
import CreateTeam from './CreateTeam.js'
import config from '../../config';
import ListGroups from './ListGroups.js'
import logo from '../../IMG/codex_logo1x.png';

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
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSelect = this.handleSelect.bind(this);

    }
    handleClose() {
  this.setState({ show: false });
}

handleShow() {
  this.setState({ show: true });
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
            let TMid = this.state.groups[i].Teammanager;
            let Tid = this.state.groups[i].Team_Id;
            let resNM = this.state.groups;

            let theButtongroup
            theButtongroup = <ButtonGroup>
            <Button onClick = {
                    () => this.SendTeamToDelete.bind(this)(Tid)
                } >
                Delete the Group </Button> <Button onClick = {
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

    handleSelect(eventKey) {
  if(eventKey == 2){
    this.handleShow();
  }
 }
 validateForm() {
     return this.state.activityName.length > 0 && this.state.password.length > 0;
 }

 handleChange = event => {
     this.setState({
         [event.target.id]: event.target.value
     });
 }

 handleSubmit = event => {
     event.preventDefault();

     fetch(config.apiPath + "/authenticate", {
         method: 'POST',
         body: JSON.stringify({
             activityName: this.state.activityName,
             Password: this.state.password
         }),
         headers: {
             'Content-Type': 'application/json'
         }
     }).then((res) => {
         if(!res.ok) {
             throw new Error("Invalid Password");
         } else if(res.status !== 200) {
             throw new Error("Forbidden");
         }
         return res;
     }).then(res => res.json()).then((res) => {
         //console.log("Token: " + res.token)

         if(typeof (Storage) !== "undefined") {
             localStorage.setItem("apiToken", res.token);
         } else {
             // TODO Code without local storage
         }

         this.props.history.push("/groupmanager");
     }).catch((err) => {
         this.setState({
             errorPrompt: (<Alert bsStyle = "warning"> <strong> Holy guacamole ! </strong>
               Best check yo self, youre not looking too good. </Alert>)
         });
     });
 }


    render() {
      const popover = (
  <Popover id="modal-popover" title="popover">
    very popover. such engagement
  </Popover>);
    const tooltip = <Tooltip id="modal-tooltip">wow.</Tooltip>;

        return(<React.Fragment>
          <Modal show={this.state.show} onHide={this.handleClose}>
                   <Modal.Header closeButton>
                     <Modal.Title>Erstelle eine Aktivität</Modal.Title>
                   </Modal.Header>
                   <Modal.Body>
                     <form onSubmit={this.handleSubmit}>
               			<FormGroup controlId="errorprompt" bsSize="large">
               			  {this.state.errorPrompt}
               			</FormGroup>
               			<FormGroup controlId="activityName" bsSize="large">
               			  <FormControl id="activityName" placeholder="activityName" autoFocus="autoFocus" type="text" value={this.state.activityName} onChange={this.handleChange}/>
               			</FormGroup>
                    <FormGroup controlId="description" bsSize="large">
               			  <FormControl id="description" placeholder="description" autoFocus="autoFocus" type="text" value={this.state.description} onChange={this.handleChange}/>
               			</FormGroup>
                  <FormGroup controlId="place" bsSize="large">
                    <FormControl id="place" placeholder="place" autoFocus="autoFocus" type="text" value={this.state.place} onChange={this.handleChange}/>
                  </FormGroup>
                <FormGroup controlId="time" bsSize="large">
                  <FormControl id="time" placeholder="time" autoFocus="autoFocus" type="text" value={this.state.time} onChange={this.handleChange}/>
                </FormGroup>
              <FormGroup controlId="eventTag" bsSize="large">
                <FormControl id="eventTag" placeholder="eventTag" autoFocus="autoFocus" type="text" value={this.state.eventTag} onChange={this.handleChange}/>
              </FormGroup>
            <FormGroup controlId="host" bsSize="large">
              <FormControl id="host" placeholder="host" autoFocus="autoFocus" type="text" value={this.state.host} onChange={this.handleChange}/>
            </FormGroup>
               			<Button id="createBtn" bsStyle="primary" block bsSize="large" disabled={!this.validateForm()} type="submit">
               			  erstellen
               			</Button>
               		  </form>
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
    <Navbar.Toggle />
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
</Navbar>;
              <CreateTeam update={this.loadContent}/>
              <ListGroups update = {this.loadContent} teams = {this.state.groups}/>
          </React.Fragment>)
    }
}