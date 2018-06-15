import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import config from '../../config';

export default class CreateEventInvitePeople extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			usersList: [],
			usersListConfig: {
				text: 'textKey',
				value:'valueKey',
			},
			groups: [],
			inviteList: [],
			inviteImageList: [],
			value: '',
		}
	}

	componentDidMount() {
		this.loadUsers();
		this.loadGroups();
	}

	loadUsers(){
		fetch(`${config.apiPath}/user/`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'X-Access-Token': localStorage.getItem('apiToken'),
			}
		})
		.then((res) => {
			if (!res.ok) {
				throw new Error("Request failed.");
				} else if (res.status !== 200) {
				throw new Error("Forbidden");
			}

			return res.json();
		})
		.then(res => {
			this.setState({
				usersListLong: res,
			});

			this.setState({
				usersList: res.map((user) => {
					const { firstName, name, image, id, email } = user;

					return {
						textKey: `${firstName} ${name}`,
						ValueImage: image,
						ValueKey: id,
						ValueEmail: email,
					};
				}),
			});
		})
		.catch((err) => {
			this.setState({
				error: 'An Error occured.',
			});
		});
	}

	loadGroups(){
	    fetch(config.apiPath + "/team/", {
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
	        res.forEach(userid => {
	          console.log(userid);
	          this.setState({groups:[...this.state.groups, {textKey: userid.name, ValueEmail: userid.id, ValueKey:"Group"}]})
	        })
	        this.setState({groups: this.state.groups.concat(this.state.usersList)})
	    })
	    .catch((err) => {
	      this.setState({
	        error: 'An Error occured.',
	      });
	    });
	  }


	onChange = (event) => {
		this.setState({
			value: event.target.value,
		});
	}

	newRequest = (chosenRequest, index) => {
		this.setState((prevState) => {
			return {
				inviteList: [
					...prevState.inviteList,
					chosenRequest.ValueKey,
				],
				inviteImageList: [
					...prevState.inviteImageList,
					{ ...chosenRequest }
				],
				value: '',
			}
		});

		this.props.people(this.state.inviteImageList);
	}

	render(){
		return(
			<AutoComplete
				id="CreateEventInvitePeopleAutocomplete"
				fullWidth={true}
				value={this.state.value}
				onChange={this.onChange}
				floatingLabelText="Invite People"
				filter={AutoComplete.fuzzyFilter}
				dataSource={this.state.groups}
				dataSourceConfig={this.state.usersListConfig}
				maxSearchResults={5}
				onNewRequest= {this.newRequest}
			/>
		);
	}
}
