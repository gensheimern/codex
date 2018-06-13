import React from 'react';
import "./Lunch.css";
import { withRouter } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Card,CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import { Link } from 'react-router-dom';
import ImageUpload from './ImageUpload';
import {Tabs, Tab} from 'material-ui/Tabs';
import DatePicker from './CreateEventDatePicker';
import axios from 'axios';



class Lunch extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          email: "",
          password: "",
          errorPrompt: "",
          uploadFile: null,
          open: false,
          errorText: "",
          value:1,
          yearFrom:'',
          monthFrom:'',
          dayFrom:'',
      };
      this.callbackDateFrom = this.callbackDateFrom.bind(this);
      this.handleFile = this.handleFile.bind(this);

  }

  handleOpen = () => {
      this.setState({open: true});
  };

  handleClose = () => {
      this.setState({open: false});
  };

  handleFile(file) {
      this.setState({uploadFile: file});
  }

  handleSubmit = () => {
    const fd = new FormData();
    const config = {
               headers: { 'content-type': 'multipart/form-data' }
           }

    fd.append('image',this.state.uploadFile[0],"lunch_" + this.state.uploadFile[0].name);
    axios.post('http://localhost:5000/api/upload',fd, config)
      .then(res => {
          console.log(res);
      });
  }

  handleChange = name => e => {
  this.setState({
    [name]: e.target.value
  });
}

callbackDateFrom(event, mydate){
  this.setState({
    yearFrom:mydate.getUTCFullYear(),
    dayFrom:mydate.getUTCDate()+1,
    monthFrom:mydate.getUTCMonth()+1,
  });
}

showPreview(){
  if(this.state.uploadFile !== null){
    return <img style={{width:"100%", height:"auto"}} src={this.state.uploadFile[0].preview} />
  } else {
    return <ImageUpload handleFile={this.handleFile} />

  }
}




  handleActive(tab) {
  alert(`A tab with this route property ${tab.props['data-route']} was activated.`);
}

Tab () {
  return(
  <Tabs>
    <Tab label="Upload" >
      <div>
        <div className="DateWrapper">
          <div className="singleDateWrapper">
            <DatePicker date={this.callbackDateFrom} hintText={"Pick your Date"} />
          </div>
        </div>
        <div style={{clear:"both"}}></div>
      </div>
      {this.showPreview()}
    </Tab>
    <Tab label="By Hand" >
      <div>
        <div className="DateWrapper">
            <DatePicker date={this.callbackDateFrom} hintText={"Pick your Date"} />
          </div>
        <TextField
                style={styles.textField}
                hintText="Type your text"
                multiLine={true}
        />
        <TextField
                style={styles.textField}
                hintText="Price"
        />
      </div>
    </Tab>
  </Tabs>
)
};


  render() {
        return(
            <div className = "loginBg">
            <form className ="login" >
                <div>
                    <Paper style={styles.paperStyle} zDepth= {1}/>
                </div>
                <center>
                    <h3 className = "h3header">Lunchplannner</h3>
                </center>
                <Card className = "loginCard">
                <CardText>
                <h2 className = "h2header">Insert your Lunch for today</h2>

                {this.Tab()}

          <div className="errorText"> {this.state.errorText} </div>

                <br/>
                <br/>
                <RaisedButton
					backgroundColor="#b9b9b9"
					type="submit"
					label="Send"
					primary={true}
					style = {styles.loginButton}
				/>
                </CardText>
                </Card>
            </form>
            </div>
            );

	}

}

const styles ={

    paperStyle:{
height: 62,
width: 62,
borderRadius: 7,
display: 'block',
marginLeft: 'auto',
marginRight: 'auto',
    },

    textField:{
width: '90%',
marginLeft: '5%',
marginRight: '5%',
    },

    loginButton:{
heigt: 40.57,
width: '30%',
borderRadius: 3,
boxShadow: "inset 0 1 3 0 rgba(0,0,0,0.5),0 1 2 0 rgba(0,0,0,0.5)",
display: 'block',
marginLeft: 'auto',
marginRight: 'auto',
},
}


export default withRouter(Lunch);
