import React from 'react';

export default class Logout extends React.Component {
	componentDidMount() {
		window.localStorage.removeItem('apiKey');
	}

	render() {
		return null;
	}
}