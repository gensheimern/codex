import React from "react";
import { Card, CardImg, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle } from 'reactstrap';

import config from "../../config.js";
import "./activity.css";
export default class Activity extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id : "",
      description:"",
      activityname:"",
      place:"",
      day:"",
      time:"",
      eventtag:"",
      host:""
    }
    const id = props.id;
  }

  componentDidMount(props) {
    this.loadData(props);

  }

  loadData(id) {
    fetch(config.apiPath + "/activity/" + 13, {
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
        id: resN[0].Activity_Id,
        description:resN[0].Description,
        activityname:resN[0].Activityname,
        place:resN[0].Place,
        time:new Date(resN[0].Time).getHours()+ ":"+new Date(resN[0].Time).getMinutes(),
        day:new Date(resN[0].Time).getDate()+"."+ new Date(resN[0].Time).getMonth()+ "."+ new Date(resN[0].Time).getFullYear(),
        eventtag:resN[0].Eventtag,
        host: resN[0].Host
      });
    });

  }

  render() {
    return (
      <div>
       <Card>
         <CardBody>
           <CardTitle>
            <div className="activity-host">
              {this.state.host}
            </div>
            <div className="activity-timestamp">
              {this.state.time}
            </div>
          </CardTitle>

         </CardBody>
         <img src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
         <CardBody>
           <CardText>
            <div className="activity-date">
                ICOOON {this.state.day}
              </div>
              <div className="activity-time">
                ICOON {this.state.time}
              </div>
              <div className="activity-place">
                ICOOOON {this.state.place}
              </div>
           </CardText>
           <div className="activity-joining">
            Already Joining ICOOOOON ICOOOON ICOOOOON
           </div>
           <div className="activity-buttons">
           <button> share </button> <button> comment </button> <button> join </button>
           </div>
         </CardBody>
       </Card>
     </div>
  );
}
}
