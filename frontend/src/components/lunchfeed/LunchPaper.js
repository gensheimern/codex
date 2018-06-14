import React from 'react';
import Paper from 'material-ui/Paper';
import './LunchFeed.css';

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

  }
}

render() {
  return(
  <div>
    <Paper style={style} zDepth={3} >
    <div className="LunchImageContainer">
      <img src="weblogin.jpg" alt="LunchImage" className="LunchImage"/>
      <div className="LunchImageMiddle">
        <div className="LunchImageText">
          <h1> jojojo </h1>
        </div>
      </div>

    </div>

    </Paper>
  </div>
);
}
}

export default LunchPaper;
