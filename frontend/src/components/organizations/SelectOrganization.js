import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import config from '../../config';
import JoinOrganization from '../organizations/JoinOrganization';
import AddOrganization from './AddOrganization';

export default class SelectOrganization extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			organizations: [],
			loaded: false,
			error: null,
			password: '',
			selected: -1,
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

	back() {
		this.setState({
			selected: -1,
		});
	}

	render() {
		const organizations = this.state.organizations.filter((organization) => {
			return !this.props.myOrganizations.includes(organization.id);
		});

		const back = this.state.selected !== -1
			? <FlatButton
				label="Back"
				primary={true}
				onClick={this.back}
			/>
			: null;

		const actions = [
			back,
			<FlatButton
				label="Cancel"
				primary={true}
				onClick={this.props.close}
			/>,
		];

		return (
			<Dialog
				title="Select Organization"
				modal={false}
				open={this.props.show}
				onRequestClose={this.props.close}
				autoScrollBodyContent={true}
				actions={actions}
			>
				{this.state.selected === -1 &&
				organizations.map(organization => (
					<div
						key={organization.id}
						style={{
							clear: 'both',
							overflow: 'hidden',
						}}
					>
						<p
							style={{
								float: 'left',
								margin: '2%',
							}}
						>
							{organization.name} - {organization.description}
						</p>
						<RaisedButton
							label="Join"
							onClick={() => {
								this.setState({
									selected: organization.id,
								});
							}}
							style={{
								float: 'right',
							}}
						/>
					</div>
				))}
				{organizations.length === 0 &&
					<p style={{
						width: '100%',
						textAlign: 'center',
					}}>No organizations yet. Create one.</p>
				}
				{this.state.selected === -1 &&
				<RaisedButton
					label="Create new"
					primary={true}
					onClick={() => {
						this.setState({
							selected: 0,
						});
					}}
					style={{
						float: 'right',
					}}
				/>}

				{this.state.selected > 0 &&
				<JoinOrganization
					show={this.state.selected !== -1}
					id={this.state.selected}
					organization={this.state.organizations.filter((element) => element.id === this.state.selected)[0]}
					changeOrganization={this.props.changeOrganization}
					back={this.back}
					changedError={this.props.changedError}
				/>
				}

				{this.state.selected === 0 &&
				<AddOrganization
					back={this.back}
				/>
				}
			</Dialog>
		);
	}
}
