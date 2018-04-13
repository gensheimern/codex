import React, {Component} from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';

// Components
import './App.css';
import Login from './components/login/Login';
import CreateTeam from './components/groupmanager/CreateGroup';
import ListTeams from './components/groupmanager/ListGroups';
import ListUsers from './components/ListUsers';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (<BrowserRouter>
            <React.Fragment>
                <Route exact="true" path="/" component={Login}/>
                <Route exact="true" path="/create_group" component={CreateTeam}/>
                <Route exact="true" path="/create_group" component={ListTeams}/>
            </React.Fragment>
        </BrowserRouter>);
    }
}

export default App;
