import React from "react";
import {
		Button,
		Modal,Navbar,Nav,NavItem
} from "react-bootstrap";
import './navbar.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


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
		if(eventKey === 2){
			this.handleShow();
		}
		if(eventKey === 3){
			this.props.dockSidebar();
		}
	}

	render(){
		return (
			<React.Fragment>
				<Navbar inverse collapseOnSelect fixedTop activekey="1" onSelect={k => this.handleSelect(k)}>
					<Navbar.Header>
						<Navbar.Brand>
						<p>CODEX</p>
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
							<NavItem eventKey={6} href="/logout">
								Log Out
							</NavItem>
						</Nav>
					</Navbar.Collapse>
				</Navbar>

				<Modal show={this.state.show} onHide={this.handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Erstelle eine Aktivität</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<MuiThemeProvider>
				</MuiThemeProvider>
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={this.handleClose}>Close</Button>
					</Modal.Footer>
				</Modal>
			</React.Fragment>
		);
	}

}
