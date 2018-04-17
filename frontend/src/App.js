import React, {
    Component
} from 'react';
import {
    BrowserRouter,
    Route,
    Link
} from 'react-router-dom';

// Components
import './App.css';
import Login from './components/login/Login';
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
            </ React.Fragment>
        </BrowserRouter>);
    }
}

export default App;