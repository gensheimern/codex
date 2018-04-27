import React, {
    Component
} from 'react';
import {
    BrowserRouter,
    Route
} from 'react-router-dom';

// Components
import './App.css';
import Login from './components/login/Login';
import GroupManager from './components/groupmanager/Groupmanager';
import Activity from './components/activity/Activity';
import Logout from './components/login/Logout';
import Signup from './components/signup/Signup';
<<<<<<< HEAD
import Groupmanager from './components/groupmanager/Groupmanager';
import Example from './components/MenuComponents/example';
import Activity from './components/activity/Activity';
=======
>>>>>>> development


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return(<BrowserRouter>
            <React.Fragment>
                <Route exact path="/" component={Login}/>
<<<<<<< HEAD
                <Route exact path="/groupmanager" component={Groupmanager}/>
                <Route exact path="/example" component={Example}/>
=======
                <Route exact path="/groupmanager" component={GroupManager}/>
>>>>>>> development
                <Route exact path="/signup" component={Signup}/>
                <Route exact path="/logout" component={Logout}/>
                <Route exact path="/activity" component={Activity}/>
            </React.Fragment>
        </BrowserRouter>);
    }


}

export default App;
