import React, {Component} from "react";
import {Button, FormGroup, FormControl, ControlLabel, Alert} from "react-bootstrap";
import "./groupmanager.css";
import logo from '../../IMG/codex_logo1x.png';
import config from '../../config';

export default class CreateTeam extends React.Component {

    constructor(props) {
        super(props);

        this.inputName = this.inputName.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.validateForm = this.validateForm.bind(this);

        this.state = {
            name: "",
            showError: false
        }
    }
    validateForm() {
        return this.state.name.length > 0;
    }
    inputName(e) {
        this.setState({name: e.target.value});

        this.setState({
            showError: e.target.value === ""
        });
    }
    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }
    handleClick(e) {
        e.preventDefault();

        if (this.state.name !== "") {
            fetch(config.apiPath + "/team", {
                method: 'POST',
                body: JSON.stringify({Teamname: this.state.name}),
                headers: {
                    'Content-Type': 'application/json',
                    'X-Access-Token': localStorage.getItem('apiToken')
                }
            });
            console.log("Group '" + this.state.name + "' created.");
        } else {
            this.setState({showError: true});
        }
    }

    render() {
        return (<div className="Login">
            <div><img src={logo} className="img-responsive center-block" style={{
                width: "60%",
                margin: "auto",
                marginBottom: "0%"
            }} alt=""/></div>
            <form onSubmit={this.handleSubmit}>
                <FormGroup controlId="errorprompt" bsSize="large">
                    {this.errorPrompt}
                </FormGroup>
                <FormGroup controlId="name" bsSize="large">
                    <ControlLabel></ControlLabel>
                    <FormControl placeholder="Gruppenname" type="text" value={this.state.name} onChange={this.handleChange}/>
                </FormGroup>
                <Button bsStyle="primary" block="block" bsSize="large" disabled={!this.validateForm()} type="submit">
                    erstelle Gruppe
                </Button>
            </form>
        </div>);
    }
}