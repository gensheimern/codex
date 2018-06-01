import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import MediaQuery from 'react-responsive';

// Components
import './App.css';
import Login from './components/login/Login';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Signup from './components/signup/Signup';
import Dashboard from './components/Dashboard';
import MobileContent from './components/MobileContent';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			mainContentNumber: 0,
			filterWord: 'TimeDown',
			searchWord: '',
		};

		this.changeContent = this.changeContent.bind(this);
		this.searchFilterFeed = this.searchFilterFeed.bind(this);
	}

	changeContent(index) {
		this.setState({ mainContentNumber: index });
	}

	searchFilterFeed(value, type){
		switch(type) {
			case 'Sort':
				this.setState({ filterWord: value });
				break;
			case 'Search':
				this.setState({ searchWord: value });
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
			<Route exact path="/" render={() => (
				<Redirect to={{
					pathname: localStorage.getItem('apiToken')
						? '/feed' : '/login'
				}} />
			)}/>

			{/* Public routes */}
			<Route exact path="/login" component={Login} />
			<Route exact path="/signup" component={Signup} />

			{/* Protected routes (login required) */}
			<Route exact path="/feed" render={() =>
				(<MediaQuery minWidth={768}>
					{(matches) =>
						matches
						?	(<Dashboard
								changeContent={this.changeContent}
								searchFilterFeed={this.searchFilterFeed}
								filterWord={this.state.filterWord}
								searchWord={this.state.searchWord}
							/>)
						:	(<MobileContent
								changeContent={this.changeContent}
								searchFilterFeed={this.searchFilterFeed}
								filterWord={this.state.filterWord}
								searchWord={this.state.searchWord}
								mainContentNumber={this.state.mainContentNumber}
							/>)
					}
				</MediaQuery>)
			} />
		</div>
		</MuiThemeProvider>
		</BrowserRouter>);
	}
}
				
export default App;
