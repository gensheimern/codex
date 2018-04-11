import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

// Components
import './App.css';
import Login from './components/login/Login';
import CreateGroup from './components/CreateGroup';
import ListGroups from './components/ListGroups';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Route exact path="/" component={Login} />
          <Route exact path="/create_group" component={CreateGroup} />
          <Route exact path="/create_group" component={ListGroups} />
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
