import React from 'react';
import Events from './event/Events';
import Personal from './MenuComponents/SidebarContentCalender';
import CreateEvent from './activity/CreateActivity';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class MainContent extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		displayedContent:"1",
		};
	}

	render() {

		console.log(this.props.mainContentNumber);

		if(this.props.mainContentNumber === 0){
		return (
			<div style={{
				width: this.props.width,
				marginTop: "0%",
				float: "left",
				height: "100%",
				overflowY: "scroll",
			}}>
				<Events />
			</div>
		);
	}else if(this.props.mainContentNumber === 1){
		return (
			<div style={{
				width: this.props.width,
				marginTop:"0%",
				margin:"5%",
				float: "left",
				height: "100%",
				overflowY: "scroll",
			}}>
				<Personal />
			</div>
		);
	}else	if(this.props.mainContentNumber === 2){
		return (
			<div style={{
				width: this.props.width,
				marginTop: "0%",
				float: "left",
				height: "100%",
				overflowY: "scroll",
				margin:"10%"
			}}>
			<MuiThemeProvider>
				<CreateEvent/>
			</MuiThemeProvider>
			</div>);
	}else	if(this.props.mainContentNumber === 3){
		return (
			<div style={{
				width: this.props.width,
				marginTop: "0%",
				float: "left",
				height: "100%",
				overflowY: "scroll",
			}}>
				<Events />
			</div>);
	}else	if(this.props.mainContentNumber === 4){
			return (
				<div style={{
					width: this.props.width,
					marginTop: "0%",
					float: "left",
					height: "100%",
					overflowY: "scroll",
				}}>
					<Events />
				</div>);
		}else	if(this.props.mainContentNumber === 5){
				return (
					<div style={{
						width: this.props.width,
						marginTop: "0%",
						float: "left",
						height: "100%",
						overflowY: "scroll",
					}}>
						<Events />
					</div>);
			}

	}
}