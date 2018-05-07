/*
 Author: Nico Gensheimer
*/
import React from "react";
import {
    Card,
    CardText
} from 'reactstrap';
import jwt_decode from 'jwt-decode';
import CalendarFA from 'react-icons/lib/fa/calendar-check-o';
import ClockFA from 'react-icons/lib/fa/clock-o';
import BullseyeFA from 'react-icons/lib/fa/bullseye';
import GroupFA from 'react-icons/lib/fa/group';
import MediaQuery from 'react-responsive';
import config from "../../config.js";
import "./activity.css";

export default class ActivityItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isJoined: false, //Defines if the User who´s logged in joined the Event
            participates: []//Array of participates

        };
        this.leaveActivity = this.leaveActivity.bind(this);
        this.joinActvitiy = this.joinActivity.bind(this);
    }

/*
This Method fires right before the Component gets rendered.
The participates Array gets filled by fetching Data in loadParticipatesData().
Date and Time which comes through props getting parsed.
*/
    componentWillMount() {
        this.loadParticipatesData();
        this.DateparserTime();
        this.DateparserDate();
    }

/*
This Method gets fired if someone Clicks on the "Leave Button" at the Activity.
It sends a Delete request at the Backend and refresh the isJoined state.
*/
    leaveActivity() {
        if (this.state.isJoined === false) {
            console.log("isJoined = false aber ich wolle leave" + this.props.activity.User_Id);
        } else {
            console.log("isJoined = true");
            fetch(config.apiPath + "/participates/" + this.props.activity.Activity_Id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Access-Token': localStorage.getItem('apiToken')
                }
            }).then((res) => {
              //hier sollten noch einige error codes erstellt werden (auch im Backend)
                if (!res.ok) {
                    if (res.status === 400) {
                        this.setState({
                            isJoined: false
                        });
                    } else {
                        throw new Error("Could not find Activity");
                    }
                } else if (res.status !== 200) {
                    throw new Error("Forbidden");
                }
                return res;
            }).then(res => res.json()).then((res) => {

                //reloading Participates to display them dynamicly
                this.loadParticipatesData();
                this.setState({
                    isJoined: false
                });


            });
        }
    }

    /*
    This Method gets fired if someone Clicks on the "JOIN Button" at the Activity.
    It sends a POST request at the Backend and refresh the isJoined state.
    */

    joinActivity() {
        console.log("clicked");

        if (this.state.isJoined === true) {
            console.log("isJoined = true " + this.props.activity.User_Id);
        } else {
            console.log("isJoined = false");
            fetch(config.apiPath + "/participates", {
                method: 'POST',
                body: JSON.stringify({
                    Activity_Id: this.props.activity.Activity_Id
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'X-Access-Token': localStorage.getItem('apiToken')
                }
            }).then((res) => {
              //hier sollten noch einige error codes erstellt werden (auch im Backend)
                if (!res.ok) {
                    if (res.status === 400) {
                        this.setState({
                            isJoined: true
                        });
                    } else {
                        throw new Error("Could not find Activity");
                    }
                } else if (res.status !== 200) {
                    throw new Error("Forbidden");
                }
                return res;
            }).then(res => res.json()).then((res) => {
                  //reloading Participates to display them dynamicly
                this.loadParticipatesData();
                this.setState({
                    isJoined: true
                });


            });
        }
    }

    DateparserDate() {
        var d = new Date(this.props.activity.Time);
        var month = [];
        month[0] = "January";
        month[1] = "February";
        month[2] = "March";
        month[3] = "April";
        month[4] = "May";
        month[5] = "June";
        month[6] = "July";
        month[7] = "August";
        month[8] = "September";
        month[9] = "October";
        month[10] = "November";
        month[11] = "December";
        return d.getDay() + " " + month[d.getMonth()];
    }

    DateparserTime() {

        var d = new Date(this.props.activity.Time);
        var h = this.addZero(d.getHours());
        var m = this.addZero(d.getMinutes());

        return h + ":" + m;
    }

    addZero(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }


    /*
    This Method gets fired when the component will render and if the User
    clicks on JOIN or LEAVE Button.
    It sends a GET request at the Backend and fills the participates array.
    */

    loadParticipatesData() {
        fetch(config.apiPath + "/participates/" + this.props.activity.Activity_Id, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'X-Access-Token': localStorage.getItem('apiToken')
            }
        }).then((resN) => {
          //hier sollten noch einige error codes erstellt werden (auch im Backend)
            if (!resN.ok) {
                throw new Error("Request failed.");
            } else if (resN.status !== 200) {
                throw new Error("Forbidden");
            } else {
                return resN;

            }
        }).then(resN => resN.json()).then(resN => {
              //reloading Participates to display them dynamicly
            this.setState({
                participates: resN
            });
        });
    }

    //Returns either the Leave Button or the Join Button the the render method
    getJoinLeaveButton() {
        if (this.state.isJoined === false) {
            return ( <
                div className = "text2" > < button onClick = {
                    this.joinActivity.bind(this)
                } > JOIN < /button></div >
            );
        } else {
            return ( <
                div className = "text2" > < button onClick = {
                    this.leaveActivity.bind(this)
                } > LEAVE < /button></div >
            );
        }
    }

    render() {
        //Decoding the JWT Webtoken to get the User_Id of the User who´s logged in
        let decode = jwt_decode(localStorage.getItem('apiToken'));
        let participatesIMG;
        if (this.state.participates.length !== 0) {
          //Mapping trough the participates array and returning the profile picture
            participatesIMG = this.state.participates.map(participatesItem => {
                return ( <
                    img className = "myimage"
                    src = {
                        participatesItem.Image
                    }
                    alt = "profile" / >
                );
            });
        }
        // Styling the Activity with a border if the User who is logged in has joined
        var isJoinedBorder = {};
        if (this.state.isJoined === true) {
            isJoinedBorder = {
                border: '1px solid #75a045',
                boxShadow: '0 0 40px #75a045'
            };
        } else {
            isJoinedBorder = {
                border: '0px solid white',
                boxShadow: '0 0 0px white'
            };
        }

}
}
