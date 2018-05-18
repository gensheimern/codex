import React from 'react';
import {Card, CardActions,  CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import CreateEventTimePicker from './CreateEventTimePicker';
import CreateEventDatePicker from './CreateEventDatePicker';
import Maps from './GooglePlaces';

  function constructor(){
  this.state = {
    address: "",
  }
}

  function callbackAddress(myAddress){
    console.log(myAddress);
    this.setState({address:myAddress});
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



const CardExampleWithAvatar = () => (
  <Card>
    <CardMedia
      overlayContentStyle={{padding:"2px"}}
      overlay={<CardTitle className="createEventEditPicture" subtitle= "Edit group picture" />}
    >
      <img src="strandbar.jpg" alt="" />
    </CardMedia>
    <CardText>

    <Maps myAddress={this.callbackAddress} value="40.000" onChange={value => this.setSTate({value})} >
    {renderFunc}
    </Maps>

    <div className="timeDatePicker">
        <div className="timepicker"> <CreateEventTimePicker /> </div>
        <div className="datepicker"> <CreateEventDatePicker /> </div>
        <div style={{clear:"both"}}></div>
    </div>
    <TextField
    floatingLabelFixed={true}
        floatingLabelText="Meeting Point"
        hintText="COA Restaurant"
      /><br />

    </CardText>
  </Card>
);

export default CardExampleWithAvatar;
