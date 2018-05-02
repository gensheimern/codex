import React from "react";
import { Card,  CardText } from 'reactstrap';
import CalendarFA from 'react-icons/lib/fa/calendar-check-o';
import ClockFA from 'react-icons/lib/fa/clock-o';
import BullseyeFA from 'react-icons/lib/fa/bullseye';
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
						<img key={participatesItem.User_Id} className="myimage" src={participatesItem.Image} alt="profile" />
				);
			});
}

		return (
			<div>
			 <Card>
					<div className="image-container">
				 <img className="image" src={this.props.activity.Banner} alt="Card cap" />
						<div className="after">
							 <div className="text">{this.props.activity.Activityname}
								<div className="text2"><button>JOIN </button></div>
						</div></div>
				 </div>
					 <CardText>
					 <span className="activity-group">
							<span className="activity-date">
								<span><CalendarFA />  {this.DateparserDate()} </span>
							</span>
							<span className="activity-time">
								<span><ClockFA />  {this.DateparserTime()} </span>
							</span>
							<span className="activity-meetingpoint">
								<span><BullseyeFA />  {this.props.activity.Place} </span>
							</span>
						</span>
						<span className="activity-alreadyjoining">
							<span>Already joining </span>
							{participatesIMG}
							<span className="activity-userimg">
							</span>
							<span className="activity-counter">
							 <span>10/20 </span>
							</span>
						</span>
					 </CardText>

					 <div className="activity-buttons">
					 <button> join </button>
					 </div>

			 </Card>
		 </div>


	);
}
}
