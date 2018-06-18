import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MediaQuery from 'react-responsive';

// Components
import './App.css';
import Login from './components/login/Login';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Signup from './components/signup/Signup';
import Dashboard from './components/Dashboard';
import RestaurantLogin from './components/Lunch/RestaurantLogin';
import RestaurantSignup from './components/Lunch/Signup/RestaurantSignup';
import Lunch from './components/Lunch/Lunch';
import MobileContent from './components/MobileContent';
import Splashscreen from './components/routing/Splashscreen';
import NotFound from './components/routing/NotFound';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import customMuiTheme from './customMuiTheme';
import CheckToken from './components/routing/CheckToken';
import GlobalMessage from './components/routing/GlobalMessage';

/**
 * This is the main component rendered every time.
 * Here is also the routing to the different pages using the react router.
 */
class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			mainContentNumber: 0,
			activeIndex: "PUBLIC",
			filter:{
				filterWord: 'TimeDown',
				searchWord: '',
				filterDate: new Date(),
				filterFeed: 'PUBLIC',
				personalFilter: new Date(),
			}
		};

		this.changeContent = this.changeContent.bind(this);
		this.changeTeamIndex = this.changeTeamIndex.bind(this);
		this.searchFilterFeed = this.searchFilterFeed.bind(this);
		this.filterPersonalFeed = this.filterPersonalFeed.bind(this);
	}

	changeContent(index) {
		this.setState({ mainContentNumber: index });
	}

	changeTeamIndex(index){
			this.setState({ activeIndex: index });
	}

	filterPersonalFeed(value){
		this.setState((oldState) => ({
			filter: {
				...oldState.filter,
				personalFilter: value,
			}
		}))
	}

	searchFilterFeed(value, type){
		switch(type) {
			case 'Sort':
				this.setState((oldState) => ({
					filter: {
						...oldState.filter,
						filterWord: value,
					}
				}))
				break;
			case 'Search':
				this.setState((oldState) => ({
					filter: {
						...oldState.filter,
						searchWord: value,
					}
				}))
				break;
			case 'Date':
				this.setState((oldState) => ({
					filter: {
						...oldState.filter,
						filterDate: value,
					}
				}))
			break;
			case 'FilterFeed':
				this.setState((oldState) => ({
					filter: {
						...oldState.filter,
						filterFeed: value,
					}
				}))
				break;
			default:
				return null;
		}
	}

	render() {
		return (
		<BrowserRouter>
		<MuiThemeProvider muiTheme={getMuiTheme(customMuiTheme)}>
			<Switch>
				{/* Landing page */}
				<Route exact path="/" component={Splashscreen}/>


				{/* Public routes */}
				<Route exact path="/login" component={Login} />
				<Route exact path="/signup" component={Signup} />
				<Route exact path="/logout" render={(props) => (<Login logout={true} history={props.history} />)} />
				<Route exact path="/restaurantlogin" component={RestaurantLogin} />
				<Route exact path="/restaurantsignup" component={RestaurantSignup} />
				<Route exact path="/lunch" component={Lunch} />

				{/* Protected routes (login required) */}
				<Route exact path="/(feed|notifications|profile|addteam|addevent|personal|lunchfeed)" render={(props) => (
					<div id="contentarea">
						<Screen
							filterPersonalFeed = {this.filterPersonalFeed}
							changeContent={this.changeContent}
							searchFilterFeed={this.searchFilterFeed}
							filter={this.state.filter}
							mainContentNumber={this.state.mainContentNumber}
							match={props.match}
							activeIndex={this.state.activeIndex}
							changeTeamIndex={this.changeTeamIndex}
						/>
					</div>
				)} />

				<Route component={NotFound}/>
			</Switch>
		</MuiThemeProvider>
		</BrowserRouter>);
	}
}

/**
 * Component deciding if the web or the app version is rendered using a media query.
 */
function Screen(props) {
	return (
		<React.Fragment>
			<MediaQuery minWidth={770}>
				{(matches) =>
					matches
					?	(<Dashboard {...props} />)
					:	(<MobileContent {...props} />)
				}
			</MediaQuery>
			<CheckToken route={props.match.url} />
			<GlobalMessage />
		</React.Fragment>
	);
}

export default App;
