import React from 'react';

class CheckToken extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
            loggedIn: false,
        };
    }

    componentDidMount() {
		fetch(config.apiPath + "/user/me", {
            method: 'GET',
            headers: {
				'Content-Type': 'application/json',
				'X-Access-Token': localStorage.getItem('apiToken'),
            }
		})
		.then((res) => {
            if(!res.ok) {
                throw new Error("Response not ok.");
            } else if(res.status !== 200) {
                throw new Error("Not logged in.");
            }
			
			this.setState({
				loaded: true,
				loggedIn: true,
			});
		})
		.catch((error) => {
			this.setState({
				loaded: true,
				loggedIn: false,
			});
		});
    }
    
    render() {
        if (this.state.loaded && !this.state.loggedIn) {
            return (
                <Redirect to={{
                    pathname: '/login',
                }} />
            );
        }
        return null;
    }
}

export default CheckToken;
