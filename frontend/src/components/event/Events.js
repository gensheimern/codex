import React from 'react';
import EventItem from './EventItem';
import config from '../../config';
import MediaQuery from 'react-responsive';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { withRouter } from 'react-router-dom';
import FilterDropDown from '../MenuComponents/FilterDropDown.js';

class Events extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      events: [],
      groupEvents: [],
      loaded: false,
      error: null,
    };
  }

  componentDidMount() {
    this.loadActivityData();
  }

  loadActivityData() {
    // this.setState({error: null, loaded: false});
    // let isPersonal = "";
    // if(this.props.filter.personalFilter === "PERSONAL") {
    //   isPersonal = "/joined";
    // }

    fetch(config.apiPath + "/activity", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': localStorage.getItem('apiToken')
      }
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Request failed.");
      } else if (res.status !== 200) {
        throw new Error("Forbidden");
      }

      return res;
    }).then(res => res.json()).then(res => {
      this.setState({events: res, loaded: true});

    }).catch((err) => {
      this.setState({error: 'An Error occured.'});
    });
if(this.props.filter.filterFeed !== "PUBLIC"){
    fetch(config.apiPath +  "/activity/teamId/" + this.props.filter.filterFeed, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': localStorage.getItem('apiToken')
      }
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Request failed.");
      } else if (res.status !== 200) {
        throw new Error("Forbidden");
      }

      return res;
    }).then(res => res.json()).then(res => {
      this.setState({groupEvents: res, loaded: true});

    }).catch((err) => {
      this.setState({error: 'An Error occured.'});
    });
  }}

  render() {



    if (this.state.error) {
      return (<p>{this.state.error}</p>);
    }

    if (!this.state.loaded) {
      return (<p>Loading</p>);
    }
    let filterData;
    let filterDataBeginn = this.props.filter.filterDate;
    let searchWordName = this.props.filter.searchWord;

    if(this.props.filter.filterFeed === "PUBLIC") {
      filterData = this.state.events;
    } else {
      filterData = this.state.groupEvents;
    }

    filterData = filterData.filter(function (a,b)
                    {
                      return (new Date(a.time)) >= filterDataBeginn;
                    });

    if(!(this.props.filterWord === null)){
      switch(this.props.filter.filterWord) {
          case 'TimeDown':
          this.state.events.sort(function(obj1, obj2){
          return new Date(obj1.time) - new Date(obj2.time)})
    ;break
          case 'TimeUp':
          this.state.events.sort(function(obj1, obj2){
          return new Date(obj2.time) - new Date(obj1.time)})
    ;break
          case 'NameDown':
          this.state.events.sort(function(obj1, obj2){
          return (obj1.name.localeCompare(obj2.name))})
    ;break
          case 'NameUp':
          this.state.events.sort(function(obj1, obj2){
          return (obj2.name.localeCompare(obj1.name))})
    ;break
          case 'Oldest':
          this.state.events.sort(function(obj1, obj2){
          return (obj1.id) - (obj2.id)})
    ;break
          case 'Newest':
          this.state.events.sort(function(obj1, obj2){
          return (obj2.id) - (obj1.id)})
    ;break
          default:
          this.state.events.sort(function(obj1, obj2){
          return (obj1.time) - (obj2.time)})
    }
      }
    if(!(searchWordName === null)){
      filterData = filterData.filter(event => event.name.toUpperCase().includes(searchWordName.toUpperCase()));
    } else {
      filterData = this.state.events;
    }
    return (<React.Fragment>
      <div>
        <MediaQuery query="(min-device-width: 768px)">
          {
            (matches) => {
              if (matches) {
                return <div>
                  <div className="addButton">

                    <FloatingActionButton
                      backgroundColor="#f8c947"
                      mini={true}
                      style={{
                        margin: '0 2%',
                      }}
                      onClick={() => {
                        this.props.history.push('/addevent');
                      }}
                    >
                      <ContentAdd/>
                    </FloatingActionButton>
                    ADD EVENT
                  </div>

                </div>
              } else {
                return 			<FilterDropDown
                							searchFilterFeed={this.props.searchFilterFeed}
                						/>
              }
            }
          }
        </MediaQuery>
        <div className="feed">
          {filterData.map(event => (<EventItem key={event.id} event={event}/>))}
        </div>
      </div>
    </React.Fragment>);

  }
}

export default withRouter(Events);
