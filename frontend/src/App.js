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
import AppNavBottom from './components/MenuComponents/AppNavBottom';
import AppNavTop from './components/MenuComponents/AppNavTop';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


class App extends Component {
  constructor(props) {
		super(props);
		this.state = {
		mainContentNumber: 0,
		};
    this.changeContent = this.changeContent.bind(this);

	}


  changeContent(index){
    this.setState({mainContentNumber:index});
  }


    render() {
        return (<BrowserRouter>
            <React.Fragment>
                <Route exact path="/" component={Login} />
                <Route exact path="/login" component={Login} />
                <Route path="/activity" render={() => (
                    <React.Fragment>
                        <div id="contentarea">

                            {/* <Sidebar />*/}
                            <MediaQuery minWidth={768}>
                    					{(matches) => {
                    						if (matches) {
                                  return(
                                    <div>
                                      <NavbarMenu />
                                      <Groups id="groups-wrapper" height="100%" />
                                      <MainContent mainContentNumber={5} width="55%" />
                                      <SidebarContentCalender />
                                    </div>
                                  )
                                } else {
                                  return <div className="mobileContent-wrapper">
                                          <MuiThemeProvider>
                                            <div>
                                            <AppNavTop width="100%"/>
                                          <div className="mainContentMobile-wrapper">
                                            <MainContent mainContentNumber={this.state.mainContentNumber}/>
                                          </div>
                                            <AppNavBottom changeContent={this.changeContent} width="100%"/>
                                            </div>
                                          </MuiThemeProvider>
                                        </div>
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
