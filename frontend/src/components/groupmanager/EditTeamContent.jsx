import React from "react";

import "./groupmanager.css";
import TextField from 'material-ui/TextField';
import InviteChip from '../event/CreateEventChip';
import CreateTeamIconButton from './CreateTeamIconButton'
import InvitePeople from '../event/CreateEventInvitePeople';

import IconGroup from 'material-ui/svg-icons/social/group';
import IconAdd from 'material-ui/svg-icons/content/add-circle';
import IconProfile from 'material-ui/svg-icons/social/person';
import IconCalendar from 'material-ui/svg-icons/action/event';
import IconFeed from 'material-ui/svg-icons/action/assignment';

const iconsToSelect = [{
                        icon : <IconGroup style={{height:"100%",
                                                  width:"100% !important",}}/>
                      },
                      {
                        icon : <IconAdd style={{height:"100%",
                                                  width:"100% !important",}}/>
                      },
                      {
                        icon : <IconProfile style={{height:"100%",
                                                  width:"100% !important",}}/>
                      },
                      {
                        icon : <IconCalendar style={{height:"100%",
                                                  width:"100% !important",}}/>
                      },
                      {
                        icon : <IconFeed style={{height:"100%",
                                                  width:"100% !important",}}/>
                    },
                      {
                        icon : <IconGroup style={{height:"100%",
                                                  width:"100% !important",}}/>
                      },
                      {
                        icon : <IconAdd style={{height:"100%",
                                                  width:"100% !important",}}/>
                      },
                      {
                        icon : <IconAdd style={{height:"100%",
                                                  width:"100% !important",}}/>
                      },
                      {
                        icon : <IconProfile style={{height:"100%",
                                                  width:"100% !important",}}/>
                      },
                      {
                        icon : <IconCalendar style={{height:"100%",
                                                  width:"100% !important",}}/>
                      },
                      {
                        icon : <IconFeed style={{height:"100%",
                                                  width:"100% !important",}}/>
                    },
                      {
                        icon : <IconGroup style={{height:"100%",
                                                  width:"100% !important",}}/>
                      },
                      {
                        icon : <IconAdd style={{height:"100%",
                                                  width:"100% !important",}}/>
                      },
                      {
                        icon : <IconAdd style={{height:"100%",
                                                  width:"100% !important",}}/>
                      },
                      {
                        icon : <IconProfile style={{height:"100%",
                                                  width:"100% !important",}}/>
                      },
                      {
                        icon : <IconCalendar style={{height:"100%",
                                                  width:"100% !important",}}/>
                      },
                      {
                        icon : <IconFeed style={{height:"100%",
                                                  width:"100% !important",}}/>
                    },
                      {
                        icon : <IconGroup style={{height:"100%",
                                                  width:"100% !important",}}/>
                      },
                      {
                        icon : <IconAdd style={{height:"100%",
                                                  width:"100% !important",}}/>
                      },
                      {
                        icon : <IconAdd style={{height:"100%",
                                                  width:"100% !important",}}/>
                      },
                      {
                        icon : <IconProfile style={{height:"100%",
                                                  width:"100% !important",}}/>
                      },
                      {
                        icon : <IconCalendar style={{height:"100%",
                                                  width:"100% !important",}}/>
                      },
                      {
                        icon : <IconFeed style={{height:"100%",
                                                  width:"100% !important",}}/>
                    },
                      {
                        icon : <IconGroup style={{height:"100%",
                                                  width:"100% !important",}}/>
                      },
                      {
                        icon : <IconAdd style={{height:"100%",
                                                  width:"100% !important",}}/>
                      },
                      {
                        icon : <IconAdd style={{color:"white important",
                                                backgroundColor:"#F8C947"}}/>
                      },
                    ]

export default class EditTeamContent extends React.Component {

        constructor(props) {
            super(props);

            this.clickOnSelectedIcon = this.clickOnSelectedIcon.bind(this);



            this.state = {
                icons : iconsToSelect,
                activeIndex : "0",
            }
        }
        componentDidUpdate(prevProps, prevState) {
            // only update chart if the data has changed
            if(prevProps.data !== this.props.data) {
                this.chart = this.listTeams.load({
                    data: this.props.data
                });
            }
        }


        clickOnSelectedIcon(index,icon){
          this.setState({activeIndex:index});
          let x = this.state.icons[index];
          console.log(this.props.handleChangeI);
          this.props.handleChangeI(x);
        }

        render() {

          let iconsSelectDisplay = this.state.icons.map((icon,index) => {
            return (<CreateTeamIconButton
                                icon ={icon.icon}
                                index={index}
                                isActive={this.state.activeIndex===index}
                                handleClick=  {
                                  this.clickOnSelectedIcon.bind(this,index)
                                }
                    />
                )})

          let images = this.props.invitePeople.map((image,index) => {
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
                            {this.props.selectedIcon.icon}
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
                            value={this.props.name}
                						onChange={this.props.handleChangeN}
                            style={{marginTop :"5%",
                                    width:"100%",}}
                					/>
                					<br/>

                					<TextField
                            floatingLabelFixed={true}
                            floatingLabelFocusStyle={{ color: 'rgb(30 161 133)' }}
                            underlineFocusStyle={{ borderColor: 'rgb(30 161 133)' }}
                            floatingLabelText="Description"
                            hintText="a bunch of ppl that doesnt suck."
                            value={this.props.description}
                            onChange={this.props.handleChangeD}
                            style={{marginBottom :"3%",
                                    width:"100%",}}
                          />
                          <br/>

                          <InvitePeople people={this.props.callBackInvitePeople}/>
                            {images}
                          <br/>

        </div>);
    }
}
