import React from "react";
import {Modal, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default class Login extends React.Component {

    componentDidMount() {
		if(typeof (Storage) !== "undefined") {
			localStorage.removeItem("apiToken");
		} else {
			// TODO Code without local storage
		}
	}

	render() {
		return (
			<div className="static-modal">
				<Modal.Dialog>
					<Modal.Header>
					<strong>Logout</strong>
					</Modal.Header>
					<Modal.Body>
						Logout successful!
					</Modal.Body>
					<Modal.Footer>
						<Link to="/">
							<Button bsStyle="primary">Login</Button>
						</Link>
					</Modal.Footer>
				</Modal.Dialog>
			</div>
		);
	}
}
