import React from "react";

import { Card, CardImg, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle, CardImgOverlay  } from 'reactstrap';
import CalendarFA from 'react-icons/lib/fa/calendar-check-o';
import ClockFA from 'react-icons/lib/fa/clock-o';
import BullseyeFA from 'react-icons/lib/fa/bullseye';
import config from "../../config.js";
import "./activity.css";
var readBlob = require('read-blob');
export default class ActivityItem extends React.Component {

  constructor(props) {
    super(props);
    this.state= {
      participates: []
      };
    }

componentDidMount(){
  this.loadParticipatesData();
  this.DateparserTime();
  this.DateparserDate();
}

DateparserDate() {
  var d = new Date(this.props.activity.Time);
  var month = new Array();
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
    var s = this.addZero(d.getSeconds());
    return h + ":" + m + ":" + s;
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
console.log(this.state.participates);
  });

}



  render() {
    let participatesIMG;
    if (this.state.participates.length != 0){
      participatesIMG = this.state.participates.map(participates => {
        console.log(this.state.participates);
        readBlob(this.state.participates.IMG, 'dataurl', function (err, dataurl) {
          if (err) throw err;

  console.log('that was simple!');
 let  imgsrc = dataurl;
});


        return (
          <img src="kl" />
        );
      });

}
    return (
      <div>
       <Card>
         <CardBody>
           <CardTitle>
            <div className="activity-host">
              <h4>{this.props.activity.Firstname + " " + this.props.activity.Name}</h4>
            </div>
            </CardTitle>

         </CardBody>
         <img src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
            <h2>{this.props.activity.Activityname}</h2>

           <CardText>
           <div className="activity-group">
              <div className="activity-date">
                <h2><CalendarFA />  {this.DateparserDate()} </h2>
              </div>
              <div className="activity-time">
                <h2><ClockFA />  {this.DateparserTime()} </h2>
              </div>
              <div className="activity-meetingpoint">
                <h2><BullseyeFA />  {this.props.activity.Place} </h2>
              </div>
            </div>
            <div className="activity-alreadyjoining">
              <h2>Already joining </h2>
                <h1> {participatesIMG}</h1>
              <div className="activity-userimg">
                <h1> {this.state.participates.User_Id}</h1>
              </div>
            </div>
           </CardText>

           <div className="activity-buttons">
           <button> share </button> <button> comment </button> <button> join </button>
           </div>

       </Card>
     </div>


  );
}
}
