import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
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
import Signup from './components/signup/Signup';
import Messages from './components/message/Messages';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mainContentNumber: 0,
      filterWord:"Newest",
      searchWord:"",
    };
    this.changeContent = this.changeContent.bind(this);
    this.searchFilterFeed = this.searchFilterFeed.bind(this);

  }

  changeContent(index) {
    this.setState({mainContentNumber: index});
  }
  searchFilterFeed(value,type){
    switch(type) {
        case 'Filter':
                  this.setState({filterWord: value});
                  console.log("!")
  ;break
        case 'Search':
                  this.setState({searchWord: value});
                  console.log("?")

  ;break
        default:
            return null;
  }



  }

  render() {
    return (<BrowserRouter>
      <React.Fragment>
        <Route exact path="/" component={Login}/>
        <Route exact path="/login" component={Login}/>
        {/* TODO: Remove Signup route and show when needed. */}
        <Route exact path="/signup" render={() => (
          <MuiThemeProvider>
            <Signup />
          </MuiThemeProvider>
        )}/>
        <Route exact path="/message" render={() => (
          <MuiThemeProvider>
            <Messages/>
          </MuiThemeProvider>
        )}/>
        <Route path="/activity" render={() => (<React.Fragment>
            <div id="contentarea">
              <MuiThemeProvider>
                {/* <Sidebar /> */}
                <MediaQuery minWidth={768}>
                  {
                    (matches) => {
                      if (matches) {
                        return (<div style={{
                            marginTop: "5%"
                          }}>
                          <NavbarMenu/>
                          <Groups changeContent={this.changeContent} id="groups-wrapper" height="100%"/>
                          <MainContent mainContentNumber={5} filterWord={this.state.filterWord} searchWord={this.state.searchWord} width="55%"/>
                          <SidebarContentCalender/>
                        </div>)
                      } else {
                        return <div className="mobileContent-wrapper">
                          <MuiThemeProvider>
                            <div>
                              <AppNavTop changeContent={this.changeContent} searchFilterFeed={this.searchFilterFeed} width="100%"/>
                              <div className="mainContentMobile-wrapper">
                                <MainContent mainContentNumber={this.state.mainContentNumber} filterWord={this.state.filterWord} searchWord={this.state.searchWord}/>
                              </div>
                              <AppNavBottom changeContent={this.changeContent} width="100%"/>
                            </div>
                          </MuiThemeProvider>
                        </div>
                      }
                    }
                  }
                </MediaQuery>
              </MuiThemeProvider>

            </div>
          </React.Fragment>)}/>
      </React.Fragment>
    </BrowserRouter>);
  }

}

export default App;
