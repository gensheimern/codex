import React from 'react';
import {Card, CardActions,  CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import CreateEventTimePicker from './CreateEventTimePicker';
import CreateEventDatePicker from './CreateEventDatePicker';

const CardExampleWithAvatar = () => (
  <Card>
    <CardMedia
      overlayContentStyle={{padding:"2px"}}
      overlay={<CardTitle className="createEventEditPicture" subtitle= "Edit group picture" />}
    >
      <img src="strandbar.jpg" alt="" />
    </CardMedia>
    <CardText>
          <TextField
          floatingLabelFixed={true}
              hintText="COA Restaurant"
              floatingLabelText="Name of Event/Restaurant"
            /><br />
          <div className="timeDatePicker">
              <div className="timepicker"> <CreateEventTimePicker /> </div>
              <div className="datepicker"> <CreateEventDatePicker /> </div>
              <div style={{clear:"both"}}></div>
          </div>
          <TextField
          floatingLabelFixed={true}
                floatingLabelText="Address"
                hintText="Mannheim Am Ried 123"
          /><br />
          <TextField
          floatingLabelFixed={true}
              floatingLabelText="Meeting Point"
              hintText="COA Restaurant"
            /><br />

    </CardText>
  </Card>
);

export default CardExampleWithAvatar;
