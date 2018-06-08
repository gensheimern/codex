import React from 'react';
import {Card, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import CreateEventTimePicker from './CreateEventTimePicker';
import CreateEventDatePicker from './CreateEventDatePicker';
import Maps from './GooglePlaces';
import Dialog from 'material-ui/Dialog';
import CollapseFA from 'react-icons/lib/fa/angle-down';
import ReminderToggle from './ReminderToggle';
import InvitePeople from './CreateEventInvitePeople';
import InviteChip from './CreateEventChip';
import config from '../../config';
import Snackbar from 'material-ui/Snackbar';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import scrollIntoView from 'smooth-scroll-into-view-if-needed';
import { withRouter } from 'react-router-dom';

const eventImages = [
	{
		img: "asia_card@3x.jpg",
		title:"ASIAN FODD",
	}, {
		img: "baker_cardx3.jpg",
		title:"BAKER",
	}, {
		img: "burger_card@3x.jpg",
		title:"BURGER",
	}, {
		img: "coffee_cardx3.jpg",
		title:"COFFEE",
	}, {
		img: "fisch_card@3x.jpg",
		title:"FISH",
	}, {
		img: "grillen_card@3x.jpg",
		title:"GRILL",
	}, {
		img: "bratwurst_card@3x.jpg",
		title:"SNACK",
	}, {
		img: "kebab_card@3x.jpg",
		title:"KEBAB",
	}, {
		img: "fastfood_card@3x.jpg",
		title:"FAST FOOD",
	}, {
		img: "pasta_card@3x.jpg",
		title:"PASTA",
	}, {
		img: "pizza_card@3x.jpg",
		title:"PIZZA",
	}, {
		img: "steak_card@3x.jpg",
		title:"STEAK",
	}, {
		img: "sushi_card@3x.jpg",
		title:"SUSHI",
	}, {
		img: "wraps_card@3x.jpg",
		title:"WRAP",
	},
]

class CreateEventCard extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			address: [],
			addressString: '',
			addressValue: '',
			meetingPoint: '',
			open: false,
			cardTitle: 'Edit group picture',
			cardImage: 'standard.jpg',
			collapse: false,
			invitePeople: [],
			invitePeopleID: [],
			time: '',
			date: new Date(),
			reminder: false,
			private: false,
			meetingPointValue: '',
			maxPeopleValue: '',
			descriptionValue: '',
			year: (new Date()).getUTCFullYear(),
			month: (new Date()).getUTCMonth(),
			day: (new Date()).getUTCDate(),
			hours: '12',
			minutes: '0',
			meetingHours:'11',
			meetingMinutes:'45',
			snackbaropen: false,
			errorCreate: '',
			cardspace: '',
		}

		this.toggleCollapse = this.toggleCollapse.bind(this);
		this.callbackAddress = this.callbackAddress.bind(this);
		this.callBackInvitePeople = this.callBackInvitePeople.bind(this);
		this.callbackTime = this.callbackTime.bind(this);
		this.callbackTimeMeetingPoint = this.callbackTimeMeetingPoint.bind(this);
		this.callbackDate = this.callbackDate.bind(this);
		this.callbackToggleReminder = this.callbackToggleReminder.bind(this);
		this.callbackTogglePrivate = this.callbackTogglePrivate.bind(this);
		this.handleChangeMeetingPoint = this.handleChangeMeetingPoint.bind(this);
		this.handleChangeDescription = this.handleChangeDescription.bind(this);
		this.handleChangeMaxPeople = this.handleChangeMaxPeople.bind(this);
		this.handleChangeAddressValue = this.handleChangeAddressValue.bind(this);
		this.scrolltoBottom = this.scrolltoBottom.bind(this);
	}

	handleOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	callBackInvitePeople(invitePeople){
		this.setState({ invitePeople });
	}

	callbackAddress(myAddress){
		this.setState({ address: myAddress.split(',') });
	}

	callbackTime(event, time){
		this.setState({
			hours: time.getUTCHours()+2,
			minutes: time.getUTCMinutes(),
		});
	}
	callbackTimeMeetingPoint(event, time) {
		this.setState({
			meetingHours: time.getUTCHours()+2,
			meetingMinutes: time.getUTCMinutes(),
		});
	}

	callbackDate(event, mydate){
		this.setState({
			year:mydate.getUTCFullYear(),
			day:mydate.getUTCDate()+1,
			month:mydate.getUTCMonth()+1,
		});

	}

	callbackToggleReminder(event, isInputChecked){
		this.setState({ reminder: isInputChecked });
	}

	callbackTogglePrivate(event, isInputChecked){
		this.setState({ private: isInputChecked });
	}

	cardImage(title, img){
		this.handleClose();
		this.setState({ cardTitle: title, cardImage: img });
	}

	toggleCollapse(){
		if (this.state.collapse){
			this.setState({ collapse: false });
		} else {
			this.setState({ collapse: true });
			this.scrolltoBottom();
		}

	}


	handleChangeMeetingPoint(e){
		this.setState({ meetingPoint: e.target.value });
	}

	handleChangeMaxPeople(e){
		this.setState({ maxPeopleValue: e.target.value });
	}
	handleChangeAddressValue(e){
		this.setState({ addressValue: e.target.value });
	}
	handleChangeDescription(e){
		this.setState({ descriptionValue: e.target.value });
	}

	combineAddress(){
		if (!this.state.address[1]) {
			return this.state.address[0];
		} else {
			return (this.state.address[1] + " " + this.state.address[2]);
		}
	}

	getMaxPeopleValue() {
		if(this.state.maxPeopleValue === ''){
			return '0'
		} else {
			return this.state.maxPeopleValue
		}
	}

	renderSnackbar = () => {
		this.setState({
			snackbaropen: true,
		});
	};

	renderSnackbarClose = () => {
		this.setState({
			snackbaropen: false,
		});
	};

	handleSubmit = () => {
		this.createEvent();
	};

	scrolltoBottom(){
		let node = document.getElementById('createbutton')
		node.scrollIntoView({behavior:'smooth'})
	}

	createEvent() {
		let userArray = this.state.invitePeople.map((userid) => {
					return userid.ValueKey
		 });

		if(parseInt(this.getMaxPeopleValue(), 10) > userArray.length +1 || parseInt(this.getMaxPeopleValue(), 10) === 0 ){

		fetch(config.apiPath + "/activity", {
			method: 'POST',
			body: JSON.stringify({
				description: this.state.descriptionValue,
				name: this.state.address[0],
				place: this.combineAddress(),
				time: this.state.year + "-" + this.state.month + "-" + this.state.day + " " + this.state.hours + ":" + this.state.minutes,
				event: false,
				private: this.state.private,
				banner: this.state.cardImage,
				meetingPoint: this.state.meetingPoint,
				timeMeetingPoint: this.state.year + "-" + this.state.month + "-" + this.state.day + " " + this.state.meetingHours + ":" + this.state.meetingMinutes,
				maxParticipants: parseInt(this.getMaxPeopleValue(), 10),
				participants: userArray,
			}),
			headers: {
				'Content-Type': 'application/json',
				'X-Access-Token': localStorage.getItem('apiToken'),
			}
		})
		.then((res) => {
			if (!res.ok || res.status !== 201) {
				// handle error
			} else {
				this.renderSnackbar();
				this.props.history.push('/feed');
			}
		});
	} else {
		this.setState({errorCreate: 'Maximum of ' + parseInt(this.getMaxPeopleValue(), 10) + ' participants' });

	}

	let emails = this.state.invitePeople.map((e) => {
		return(e.ValueEmail + ",")
	});

	fetch(config.apiPath + "/sendmail/joinevent", {
		method: 'POST',
		body: JSON.stringify({
			email: emails,
			event: this.state.address[0],
			time: this.state.year + "-" + this.state.month + "-" + this.state.day + " " + this.state.hours + ":" + this.state.minutes,

		}),
		headers: {
			'Content-Type': 'application/json',
			'X-Access-Token': localStorage.getItem('apiToken'),
		}
	})
	.then((res) => {
		if (!res.ok || res.status !== 201) {
			// handle error
		} else {
			this.renderSnackbar();
			this.props.history.push('/feed');
		}
	});


		}


	collapsedContent() {
		if(this.state.collapse){
			let images = this.state.invitePeople.map((image,index) => {
				// return  <img key={image} src={image} />
				return (<InviteChip key={"chip" + index} name={image.textKey} peopleImage={image.ValueImage} />)
			});

			return(
				<div className="collapsedContentWrapper">
					<div className="meetingPoint">
							<TextField
							floatingLabelFixed={true}
							floatingLabelFocusStyle={{ color: 'rgb(30, 161, 133)' }}
							underlineFocusStyle={{ borderColor: 'rgb(30, 161, 133)' }}
							floatingLabelText="Meeting Point"
							hintText="at the address point"
							value={this.state.meetingPoint}
							onChange={this.handleChangeMeetingPoint}
							style={{width:'100%'}}
							/>
					</div>
					<br/>
						<div className="timepickerMeeting">
								<CreateEventTimePicker time={this.callbackTimeMeetingPoint} />
						</div>
						<div className="collapsedContendReminder">
						< ReminderToggle
							label={'Reminder'}
							toggle={this.callbackToggleReminder}
						/>
						< ReminderToggle
							label={'Private'}
							toggle={this.callbackTogglePrivate}
						/>
						</div>
						<TextField
							fullWidth={true}
							floatingLabelFixed={true}
							underlineFocusStyle={{borderColor:"rgb(30, 161, 133)"}}
							hintText="Max. People"
							value={this.state.maxPeopleValue}
							onChange={this.handleChangeMaxPeople}
						/>
					<TextField
						fullWidth={true}
						underlineFocusStyle={{borderColor:"rgb(30, 161, 133)"}}
						floatingLabelFixed={true}
						hintText="Description"
						value={this.state.descriptionValue}
						onChange={this.handleChangeDescription}
					/>
					<InvitePeople people={this.callBackInvitePeople}/>
					{images}
				</div>
			);
		}
	}

	render() {
		console.log(this.state.invitePeople);
		console.log(this.state.invitePeopleID);
		return (<div>
		<Paper className="createEventWrapper">
			<Card className="createEventCardWrapper">
				<Snackbar
					open={this.state.snackbaropen}
					message="Event added to your calendar"
					autoHideDuration={4000}
					onRequestClose={this.renderSnackbarClose}
				/>

				<Dialog
					className="createEventPickImageWrapper"
					autoScrollBodyContent={true}
					modal={false}
					open={this.state.open}
					onRequestClose={this.handleClose}
					contentStyle={{width:"100%",maxWidth:"none",padding:"0px",}}
					bodyStyle={{padding:"0px",}}
					autoDetectWindowHeight={true}
				>
					{eventImages.map((data,index) => (
						<img
							key={"profilePicture" + index}
							src={data.img}
							onClick={() => this.cardImage(data.title,data.img)}
							height="100px"
							widht="100px"
							alt=""
						/>
					))}
				</Dialog>
				<CardMedia
					overlayContentStyle={{padding:"2px"}}
					overlay={
						<CardTitle
							onClick={this.handleOpen}
							className="createEventEditPicture"
							subtitle={this.state.cardTitle}
						/>}
				>
					<img   src={this.state.cardImage} alt="" />
				</CardMedia>

				<CardText>
					<Maps
						callbackAdress={this.handleChangeAddressValue}
						myAddress={this.callbackAddress}
						>
						{renderFunc}
					</Maps>
					<div className="datepicker">
							<CreateEventDatePicker date={this.callbackDate} />
					</div>
					<div className="timeDatePicker">
						<div className="timepicker">
							<CreateEventTimePicker time={this.callbackTime} />
						</div>
						<div style={{clear: 'both'}}/>
						</div>
					<div
						className="MoreOptionsCreateEvent"
						onClick={this.toggleCollapse}
					>
						More Options <CollapseFA />
					</div>
					<div style={{
						clear: 'both',
						paddingBottom: '20px',
					}} />
					{ this.collapsedContent() }
				</CardText>
				<div id="ok" style={{color:'red', textAlign:"center"}}>{this.state.errorCreate} </div>
			</Card>
			<FlatButton
				className="createEventButton"
				onClick={this.handleSubmit}
				label="Create your event"
				fullWidth={true}
			/>
		</Paper>
			<div id="createbutton"> </div>
		</div>
		);
	}
}

const renderFunc = ({ getInputProps, getSuggestionItemProps, suggestions }) => (
	<div className="autocomplete-root">
		<input {...getInputProps()} />
		<div className="autocomplete-dropdown-container">
			{suggestions.map(suggestion => (
				<div {...getSuggestionItemProps(suggestion)}>
					<span>{suggestion.description}</span>
				</div>
			))}
		</div>
	</div>
);

export default withRouter(CreateEventCard);
