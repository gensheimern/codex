import React, {
    Component
} from "react";
import {
    Button,
    FormGroup,
    FormControl,
    ControlLabel,
    Alert
} from "react-bootstrap";
import "./Login.css";
import logo from '../../IMG/codex_logo1x.png';
import config from '../../config';

export default class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            errorPrompt: ""
        };
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
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
                Email: this.state.email,
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
                errorPrompt: (<Alert bsStyle = "warning"> <strong> Holy guacamole ! < /strong>
                  Best check yo self, youre not looking too good. </Alert>)
            });
        });
    }

    render() {
            return(<div className = "Login" > <div > <img src = {
            logo
        }
        className = "img-responsive center-block" style = {
            {
                width: "45%",
                margin: "auto",
                marginBottom: "20%"
            }
        }
        alt = "" / > < /div> <
                form onSubmit = {
                  this.handleSubmit
                } >
                <
                FormGroup controlId = "errorprompt"
                bsSize = "large" > {
                  this.state.errorPrompt
                } <
                /FormGroup > <FormGroup controlId = "email" bsSize = "large" > <ControlLabel > < /ControlLabel> <
                FormControl placeholder = "Email"
                autoFocus = "autoFocus"
                type = "text"
                value = {
                  this.state.email
                }
                onChange = {
                  this.handleChange
                }
                / > < /FormGroup> <
                FormGroup controlId = "password"
                bsSize = "large" >
                <
                ControlLabel > < /ControlLabel > <FormControl style = {
            {
                marginBottom: "11%"
            }
        }
        placeholder = "Password" value = {
            this.state.password
        }
        onChange = {
            this.handleChange
        }
        type = "password" / > < /FormGroup> <
                Button bsStyle = "primary"
                block = "block"
                bsSize = "large"
                disabled = {!this.validateForm()
                }
                type = "submit" >
                Login <
                /Button > < /form> <
                /div >);
    }
}