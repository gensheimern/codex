import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import config from '../../config';
import JoinOrganization from '../organizations/JoinOrganization';
import AddOrganization from './AddOrganization';
import ListOrganizations from './ListOrganizations';
import Divider from 'material-ui/Divider';
import SelectOrganizationDialog from './SelectOrganizationDialog';
import { List } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Autocomplete from 'material-ui/AutoComplete';

const NOT_SELECTED = -1;
const CREATE_NEW = 0;

/**
 * Show all available organizations to join.
 */
export default class SelectOrganization extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			organizations: [],
			loaded: false,
			error: null,
			password: '',
			selected: NOT_SELECTED,

			searchText: '',
		};

		this.back = this.back.bind(this);
	}

	componentDidMount() {
		this.loadOrganizations();
	}

	loadOrganizations() {
		fetch(`${config.apiPath }/organization/`, {
            method: 'GET',
            headers: {
				'Content-Type': 'application/json',
				'X-Access-Token': localStorage.getItem('apiToken'),
            },
		})
		.then((res) => {
            if(!res.ok) {
                throw new Error("Response not ok.");
            } else if(res.status !== 200) {
                throw new Error("An error occured.");
            }
            return res.json();
		})
		.then((res) => {
            this.setState({
				loaded: true,
				error: null,
				organizations: res,
			});
        }).catch((error) => {
			this.setState({
				loaded: true,
				error,
				organizations: [],
			});
        });
	}

	leaveOrganization = (organizationId) => {
		fetch(`${config.apiPath }/user/me/organizations/${organizationId}`, {
            method: 'DELETE',
            headers: {
				'Content-Type': 'application/json',
				'X-Access-Token': localStorage.getItem('apiToken'),
			},
		})
		.then((res) => {
            if(!res.ok) {
                throw new Error("Response not ok.");
            } else if(res.status !== 200) {
                throw new Error("An error occured.");
            }
            return res.json();
		})
		.then((res) => {
			this.props.reload();
        }).catch((error) => {});
	}

	deleteOrganization = (organizationId) => {
		fetch(`${config.apiPath }/organization/${organizationId}`, {
            method: 'DELETE',
            headers: {
				'Content-Type': 'application/json',
				'X-Access-Token': localStorage.getItem('apiToken'),
			},
		})
		.then((res) => {
            if(!res.ok) {
                throw new Error("Response not ok.");
            } else if(res.status !== 200) {
                throw new Error("An error occured.");
            }
            return res.json();
		})
		.then((res) => {
			this.props.reload();
		})
		.catch((error) => {});
	}

	back() {
		this.setState({
			selected: NOT_SELECTED,
		});
	}

	handleUpdateInput = (searchText) => {
		this.setState({
			searchText,
		});
	}

	handleNewRequest = (chosenRequest, index) => {
		this.setState({
			searchText: '',
		});

		if (index === -1) return;

		const organizations = this.state.organizations.filter((organization) => {
			return !this.props.myOrganizations.map(o => o.id).includes(organization.id);
		});

		this.setState({
			selected: organizations[index].id,
		});
	}

	render() {
		const organizations = this.state.organizations.filter((organization) => {
			return !this.props.myOrganizations.map(o => o.id).includes(organization.id);
		});

		let action = null;

		if (this.state.selected === NOT_SELECTED) {
			action = (
				<React.Fragment>
					<RaisedButton
						label="Create new"
						primary={true}
						onClick={() => {
							this.setState({
								selected: CREATE_NEW,
							});
						}}
						style={{
							margin: '2%',
							float: 'right',
						}}
					/>

					<br style={{
						clear: 'both',
					}} />

					<List>
						<Subheader>My Organizations:</Subheader>
						<ListOrganizations
							organizations={this.props.myOrganizations}
							joined={true}
							onLeave={this.leaveOrganization}
							onDelete={this.deleteOrganization}
						/>
					</List>

					<Divider style={{
						backgroundColor: '#1EA185',
						height: '2px',
					}} />	

					<Autocomplete
						hintText="Type here"
						searchText={this.state.searchText}
						onUpdateInput={this.handleUpdateInput}
						onNewRequest={this.handleNewRequest}
						floatingLabelText="Search Organization"
						dataSource={organizations.map(organization => organization.name)}
						filter={(searchText, key) => (key.toLowerCase().indexOf(searchText.toLowerCase()) !== -1)}
						style={{
							maxWidth: '100%',
							minWidth: '50%',
						}}
						textFieldStyle={{
							width: '100%',
						}}
					/>

					<br />

					<List>
						<ListOrganizations
							organizations={organizations}
							onJoin={(selected) => {
								this.setState({
									selected,
								});
							}}
						/>
					</List>
				</React.Fragment>
			);
		}

		if (this.state.selected > CREATE_NEW) {
			const selectedOrganzation = this.state.organizations.filter((element) => element.id === this.state.selected)[0];
			action = (
				<JoinOrganization
					show={this.state.selected !== NOT_SELECTED}
					organization={selectedOrganzation}
					reload={this.props.reload}
					back={this.back}
					close={this.props.close}
				/>
			);
		}

		if (organizations.length === 0) {
			action = (
				<React.Fragment>
					<p style={{
						width: '100%',
						textAlign: 'center',
					}}>No organizations yet. Create one.</p>
					<RaisedButton
						label="Create new"
						primary={true}
						onClick={() => {
							this.setState({
								selected: CREATE_NEW,
							});
						}}
						style={{
							margin: '2%',
						}}
					/>
				</React.Fragment>
			);
		}

		if (this.state.selected === CREATE_NEW) {
			action = (
				<AddOrganization
					reload={this.props.reload}
					back={this.back}
					close={this.props.close}
				/>
			);
		}

		return (
			<SelectOrganizationDialog
				open={this.props.show}
				close={this.props.close}
				back={this.back}
				backBtn={this.state.selected !== NOT_SELECTED}
				modal={this.props.modal}
			>
				{action}
			</SelectOrganizationDialog>
		);
	}
}
