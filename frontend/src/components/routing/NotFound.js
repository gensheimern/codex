import React from 'react';

/**
 * This is the page rendered, if the content was not found.
 */
export default class NotFound extends React.Component {
	render() {
		return (
			<div style={{
				width: '100%',
				height: '100%',
				marginTop: '20%',
				textAlign: 'center',
			}}>
				<p>Error 404: Nothing is here.</p>
			</div>
		);
	}
}
