import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import MediaQuery from 'react-responsive';

// Components
import './App.css';
import Login from './components/login/Login';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Signup from './components/signup/Signup';
import Dashboard from './components/Dashboard';
import MobileContent from './components/MobileContent';
import Splashscreen from './components/routing/Splashscreen';
// import NotFound from './components/routing/NotFound';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			mainContentNumber: 0,
			filter:{
				filterWord: 'TimeDown',
				searchWord: '',
				filterDate: new Date(),
				filterGroup: '',
				personalFilter: new Date(),
			}
		};

		this.changeContent = this.changeContent.bind(this);
		this.searchFilterFeed = this.searchFilterFeed.bind(this);
		this.filterPersonalFeed = this.filterPersonalFeed.bind(this);
	}

	changeContent(index) {
		this.setState({ mainContentNumber: index });
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
				case 'FilterGroup':
						console.log('wow');
									break;
			default:
				return null;
		}
	}

	render() {
		return (
		<BrowserRouter>
		<MuiThemeProvider>
		<div id="contentarea">
			{/* Landing page */}
			<Route exact path="/" component={Splashscreen}/>


			{/* Public routes */}
			<Route exact path="/login" component={Login} />
			<Route exact path="/signup" component={Signup} />
			<Route exact path="/logout" component={Login} />

			{/* Protected routes (login required) */}
			<Route exact path="/(feed|notifications|profile|addteam|addevent|personal)" render={(props) => (
				<Screen
					filterPersonalFeed = {this.filterPersonalFeed}
					changeContent={this.changeContent}
					searchFilterFeed={this.searchFilterFeed}
					filter={this.state.filter}
					mainContentNumber={this.state.mainContentNumber}
					match={props.match}
				/>
			)} />

			{/* <Route path="/" component={NotFound}/> */}
		</div>
		</MuiThemeProvider>
		</BrowserRouter>);
	}
}

function Screen(props) {
	return (
		<MediaQuery minWidth={768}>
			{(matches) =>
				matches
				?	(<Dashboard {...props} />)
				:	(<MobileContent {...props} />)
			}
		</MediaQuery>
	);
}

export default App;
