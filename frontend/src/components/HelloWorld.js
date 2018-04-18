import React from 'react';
import ListGroups from './ListGroups';
import ListUsers from './ListUsers';

class HelloWorld extends React.Component {

	render() {
		return(
			<React.Fragment>
				<h1 style={{textAlign: "center"}}>Hello World!</h1>
				<ListGroups />
				<ListUsers />
			</React.Fragment>
		);
	}
}

export default HelloWorld;