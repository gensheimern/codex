import React from 'react';
import config from '../../config';
import EventCard from './EventCard';
import getSocket from '../../Socket';

export default class EventItem extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
            loaded: false,
            isJoined: false, //Defines if the User who´s logged in joined the Event
            participants: [], //Array of participates
						error: null,
						collapsed: false,
						messages: [],
		};

		this.toggleJoin = this.toggleJoin.bind(this);
		this.toggleColapse = this.toggleColapse.bind(this);
		this.loadMessages = this.loadMessages.bind(this);
		this.loadParticipants = this.loadParticipants.bind(this);

	}

	componentDidMount() {
		this.loadParticipants();
		this.loadMessages();

		if (this.props.webFeed) {
			getSocket().subscribe(`messagesChanged-${this.props.event.id}`, this.loadMessages);
			getSocket().subscribe(`participantsChanged-${this.props.event.id}`, this.loadParticipants);
		} else {
			getSocket().subscribe(`messagesChangedApp-${this.props.event.id}`, this.loadMessages);
		}
	}

	componentWillUnmount() {
		if (this.props.webFeed) {
			getSocket().unsubscribe(`messagesChanged-${this.props.event.id}`);
			getSocket().unsubscribe(`participantsChanged-${this.props.event.id}`);
		} else {
			getSocket().unsubscribe(`messagesChangedApp-${this.props.event.id}`);
		}
	}

	loadMessages() {

		this.setState({
			error: null,
		});

		fetch(config.apiPath + "/activity/" + this.props.event.id + "/message", {
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
				messages: res,
				loaded: true,
		  });

		})
		.catch((err) => {
			this.setState({
				error: 'An Error occured.',
			});
		});
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
		const isJoined = this.state.participants.reduce((total, user) => (total || user.me), false);
		this.setState({
			isJoined
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
                } else if (res.status !== 200 && res.status !== 201) {
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
		})
		.catch(() => {});
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
				postComment={this.postComment}
				messages={this.state.messages}
				loadMessages={this.loadMessages}
				webFeed={this.props.webFeed}
			/>
		);
	}

}
