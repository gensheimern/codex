import React from "react";
import {
    Button,
    FormGroup,
    FormControl,
    ControlLabel
} from "react-bootstrap";
import "./groupmanager.css";
import logo from '../../IMG/codex_logo1x.png';
import config from '../../config';
import "./ListGroups.js";

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
        componentDidUpdate(prevProps, prevState) {
            // only update chart if the data has changed
            //console.log('didpdate called');
            if(prevProps.data !== this.props.data) {
                this.chart = this.listTeams.load({
                    data: this.props.data
                });
            }
        }
        validateForm() {
            return this.state.name.length > 0;
        }
        inputName(e) {
            this.setState({
                name: e.target.value
            });

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

            if(this.state.name !== "") {
                fetch(config.apiPath + "/team ", {
                    method: 'POST',
                    body: JSON.stringify({
                        Teamname: this.state.name
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Access-Token': localStorage.getItem('apiToken')
                    }
                }).then(() => {
                    this.props.update();
                });
                console.log("Group '" + this.state.name + "' created.");
            } else {
                this.setState({
                    showError: true
                });
            }
        }

        render() {
                return(<div className = "CreateTeam"> <div>
                </div> <form onSubmit = {
                    this.handleClick
                } >
                <FormGroup controlId="errorprompt" bsSize="large">
                    {this.errorPrompt}
                </FormGroup>
                <FormGroup controlId="name" bsSize="large">
                    <ControlLabel></ControlLabel>
                    <FormControl placeholder="Gruppenname" type="text" value={this.state.name} onChange={this.handleChange}/>
                </FormGroup>
                <Button bsStyle="primary" block={true} bsSize="large" disabled={!this.validateForm()} type="submit">
                    erstelle Gruppe
                </Button>
            </form>
        </div>);
    }
}
