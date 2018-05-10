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
						collapsed: false,
		};

		this.toggleJoin = this.toggleJoin.bind(this);
		this.toggleColapse = this.toggleColapse.bind(this);
	}

/*
	shouldComponentUpdate(nextProps, nextState){
		if(this.state.collapsed !== nextState.collapsed) {
			return true
			console.log("true");
		}

		return false
	}
*/
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
			this.isJoined();

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

	toggleColapse() {
			
			if(this.state.collapsed){
				this.setState({collapsed : false});
			}else {
				this.setState({collapsed : true});
			}
	}

	toggleJoin() {
		const join = !this.state.isJoined;
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
                isJoined: join,
			});
        });
	}

	render() {
		if (!this.state.loaded) {
			return (<p>Loading...</p>);
		}
		return (

			<EventCard
				loaded = {this.state.loaded}
				joined={this.state.isJoined}
				participants={this.state.participants}
				event={this.props.event}
				date={new Date(this.props.event.time)}
				toggleJoin={this.toggleJoin}
				toggleCollapse={this.toggleColapse}
				collapse={this.state.collapsed}
			/>
		);
	}

}
