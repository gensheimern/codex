import React from "react";
import {
    Button,Alert,
    ButtonGroup,Popover,Tooltip,Modal,OverlayTrigger,Navbar,Nav,NavItem,MenuItem,NavDropdown,FormGroup,FormControl
} from "react-bootstrap";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import CreateActivity from '../activity/CreateActivity.js'
import config from '../../config';
import logo from '../../IMG/codex_logo1x.png';

export default class NavbarMenu extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
      };

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

  handleSelect(eventKey) {
if(eventKey == 2){
  this.handleShow();
}
}
  render(){
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
        </Navbar>
      </React.Fragment>
  )}

}