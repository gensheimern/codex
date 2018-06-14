import React from 'react';
import Paper from 'material-ui/Paper';
import './LunchFeed.css';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';

const style = {
  height: "300px",
  width: "90%",
  margin: "4%",
  textAlign: 'center',
  display: 'inline-block',
};

class LunchPaper extends React.Component {

constructor(props){
  super(props);
  this.state = {
    openImage: false,
    openAddress:false,
  }
}

handleOpenImage = () => {
  this.setState({openImage: true});
};

handleCloseImage = () => {
  this.setState({openImage: false});
};

handleOpenAddress = () => {
  this.setState({openImage: true});
};

handleCloseAddress = () => {
  this.setState({openImage: false});
};

checkForImage = () => {
  console.log(this.props.image);
  if(this.props.image === null){
    return ("weblogin.jpg")
  }else {
    return ("lunch_"+this.props.image)
  }
}

checkForText = () => {
  console.log(this.props.text);
  if(this.props.text === ""){
    return (
      <div>
      this.props.name + " uploaded his lunch as a picture. Please Click here to see more info"
      <RaisedButton onClick={this.handleOpenImage} label="LUNCHCARD" secondary={true} style={{marginTop:"30px",}} />
      </div>
    )
  }else {
    return (this.props.text)
  }
}


render() {
  return(
  <div>
  <Dialog
    modal={false}
    open={this.state.openImage}
    onRequestClose={this.handleCloseImage}
  >
  <img src={"lunch_" + this.props.image} alt="LunchImageDialog" className="LunchImageDialog"/>
  </Dialog>
  <Dialog
    modal={false}
    open={this.state.openAddress}
    onRequestClose={this.handleCloseAddress}
  >
  <img src={"lunch_" + this.props.image} alt="LunchImageDialog" className="LunchImageDialog"/>
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
    </Paper>
  </div>
);
}
}

export default LunchPaper;
