import React, {
    Component
} from 'react';
import {
    BrowserRouter,
    Route
} from 'react-router-dom';
import MediaQuery from 'react-responsive';

// Components
import './App.css';
import Login from './components/login/Login';
import NavbarMenu from './components/MenuComponents/NavbarMenu';
import MainContent from './components/MainContent';
import SidebarContentCalender from './components/MenuComponents/SidebarContentCalender';
import Groups from './components/Groups';


class App extends Component {

    render() {
        return (<BrowserRouter>
            <React.Fragment>
                <Route exact path="/" component={Login} />
                <Route exact path="/login" component={Login} />
                <Route path="/" render={() => (
                    <React.Fragment>
                        <NavbarMenu />

                        <div id="contentarea">

                            {/* <Sidebar />*/}
                            <MediaQuery minWidth={768}>
                    					{(matches) => {
                    						if (matches) {
                                  return(
                                    <div>
                                    <Groups id="groups-wrapper" height="100%" />
                                    <MainContent width="55%" />
                                    <SidebarContentCalender />
                                    </div>
                                  )
                                } else {
                                  return <MainContent width="100%" />
                              }
                            }
                          }
                            </MediaQuery>


                        </div>
                    </React.Fragment>
                )} />
            </React.Fragment>
        </BrowserRouter>);
    }


}

export default App;
