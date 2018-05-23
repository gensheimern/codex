import React from 'react';
import {Card, CardActions,  CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import CreateEventTimePicker from './CreateEventTimePicker';
import CreateEventDatePicker from './CreateEventDatePicker';
import Maps from './GooglePlaces';
import Dialog from 'material-ui/Dialog';
import CollapseFA from 'react-icons/lib/fa/angle-down';
import ReminderToggle from './ReminderToggle';
import InvitePeople from './CreateEventInvitePeople';
import InviteChip from './CreateEventChip';

const eventImages = [
{
    img: "strandbar.jpg",
    title:"Pizza",
},
{
    img: "monsterag.jpg",
    title:"Döner",
},
{
    img: "strandbar.jpg",
    title:"Nudels",
},
{
    img: "strandbar.jpg",
    title:"bier",
},
]
export default class CreateEventCard extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      address: "",
      open:false,
      cardTitle:"Edit group picture",
      cardImage: "events.jpg",
      collapse: false,
      invitePeople:[],
    }
    this.toggleCollapse = this.toggleCollapse.bind(this);
    this.callbackAddress = this.callbackAddress.bind(this);
    this.callBackInvitePeople = this.callBackInvitePeople.bind(this);
  }

  handleOpen = () => {
	this.setState({open: true});
};

handleClose = () => {
	this.setState({open: false});
};

  callBackInvitePeople(people){
    this.setState({invitePeople: people})
    console.log(this.state.invitePeople);
  }
  callbackAddress(myAddress){
    this.setState({address:myAddress});
  }

  cardImage(title, img){
    this.handleClose();
    this.setState({cardTitle: title, cardImage:img });
  }

  toggleCollapse(){
    if(this.state.collapse){
      this.setState({collapse:false});
    }else{
      this.setState({collapse:true});
    }
  }

  collapsedContend(){
    if(this.state.collapse){
     let images =  this.state.invitePeople.map( image => {
    //    return  <img key={image} src={image} />
        return (< InviteChip name={image.textKey} peopleImage={image.ValueImage} />)
      });
      console.log(images);
      return(
          <div className="collapsedContentWrapper">
            <div className="collapsedContendReminder">
              < ReminderToggle />
              <TextField
              style={{widht:"200px"}}
              floatingLabelFixed={true}
              underlineFocusStyle={{borderColor:"rgb(30 161 133)"}}
              hintText="Max. People"
              />
              </div>
              <TextField
                underlineFocusStyle={{borderColor:"rgb(30 161 133)"}}
                floatingLabelFixed={true}
                hintText="Description"
              />
              <InvitePeople people={this.callBackInvitePeople}/>
              {images}


          </div>
      )
    }
  }



  render() {
    const style = {
  marginRight: 20,
};
    return (



      <Card >
            <Dialog
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}
                contentStyle={{width:"100%",maxWidth:"none",}}
                bodyStyle={{padding:"0px",}}

              >
                {eventImages.map((data) => (
                  <img src={data.img} onClick={()=>this.cardImage(data.title,data.img)} height="100px" widht="100px"  />
                ))}
            </Dialog>


        <CardMedia
          overlayContentStyle={{padding:"2px"}}
          overlay={<CardTitle onClick={this.handleOpen} className="createEventEditPicture" subtitle={this.state.cardTitle} />}
        >
          <img src={this.state.cardImage} alt="" />
        </CardMedia>
        <CardText>

        <div className="timeDatePicker">
            <div className="timepicker"> <CreateEventTimePicker /> </div>
            <div className="datepicker"> <CreateEventDatePicker /> </div>
            <div style={{clear:"both"}}></div>
        </div>

        <Maps myAddress={this.callbackAddress} onChange={value => this.setSTate({value})} >
        {renderFunc}
        </Maps>


        <TextField
            floatingLabelFixed={true}
            floatingLabelFocusStyle={{color:"rgb(30 161 133)"}}
            underlineFocusStyle={{borderColor:"rgb(30 161 133)"}}
            floatingLabelText="Meeting Point"
            hintText="COA Restaurant"
          /><br />

          <div className="MoreOptionsCreateEvent" onClick={this.toggleCollapse}> More Options <CollapseFA /> </div>
          <div style={{clear:"both",paddingBottom:"20px"}} />
          {this.collapsedContend()}
        </CardText>
      </Card>
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
