import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import config from '../../config';
import JoinOrganization from '../organizations/JoinOrganization';
import AddOrganization from './AddOrganization';
import ListOrganizations from './ListOrganizations';
import Divider from 'material-ui/Divider';
import SelectOrganizationDialog from './SelectOrganizationDialog';

const NOT_SELECTED = -1;
const CREATE_NEW = 0;

export default class SelectOrganization extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			organizations: [],
			loaded: false,
			error: null,
			password: '',
			selected: NOT_SELECTED,
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

	leaveOrganization(organizationId) {
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
			this.props.close();
        }).catch((error) => {});
	}

	deleteOrganization(organizationId) {
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
			// TODO: Reload
			//this.props.close();
        }).catch((error) => {});
	}

	back() {
		this.setState({
			selected: NOT_SELECTED,
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
					<p style={{ fontWeight: 600 }}>My Organizations:</p>
					<ListOrganizations
						organizations={this.props.myOrganizations}
						joined={true}
						onLeave={this.leaveOrganization}
						onDelete={this.deleteOrganization}
					/>
					<Divider />
					<p style={{ fontWeight: 600 }}>Other Organizations:</p>
					<ListOrganizations
						organizations={organizations}
						onJoin={(selected) => {
							this.setState({
								selected,
							});
						}}
					/>
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

		if (this.state.selected > CREATE_NEW) {
			action = (
				<JoinOrganization
					show={this.state.selected !== NOT_SELECTED}
					id={this.state.selected}
					organization={this.state.organizations.filter((element) => element.id === this.state.selected)[0]}
					saveChange={this.props.saveChange}
					close={this.props.close}
					back={this.back}
				/>
			);
		}

		if (organizations.length === 0) {
			action = (
				<p style={{
					width: '100%',
					textAlign: 'center',
				}}>No organizations yet. Create one.</p>
			);
		}

		if (this.state.selected === CREATE_NEW) {
			action = (
				<AddOrganization
					saveChange={this.props.saveChange}
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
			>
				{action}
			</SelectOrganizationDialog>
		);
	}
}
