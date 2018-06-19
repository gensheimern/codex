import React from 'react';

/**
 * Shows a simple fallback ui if there is an error in the child component tree.
 */
export default class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}
	
	componentDidCatch(error, info) {
		this.setState({ hasError: true });

		// Log error to error reporting service here.
	}
	
	render() {
		if (this.state.hasError) {
		// Fallback ui if an error occures.
		return (
			<h1 style={{ textAlign: 'center' }}>Something went wrong.</h1>
		);
		}

		return this.props.children;
	}
}
	