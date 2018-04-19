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
import Logout from './components/login/Logout';
import Signup from './components/signup/Signup';
import Groupmanager from './components/groupmanager/Groupmanager';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return(<BrowserRouter>
            <React.Fragment>
                <Route exact path="/" component={Login}/>
                <Route exact path="/groupmanager" component={Groupmanager}/>
                <Route exact path="/signup" component={Signup}/>
                <Route exact path="/logout" component={Logout}/>
            </React.Fragment>
        </BrowserRouter>);
    }
}

export default App;