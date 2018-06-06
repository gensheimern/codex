import React from "react";
import {
    Alert,Button,
    FormGroup,
    FormControl,
    ControlLabel
} from "react-bootstrap";
import "./groupmanager.css";
import config from '../../config';
import "./ListGroups.js";
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import InviteChip from '../event/CreateEventChip';
import InvitePeople from '../event/CreateEventInvitePeople';

import IconGroup from 'material-ui/svg-icons/social/group';


export default class CreateTeam extends React.Component {

        constructor(props) {
            super(props);

            this.inputName = this.inputName.bind(this);
            this.handleClick = this.handleClick.bind(this);
            this.validateForm = this.validateForm.bind(this);
            this.callBackInvitePeople = this.callBackInvitePeople.bind(this);


            this.state = {
                name: "",
                description:"",
                showError: false,
                errorPrompt: "",
                invitePeople: [],
                selectedIcon : {},
                icons : [],
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
        handleChangeN = event => {
            this.setState({
                name: event.target.value
            });
        }
        handleChangeD = event => {
            this.setState({
                description: event.target.value
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

        callBackInvitePeople(invitePeople){
          this.setState({ invitePeople })
        }

        render() {

          let iconSelect = <IconGroup/>

          let images = this.state.invitePeople.map((image,index) => {
            return(<InviteChip key={"chip" + index} name={image.textKey} peopleImage={image.ValueImage} />)
          });

                return(<div className = "CreateTeam">
                        <div>
                          <div style={{backgroundColor: "#4CAF50",
                                border: "none",
                                color: "white",
                                padding: "20px",
                                textAlign: "center",
                                textDecoration: "none",
                                display: "inline-block",
                                fontSize: "16px",
                                margin: "4px 2px",
                              borderRadius: "50%"}}>
                            {iconSelect}
                          </div>
                            <div>

                            </div>  //smallIcons
                        </div>
                					<TextField
                						floatingLabelFixed={true}
                						floatingLabelFocusStyle={{ color: 'rgb(30 161 133)' }}
                						underlineFocusStyle={{ borderColor: 'rgb(30 161 133)' }}
                						floatingLabelText="Name"
                						hintText="Nice Group Of PPL"
                            value={this.state.name}
                						onChange={this.handleChangeN}
                					/>
                					<br/>

                					<TextField
                            floatingLabelFixed={true}
                            floatingLabelFocusStyle={{ color: 'rgb(30 161 133)' }}
                            underlineFocusStyle={{ borderColor: 'rgb(30 161 133)' }}
                            floatingLabelText="Description"
                            hintText="a bunch of ppl that doesnt suck."
                            value={this.state.description}
                            onChange={this.handleChangeD}
                          />
                          <br/>

                          <InvitePeople people={this.callBackInvitePeople}/>
                            {images}

                          <br/>

                            <FlatButton
                              onClick={this.handleClick}
                              target="_blank"
                              style={{color:"white",
                                minWidth:"0px",
                                margin:"0px"}}
                            />

        </div>);
    }
}
