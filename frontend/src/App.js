import React, {Component} from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';

// Components
import './App.css';
import Login from './components/login/Login';
import CreateTeam from './components/groupmanager/CreateTeam';
import ListTeams from './components/groupmanager/ListGroups';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (<BrowserRouter>
            <React.Fragment>
                <Route exact path="/" component={Login}/>
                <Route exact path="/create_group" component={CreateTeam}/>
                <Route exact path="/create_group" component={ListTeams}/>
            </React.Fragment>
        </BrowserRouter>);
    }
}

export default App;
