import React from "react";
import "./groupmanager.css";
import config from '../../config';
import GroupItem from './GroupItem';

export default class DisplayGroups extends React.Component {

    constructor(props){
      super(props);
      this.state= {
      groups:[]
    };
    }

    componentDidMount(){
      fetch(config.apiPath + "/team", {
          headers: {
              'Content-Type': 'application/json',
              'X-Access-Token': localStorage.getItem('apiToken')
          }
      }).then((res) => {
          if(!res.ok) {
              throw new Error("Request failed.");
          } else if(res.status !== 200) {
              throw new Error("Forbidden");
          } else {
              return res;
          }
      }).then(res => res.json()).then(res => {
          this.setState({
            groups: res
          });

          let resNM = this.state.groups;
          for(let i = 0; i < this.state.groups.length; i++) {
              let TMNameR;
              TMNameR = this.state.groups[i].Firstname + " " + this.state.groups[i].Name;
              resNM[i].TMName = TMNameR;
          }
          this.createGroupDeleteButtons();
      }).catch((err) => {
          this.setState({
              groups: []
          });
      });
    }

    render(!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
       =================== https://www.youtube.com/watch?v=A71aqufiNtQ===================
       !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      let groupItem = this.state.groups.map(groups)
      return(
        <div className="DisplayGroups">
          <GroupItem />
          {this.state.groups.map(groups => <div> {this.state.groups.Team_Id}</div>)}
      </div>
    );}

}
