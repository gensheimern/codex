/*
 Author: Nico Gensheimer
*/
import React from "react";
import { Card } from 'reactstrap';
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
    this.state= {
      participates: [],
      image:"",
      lazyload: <div className="lazyload"> </div>
      };

    }

componentDidMount(){
  this.loadParticipatesData();
  this.DateparserTime();
  this.DateparserDate();

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


  render() {

    let participatesIMG;
    if (this.state.participates.length !== 0){
        participatesIMG = this.state.participates.map( participatesItem => {

        return (
            <img className="myimage" src={participatesItem.Image} alt="profile" />
        );
      });
}

    return (
      <MediaQuery minWidth={1000}>
        {(matches) => {
          if (matches) {
            return       <div className="activity">

                      <div className="image-container col-xs-12 col-sm-12 col-lg-12">
                     <img className="image" src={this.props.activity.Banner} alt="Card cap" />
                        <div className="after">
                           <div className="text"> <span className="activityname">{this.props.activity.Activityname}</span>
                            <div className="text2"><button>JOIN </button></div>
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

                 </div>;
          } else {
            return       <div className="activity">

                      <div className="image-container col-xs-12 col-sm-12 col-lg-12">
                     <img className="image" src={this.props.activity.Banner} alt="Card cap" />
                        <div className="after">
                           <div className="text"> <span className="activityname">{this.props.activity.Activityname}</span>
                            <div className="text2"><button>JOIN </button></div>
                        </div></div>
                     </div>
                       <div className="card-body">
                       <div className="activity-group col-xs-12 col-sm-12 col-lg-12">
                          <div className="activity-date col-xs-6 col-sm-6 col-lg-6">
                            <h4><CalendarFA />  {this.DateparserDate()} </h4>

                          </div>
                          <div className="activity-time col-xs-6 col-sm-6 col-lg-6">
                            <h4><ClockFA />  {this.DateparserTime()} </h4>
                          </div>
                          <div className="activity-meetingpoint col-xs-6 col-sm-6 col-lg-6">
                            <h4><BullseyeFA />  {this.props.activity.Place} </h4>
                          </div>
                        </div>
                       </div>

                 </div>;
          }
        }}
      </MediaQuery>
  );
}
}
