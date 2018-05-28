import React from 'react';
import EventItem from './EventItem';
import config from '../../config';
import MediaQuery from 'react-responsive';

export default class Events extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      events: [],
      loaded: false,
      error: null,
    };
  }

  componentDidMount() {
    this.loadActivityData();
  }

  loadActivityData() {
    this.setState({error: null, loaded: false});

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
  }

  render() {
    if (this.state.error) {
      return (<p>{this.state.error}</p>);
    }

    if (!this.state.loaded) {
      return (<p>Loading</p>);
    }

    if(!(this.props.filterWord === null)){
      switch(this.props.filterWord) {
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
      let filterData;
    if(!(this.props.searchWord === null)){
      filterData = this.state.events.filter(event => event.name.includes(this.props.searchWord));
      console.log(this.props.searchWord);
      console.log(filterData);
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
                  <div className="feedInfo" style={{
                      paddingLeft: "2%"
                    }}>
                    <h3>PUBLIC</h3>
                    <p>12 | Welcome to the public channel of VSF Experts. You can find all your colleagues here.</p>
                  </div>
                  <div className="addButton">
                    <hr/>

                  </div>
                </div>
              } else {
                return null
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
