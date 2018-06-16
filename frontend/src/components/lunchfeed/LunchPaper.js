import React from 'react';
import Paper from 'material-ui/Paper';
import './LunchFeed.css';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import TimePicker from 'material-ui/TimePicker';
import config from '../../config';
import { withRouter } from 'react-router-dom';



const style = {
  height: "300px",
  width: "90%",
  marginTop: "6%",
  marginBottom: "4%",
  marginLeft: "4%",
  marginRight: "4%",
  textAlign: 'center',
  display: 'inline-block',
};

class LunchPaper extends React.Component {

constructor(props){
  super(props);
  this.state = {
    openImage: false,
    openAddress:false,
    openCreate:false,
  }
}

handleOpenImage = () => {
  this.setState({openImage: true});
};

handleCloseImage = () => {
  this.setState({openImage: false});
};

handleOpenAddress = () => {
  this.setState({openAddress: true});
};

handleCloseAddress = () => {
  this.setState({openAddress: false});
};

handleCloseCreate = () => {
  this.setState({openCreate: false});
};

handleOpenCreate = () => {
  this.setState({openCreate: true});
};

checkForImage = () => {
  if(this.props.image === null){
    return ("weblogin.jpg")
  }else {
    return ("lunch_"+this.props.image)
  }
}

checkForDialogImage = () => {
  console.log(this.props.image);
  if(this.props.image === null){
    return null
  }else {
    return   <img src={"lunch_" + this.props.image} alt="LunchImageDialog" className="LunchImageDialog"/>

  }
}

checkForText = () => {
  console.log(this.props.text);
  if(this.props.text === ""){
    return (
      <div>
      {this.props.name + " uploaded his lunchcard as a picture. Please Click above to see more info"}
      </div>
    )
  }else {
    return (this.props.text)
  }
}

handleCreateEvent = (event,time) => {
  let year = new Date(time).getUTCFullYear();
  let month =new Date(time).getUTCMonth() + 1;
  let day = new Date(time).getUTCDate();
  let hour = new Date(time).getUTCHours();
  let minute = new Date(time).getUTCMinutes();

  fetch(config.apiPath + "/activity", {
    method: 'POST',
    body: JSON.stringify({
      description:" ",
      name: this.props.name,
      place: this.props.place + " " + this.props.street + " " + this.props.streetNumber,
      time: year + "-" + month + "-" + day + " " + hour + ":" + minute,
      event: false,
      private: false,
      banner: (this.props.image === null) ? "weblogin.jpg" : this.props.image,
      meetingPoint: this.checkForImage,
      timeMeetingPoint:  year + "-" + month + "-" + day + " " + hour + ":" + minute,
      maxParticipants: 0,
      participants: [],
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
      this.props.history.push('/feed');
    }
  });

}



render() {
  return(
  <div>
  <div style={{display:"none"}}>
  <TimePicker
      ref={ref => this.timePickerRef = ref}
      hintText="Custom Labels"
      minDate={new Date()}
      onShow={this.onShow}
      onChange={this.handleCreateEvent}
      okLabel="OK"
      cancelLabel="CANCEL"
   />

  </div>
  <Dialog
    titleStyle={{color:"#1ea185"}}
    autoScrollBodyContent={true}
    modal={false}
    open={this.state.openAddress}
    onRequestClose={this.handleCloseAddress}
    title={this.props.name}
  >
    <div className="LunchDialogAdress">
    {this.props.zipcode}<br />
    {this.props.place} <br />
    {this.props.street + " " + this.props.streetNumber}
    <br />
    <br />
    </div>
    {this.checkForDialogImage()}
  </Dialog>
   <Paper style={style} zDepth={3} >
    <div className="LunchImageContainer">
      <img src={this.checkForImage()} alt="LunchImage" className="LunchImage"/>
      <div className="LunchImageMiddle">
        <div className="LunchImageText" onClick={this.handleOpenAddress}>
          <h4> {this.props.name} </h4>
        </div>
      </div>
    </div>
    <div className="LunchTextBody">
      <div className="text">
       {this.checkForText()}
      </div>
    </div>
    <RaisedButton onClick={e => this.timePickerRef.openDialog()} label="CREATE EVENT" secondary={true} style={{marginTop:"10px",width:"100%"}} />

    </Paper>
  </div>
);
}
}

export default withRouter(LunchPaper);
