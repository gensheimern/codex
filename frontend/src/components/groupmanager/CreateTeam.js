import React from "react";

import "./groupmanager.css";
import config from '../../config';
import "./ListGroups.js";
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import InviteChip from '../event/CreateEventChip';
import CreateTeamIconButton from './CreateTeamIconButton'
import InvitePeople from '../event/CreateEventInvitePeople';

import IconGroup from 'material-ui/svg-icons/social/group';
import IconAdd from 'material-ui/svg-icons/content/add-circle';
import IconProfile from 'material-ui/svg-icons/social/person';
import IconCalendar from 'material-ui/svg-icons/action/event';
import IconFeed from 'material-ui/svg-icons/action/assignment';

const iconsToSelect = [{
                        icon : <IconGroup/>
                      },
                      {
                        icon : <IconAdd/>
                      },
                      {
                        icon : <IconProfile/>
                      },
                      {
                        icon : <IconCalendar/>
                      },
                      {
                        icon : <IconFeed/>
                    },
                      {
                        icon : <IconGroup/>
                      },
                      {
                        icon : <IconAdd/>
                      },
                      {
                        icon : <IconProfile/>
                      },
                      {
                        icon : <IconCalendar/>
                      },
                      {
                        icon : <IconGroup/>
                      },
                      {
                        icon : <IconAdd/>
                      },
                      {
                        icon : <IconProfile/>
                      },
                      {
                        icon : <IconCalendar/>
                      },
                      {
                        icon : <IconGroup/>
                      },
                      {
                        icon : <IconAdd/>
                      },
                      {
                        icon : <IconProfile/>
                      },
                      {
                        icon : <IconCalendar/>
                      },
                      {
                        icon : <IconGroup/>
                      },
                      {
                        icon : <IconAdd/>
                      },
                      {
                        icon : <IconProfile/>
                      },
                      {
                        icon : <IconCalendar/>
                      },
                      {
                        icon : <IconGroup/>
                      },
                      {
                        icon : <IconAdd/>
                      },
                      {
                        icon : <IconProfile/>
                      },
                      {
                        icon : <IconCalendar/>
                      },
                      {
                        icon : <IconAdd style={{color:"white important",
                                                backgroundColor:"#F8C947"}}/>
                      },



]

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
                icons : iconsToSelect,
                activeIndex : "0",
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

                });
            } else {
                this.setState({
                    showError: true
                });
            }
        }

        clickOnSelectedIcon(index,icon){
          console.log(this.state.activeIndex);
          this.setState({activeIndex:index});
          let x = this.state.icons[index];
          console.log(x);
          this.setState({selectedIcon:x.icon});


        }

        callBackInvitePeople(invitePeople){
          this.setState({ invitePeople })
        }

        render() {

          let iconSelect = <IconGroup style={{height:"100%",
                                              width:"100% !important",}}/>

          let iconsSelectDisplay = this.state.icons.map((icon,index) => {
            return (<CreateTeamIconButton
                                icon ={icon.icon}
                                index={index}
                                key={"icon" + index}
                                isActive={this.state.activeIndex===index}
                                handleClick=  {
                                  this.clickOnSelectedIcon.bind(this,index)
                                }
                    />
                )})

          let images = this.state.invitePeople.map((image,index) => {
            return(<InviteChip key={"chip" + index} name={image.textKey} peopleImage={image.ValueImage} />)
          });

                return(<div className = "CreateTeam">
                        <div>
                          <div style={{
                                border: "none",
                                color: "white",
                                padding: "5px",
                                textAlign: "center",
                                textDecoration: "none",
                                display: "inline-block",
                                fontSize: "16px",
                                margin: "5px 10px",
                                borderRadius: "50%",
                                float: "left",
	                              height: "76px  ",
  	                            width: "76px",
  	                            backgroundColor: "#1EA185"}}>
                            {iconSelect}
                          </div>
                            <div>
                              { iconsSelectDisplay }
                            </div>
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
