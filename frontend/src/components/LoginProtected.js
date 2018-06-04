import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default class LoginProtectedRoute extends React.Component {
	render() {
		return (
			<Route
				{...this.props}
				render={
					props => localStorage.getItem('apiToken')
						? (<React.Component {...props} />)
						: (<Redirect
							to={{
								pathname: '/login',
								state: {
									from: props.location,
								},
							}}
						/>)
				}
			/>
		);
	}
}
