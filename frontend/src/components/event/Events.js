import React from 'react';
import EventItem from './EventItem';
import AddButton from './AddButton';
import config from '../../config';
import MediaQuery from 'react-responsive';

export default class Events extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			events:[],
			loaded: false,
			error: null,
		};
	}

	componentDidMount() {
		this.loadActivityData();
	}

	loadActivityData() {
		this.setState({
			error: null,
			loaded: false,
		});

		fetch(config.apiPath + "/activity", {
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
				events: res,
				loaded: true,
		  });

		})
		.catch((err) => {
			this.setState({
				error: 'An Error occured.',
			});
		});
	}

	render() {
		if (this.state.error) {
			return (<p>{this.state.error}</p>);
		}

		if(!this.state.loaded) {
			return (<p>Loading</p>);
		}

		return (
			<React.Fragment>
				<div>
				<MediaQuery query="(min-device-width: 768px)">
					{(matches) => {
						if (matches) {
							return <div>
							<div className="feedInfo" style={{paddingLeft: "2%"}}>
								<h3>PUBLIC</h3>
								<p>12 | Welcome to the public channel of VSF Experts. You can find all your colleagues here.</p>
							</div>
							<div className="addButton">
							<hr />
							<AddButton />
							</div>
							 </div>
						}
						else {
							return null
						}
					}
			}
			</MediaQuery>
				<div className="feed">
					{ this.state.events.map(event => (<EventItem key={event.id} event={event} />)) }
				</div>
				</div>
			</React.Fragment>
		);

	}
}
