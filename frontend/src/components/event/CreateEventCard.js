import React from 'react';
import {Card, CardActions,  CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import CreateEventTimePicker from './CreateEventTimePicker';
import CreateEventDatePicker from './CreateEventDatePicker';
import Maps from './GooglePlaces';
import Dialog from 'material-ui/Dialog';
import Children from './children';


const eventImages = [
{
    img: "strandbar.jpg",
    title:"strandbar",
},
{
    img: "monsterag.jpg",
    title:"strandbar",
},
{
    img: "strandbar.jpg",
    title:"strandbar",
},
{
    img: "strandbar.jpg",
    title:"strandbar",
},
]
export default class CreateEventCard extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      address: "",
      open:false,
    }

    this.callbackAddress = this.callbackAddress.bind(this);
  }

  handleOpen = () => {
	this.setState({open: true});
};

handleClose = () => {
	this.setState({open: false});
};


  callbackAddress(myAddress){
    console.log(myAddress);
    this.setState({address:myAddress});
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
                children={Children}
              >
                < Children />
            </Dialog>


        <CardMedia
          overlayContentStyle={{padding:"2px"}}
          overlay={<CardTitle onClick={this.handleOpen} className="createEventEditPicture" subtitle= "Edit group picture" />}
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
