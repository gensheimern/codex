import React, {Component} from "react";
import {Button, FormGroup, FormControl, ControlLabel, Alert} from "react-bootstrap";
import "./Login.css";
import logo from '../../IMG/codex_logo1x.png';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      showErrorPrompt: false,
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
    {{

      // TODO fetch(login...)
      let loggedIn = this.state.email === "support@codex-team.de" && this.state.password === "password";

      if (loggedIn) {
        this.props.history.push("/create_group");
      } else {
        this.setState({showErrorPrompt: true});
      }
    }

    if (this.state.showErrorPrompt) {
      this.errorPrompt = (<Alert bsStyle="warning">
  <strong>Holy guacamole!</strong> Best check yo self, you're not looking too
  good.
</Alert>);
    }
  }}

    render() {
      return (<div className="Login">
        <div><img src={logo} className="img-responsive center-block" style={{
          width: "60%",
          margin: "auto",
          marginBottom: "20%"
        }}/></div>
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="errorprompt" bsSize="large">
            {this.errorPrompt}
          </FormGroup>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel></ControlLabel>
            <FormControl placeholder="Email" autoFocus="autoFocus" type="email" value={this.state.email} onChange={this.handleChange}/>
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel></ControlLabel>
            <FormControl style={{
                marginBottom: "11%"
              }} placeholder="Pasword" value={this.state.password} onChange={this.handleChange} type="password"/>
          </FormGroup>
          <Button bsStyle="primary" block="block" bsSize="large" disabled={!this.validateForm()} type="submit">
            Login
          </Button>
        </form>
      </div>);
    }
  }
