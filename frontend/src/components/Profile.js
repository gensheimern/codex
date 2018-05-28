import React from 'react';
import config from '../config';

export default class ProfileContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: []
    };
    this.getMyProfile = this.getMyProfile.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  getMyProfile() {
    fetch(config.apiPath + "/user/666", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': localStorage.getItem('apiToken')
      }
    }).then((res) => {
      console.log(res.status);
      if (!res.ok) {
        throw new Error("Request failed.");
      } else if (res.status !== 200) {
        throw new Error("Forbidden");
      } else {
        return res;
      }
    }).then(res => res.json()).then(res => {
      console.log(res);
      this.setState({user: res});
    });

  }
  componentDidMount() {
    this.getMyProfile();
  }

  render() {
    console.log(this.state.user);

    return (<div className="Profile" style={{
        marginTop: "10%"
      }}>
      <p>
        || User || ____________________________________________________________________________________________________________________
      </p>
      <p>
        {this.state.user.firstName}</p>
      <p>
        {this.state.user.name}</p>
      <p>
        {this.state.user.email}</p>
      <p>
        {this.state.user.image}</p>
    </div>);
  }
}
