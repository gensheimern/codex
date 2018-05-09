import React from 'react';
import config from '../../config';
import jwt_decode from 'jwt-decode';
import EventCard from './EventCard';

export default class EvnentItem extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
            loaded: false,
            isJoined: false, //Defines if the User who´s logged in joined the Event
            participants: [], //Array of participates
			error: null,
		};
		
		this.toggleJoin = this.toggleJoin.bind(this);
	}

	componentDidMount() {
		this.loadParticipants();
	}

	loadParticipants() {
		this.setState({
			error: null,
		});

		fetch(config.apiPath + "/activity/" + this.props.event.id + "/participants", {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'X-Access-Token': localStorage.getItem('apiToken')
			}
		})
		.then((res) => {
			if (!res.ok) {
				throw new Error("Request failed.");
			  } else if (res.status !== 200) {
				throw new Error("Forbidden");
			}
			
			return res;
		})
		.then(res => res.json())
		.then(res => {
			this.setState({
				participants: res,
				loaded: true,
		  });
	
		})
		.catch((err) => {
			this.setState({
				error: 'An Error occured.',
			});
		});
	}

	isJoined(){
        let decode = jwt_decode(localStorage.getItem('apiToken'));
        this.state.participants.map(user => {
			if(user.userId === decode.id) {
				this.setState({
					isJoined: true
				});
			}
        });
	}
	
	toggleJoin() {
		const join = this.isJoined;
		fetch(config.apiPath + "/activity/" + this.props.event.id + "/participants", {
            method: join ? 'POST' : 'DELETE',
            headers: {
            	'Content-Type': 'application/json',
                'X-Access-Token': localStorage.getItem('apiToken')
            }
		})
		.then((res) => {
              //hier sollten noch einige error codes erstellt werden (auch im Backend)
                if (!res.ok) {
                    if (res.status === 400) {
                        throw new Error("Bad request");
                    } else {
                        throw new Error("Could not find Activity");
                    }
                } else if (res.status !== 200) {
                    throw new Error("Forbidden");
                }
                return res;
		})
		.then(res => res.json())
		.then((res) => {
            //reloading Participates to display them dynamicly
            this.loadParticipants();
            this.setState({
                joined: join,
			});
        });
	}

	render() {
		if (!this.state.loaded) {
			return (<p>Loading...</p>);
		}

		return (
			<EventCard
				joined={this.state.joined}
				participants={this.state.participates}
				event={this.props.event}
				date={new Date(this.props.event.time)}
				toggleJoin={this.toggleJoin}
			/>
		);
	}

}