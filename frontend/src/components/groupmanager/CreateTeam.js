import React from "react";
import {
    Alert,Button,
    FormGroup,
    FormControl,
    ControlLabel
} from "react-bootstrap";
import FlatButton from 'material-ui/FlatButton';
import "./groupmanager.css";
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
                showError: false,
                errorPrompt: "",
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
                        name: this.state.name
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Access-Token': localStorage.getItem('apiToken')
                    }
                }).then(() => {
                    this.props.update();
                }).catch((err) => {
                    console.log("display eror");
                    this.setState({
                        errorPrompt: (<Alert bsStyle = "warning"> <strong> Holy guacamole ! </strong>
                          Best check yo self, youre not looking too good. </Alert>)
                    });
                });
            } else {
                this.setState({
                    showError: true
                });
            }
        }

        render() {

                return(<div className = "CreateTeam">
                 <form onSubmit = {
                    this.handleClick
                } >
                <FormGroup controlId="errorprompt" bsSize="large">
                    {this.errorPrompt}
                </FormGroup>
                <FormGroup controlId="name" bsSize="large">
                    <ControlLabel></ControlLabel>
                    <FormControl placeholder="Gruppenname" type="text" value={this.state.name} onChange={this.handleChange}/>
                </FormGroup>
                <Button id="erstelleGruppeBtn" bsStyle="primary" block={true} bsSize="large" disabled={!this.validateForm()} type="submit">
                    erstelle Gruppe
                </Button>
            </form>
        </div>);
    }
}
