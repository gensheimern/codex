import React from "react";

import config from "../../config.js";
import "./activity.css";
import ActivityItem from "./ActivityItem";
export default class Activity extends React.Component {

  constructor(props) {
    super(props);
    this.state= {activitys:[]};
/*
    this.state = {
        activitys: [{
        Activity_Id: "",
        Activityname:"",
        Description:"",
        Eventtag:"",
        Host:"",
        Place:"",
        Time:""
        }
      ]
    }
    */
};

  componentDidMount() {
    this.loadData();

  }

  loadData() {
    fetch(config.apiPath + "/activity/", {
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
        activitys: resN

      });
      console.log(resN);
    });

  }

  render() {
    let Item;
    if (this.state.activitys.length !== 0){
      Item = this.state.activitys.map(activity => {
        console.log(activity);

        return (
          <ActivityItem key={activity.Activity_Id} activity={activity} />
        );

      });
    }else {
      Item = <p> loading.. </p>;
}
    return (
      <div className="Feed">
      {Item}
      </div>
  );

}
}
