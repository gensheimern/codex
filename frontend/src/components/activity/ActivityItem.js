import React from "react";
import { Card, CardText, CardBody, CardTitle} from 'reactstrap';

import "./activity.css";
export default class ActivityItem extends React.Component {

  render() {
    //console.log(this.props.activity.Host);

    return (
      <div>
       <Card>
         <CardBody>
           <CardTitle>
            <div className="activity-host">
              {this.props.activity.Host}
            </div>
            </CardTitle>

         </CardBody>
         <img src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card cap" />
            {this.props.activity.Activityname}
         <CardBody>
           <CardText>
              <span className="activity-time">
                ICOON {this.props.activity.Time}
              </span>
              <span className="activity-place">
                ICOOOON {this.props.activity.Place}
              </span>
           </CardText>
           <div className="activity-joining">
            Already Joining ICOOOOON ICOOOON ICOOOOONAlready Joining ICOOOOON ICOOOON ICOOOOONAlready Joining ICOOOOON ICOOOON ICOOOOONAlready Joining ICOOOOON ICOOOON ICOOOOONAlready Joining ICOOOOON ICOOOON ICOOOOONAlready Joining ICOOOOON ICOOOON ICOOOOONAlready Joining ICOOOOON ICOOOON ICOOOOONAlready Joining ICOOOOON ICOOOON ICOOOOONAlready Joining ICOOOOON ICOOOON ICOOOOONAlready Joining ICOOOOON ICOOOON ICOOOOONAlready Joining ICOOOOON ICOOOON ICOOOOON
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
