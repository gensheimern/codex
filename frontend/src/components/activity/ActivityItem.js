/*
 Author: Nico Gensheimer
*/
import React from "react";
import { Card,  CardText } from 'reactstrap';
import jwt_decode from 'jwt-decode';
import CalendarFA from 'react-icons/lib/fa/calendar-check-o';
import ClockFA from 'react-icons/lib/fa/clock-o';
import BullseyeFA from 'react-icons/lib/fa/bullseye';
import GroupFA from 'react-icons/lib/fa/group';
import config from "../../config.js";
import "./activity.css";

export default class ActivityItem extends React.Component {

  constructor(props) {
    super(props);
    this.state= {
      isJoined: false,
      participates: [],
      image:"",
      };
      this.leaveActivity = this.leaveActivity.bind(this);
      this.joinActvitiy = this.joinActivity.bind(this);
    }

componentWillMount(){
  this.loadParticipatesData();
  this.DateparserTime();
  this.DateparserDate();
}

componentDidUpdate(){


}

leaveActivity(){
    if(this.state.isJoined === false){
      console.log("isJoined = false aber ich wolle leave" + this.props.activity.User_Id);
    }else {
      console.log("isJoined = true");
    fetch(config.apiPath + "/participates/" + this.props.activity.Activity_Id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'X-Access-Token': localStorage.getItem('apiToken')
        }
    }).then((res) => {
        if(!res.ok) {
            if(res.status === 400){
            this.setState({isJoined:false});
          }else{
            throw new Error("Could not find Activity");
          }
        } else if(res.status !== 200) {
            throw new Error("Forbidden");
        }
        return res;
    }).then(res => res.json()).then((res) => {
        //console.log("Token: " + res.token)
        this.loadParticipatesData();
        this.setState({isJoined:false});


    });
  }
}

joinActivity() {
    console.log("clicked");

    if(this.state.isJoined === true){
      console.log("isJoined = true " + this.props.activity.User_Id);
    }else {
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
        if(!res.ok) {
            if(res.status === 400){
            this.setState({isJoined:true});
          }else{
            throw new Error("Could not find Activity");
          }
        } else if(res.status !== 200) {
            throw new Error("Forbidden");
        }
        return res;
    }).then(res => res.json()).then((res) => {
        //console.log("Token: " + res.token)
        this.loadParticipatesData();
        this.setState({isJoined:true});


    });
  }
}
/*
handleClick = event => {
    event.preventDefault();
    console.log("clicked");

    if(this.state.isJoined === true){
      console.log("isJoined = true " + this.props.activity.User_Id);
    }else {
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
        if(!res.ok) {
            if(res.status === 400){
            this.setState({isJoined:true});
          }else{
            throw new Error("Could not find Activity");
          }
        } else if(res.status !== 200) {
            throw new Error("Forbidden");
        }
        return res;
    }).then(res => res.json()).then((res) => {
        //console.log("Token: " + res.token)
        this.loadParticipatesData();
        this.setState({isJoined:true});


    });
  }
}
*/

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

  DateparserTime(){

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


loadParticipatesData(){
  fetch(config.apiPath + "/participates/"+ this.props.activity.Activity_Id, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'X-Access-Token': localStorage.getItem('apiToken')
    }
  }).then((resN) => {

    if (!resN.ok) {
      throw new Error("Request failed.");
    } else if (resN.status !== 200) {
      throw new Error("Forbidden");
    } else {
      return resN;

    }
  }).then(resN => resN.json()).then(resN => {

      this.setState({
      participates: resN
      });
    });
}




updateIsJoined(state, props){
  if(this.state.isJoined === true){
    return null;
  }
  return {
      isJoined : true
  }
}

getJoinLeaveButton(){
  if(this.state.isJoined ===false){
    return (
      <div className="text2"><button onClick={this.joinActivity.bind(this)}>JOIN </button></div>
    );
  }else {
    return (
      <div className="text2"><button onClick={this.leaveActivity.bind(this)}>LEAVE </button></div>
    );
  }
}

  render() {
    let decode = jwt_decode(localStorage.getItem('apiToken'));
    let participatesIMG;
    if (this.state.participates.length !== 0){
        participatesIMG = this.state.participates.map( participatesItem => {
          if(participatesItem.User_Id === decode.User_Id){
            this.setState(this.updateIsJoined);

          }
        return (
            <img className="myimage" src={participatesItem.Image} alt="profile" />
        );
      });
}

var isJoinedBorder = {};
if(this.state.isJoined === true){
  isJoinedBorder = {border:'1px solid #75a045',boxShadow: '0 0 40px #75a045'};
} else {
  isJoinedBorder = {border:'0px solid white',boxShadow: '0 0 0px white'};
}


    return (
      <div className="activity" style={isJoinedBorder}>
          <div className="image-container col-xs-12 col-sm-12 col-lg-12">
         <img className="image" src={this.props.activity.Banner} alt="Card cap" />
            <div className="after">
               <div className="text"> <span className="activityname">{this.props.activity.Activityname}</span>
                {this.getJoinLeaveButton()}
            </div></div>
         </div>
           <div className="card-body">
           <div className="activity-group col-xs-12 col-sm-12 col-lg-12">
              <div className="activity-date col-xs-6 col-sm-6 col-lg-6">
                <h4><CalendarFA />  {this.DateparserDate()} </h4>

                <h4><GroupFA /> Already joining </h4>

                  {participatesIMG}

              </div>
              <div className="activity-time col-xs-6 col-sm-6 col-lg-6">
                <h4><ClockFA />  {this.DateparserTime()} </h4>
              </div>
              <div className="activity-meetingpoint col-xs-6 col-sm-6 col-lg-6">
                <h4><BullseyeFA />  {this.props.activity.Place} </h4>
              </div>
            </div>
           </div>

     </div>


  );
}
}
