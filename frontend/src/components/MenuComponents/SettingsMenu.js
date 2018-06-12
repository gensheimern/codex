import React from 'react';
import { withRouter } from 'react-router-dom';
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import ArrowDropDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import ArrowDropUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import Add from 'material-ui/svg-icons/content/add';
import Divider from 'material-ui/Divider';
import config from '../../config';
import SelectOrganization from '../organizations/SelectOrganization';


class SettingsMenu extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loaded: false,
			organizations: [],
			changed: false,
			changedError: false,

			showOrganizations: false,
			showOtherOrganizations: false,
		};

		this.loadOrganizations = this.loadOrganizations.bind(this);
		this.changeOrganization = this.changeOrganization.bind(this);
	}

	componentDidMount() {
		this.loadOrganizations();
	}

	loadOrganizations() {
		this.setState({
			loaded: false,
		});

		fetch(config.apiPath + "/user/me/organizations", {
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
                throw new Error("An error occured.");
            }
            return res.json();
		})
		.then((res) => {
            this.setState({
				loaded: true,
				organizations: res,
			});
        }).catch((error) => {
			this.setState({
				loaded: false,
			});
        });
	}

	changeOrganization(organizationId, password) {
		this.setState({
			changedError: false,
		});

		fetch(`${config.apiPath }/user/me/organizations/${organizationId}`, {
            method: 'POST',
            headers: {
				'Content-Type': 'application/json',
				'X-Access-Token': localStorage.getItem('apiToken'),
			},
			body: JSON.stringify({
				password,
			}),
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
				changed: true,
				showOtherOrganizations: false,
				changedError: false,
			});

			this.saveChange(organizationId);
        }).catch((error) => {
			this.setState({
				changedError: true,
			});
        });
	}

	saveChange = (newOrganization) => {
		/* this.setState((prevState, props) => ({
			organizations: prevState.organizations.map((organization) => ({
				...organization,
				active: organization.id === newOrganization,
			}))
		})); */

		this.loadOrganizations();
	}

	render() {
		const allSelected = this.state.organizations.reduce(
			(total, organization) => total && !organization.active, true);

		const listOfOrganizations = [
			<Divider key="divider1" />,
			<MenuItem
				key="noOrganization"
				primaryText="No Organization"
				checked={allSelected}
				insetChildren={!allSelected}
				onClick={() => {
					this.changeOrganization(null);
				}}
			/>,
			...this.state.organizations.map((organization) => {
				return (
					<MenuItem
						key={organization.id}
						primaryText={organization.name}
						checked={organization.active}
						insetChildren={!organization.active}
						onClick={() => {
							if (organization.active) return;
							
							this.changeOrganization(organization.id);
						}}
					/>
				);
			}),
			<Divider inset={true} key="divider2" />,
			<MenuItem
				key="other"
				primaryText="Other"
				leftIcon={<Add />}
				insetChildren={true}
				onClick={() => {
					this.props.hideSettings();
					this.setState({
							showOtherOrganizations: true,
					});
				}}
			/>,
			<Divider key="divider3" />,
		];

		return (
		<React.Fragment>
			<Popover
				open={this.props.menuOpen}
				anchorEl={this.props.anchor}
				anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
				targetOrigin={{horizontal: 'left', vertical: 'top'}}
				onRequestClose={this.props.hideSettings}
				animation={PopoverAnimationVertical}
			>
				<Menu>
					<MenuItem
						primaryText="Profile Settings"
						onClick={() => {
							this.props.history.push('/profile');
							this.props.hideSettings();
						}}
					/>
					<MenuItem
						primaryText="Change organization"
						rightIcon={this.state.showOrganizations ? <ArrowDropUp /> : <ArrowDropDown />}
						disabled={!this.state.loaded}
						onClick={() => {this.setState(
							(prevState) => ({
								showOrganizations: !prevState.showOrganizations,
							})
						);}}
					/>

					{this.state.showOrganizations ? listOfOrganizations : null}
					
					<MenuItem
						primaryText="Logout"
						onClick={() => {
							this.props.history.push('/logout');
							this.props.hideSettings();
						}}
					/>
				</Menu>
			</Popover>

			<SelectOrganization
				show={this.state.showOtherOrganizations}
				close={() => { this.setState({ showOtherOrganizations: false }); }}
				changeOrganization={this.changeOrganization}
				reload={this.loadOrganizations}
				myOrganizations={this.state.organizations.map(o => o.id)}
				changedError={this.state.changedError}
				saveChange={this.saveChange}
			/>
		</React.Fragment>
		);
	}
}

export default withRouter(SettingsMenu);
