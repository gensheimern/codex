import React from 'react';
import "./Lunch.css";
import { withRouter } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Card,CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import ImageUpload from './ImageUpload';
import {Tabs, Tab} from 'material-ui/Tabs';
import DatePicker from './CreateEventDatePicker';
import axios from 'axios';
import config from '../../config';


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
          yearTo: '',
          monthTo: '',
          dayTo: '',
          textValue:'',
          priceValue:'',
      };
      this.callbackDateTo = this.callbackDateTo.bind(this);
      this.callbackDateFrom = this.callbackDateFrom.bind(this);
      this.handleFile = this.handleFile.bind(this);
      this.handleTextChange = this.handleTextChange.bind(this);
      this.handlePriceChange = this.handlePriceChange.bind(this);

  }

  resetState = () => {
    this.setState({
      email: "",
      password: "",
      errorPrompt: "",
      uploadFile: null,
      open: false,
      errorText: "",
      value:1,
      textValue:'',
      priceValue:'',
    })
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

    if(this.state.uploadFile !== null){
    const fd = new FormData();
    const configAxios = {
               headers: { 'content-type': 'multipart/form-data' }
           }

    fd.append('image',this.state.uploadFile[0],"lunch_" + this.state.uploadFile[0].name);
    axios.post(config.apiPath + "/upload/lunch",fd, configAxios)
      .then(res => {
          // console.log(res);
      });
    }
      fetch(config.apiPath + "/restaurant/lunch", {
  			method: 'POST',
  			body: JSON.stringify({
          TimeFrom: this.state.yearFrom + "-" + this.state.monthFrom + "-" + this.state.dayFrom,
          TimeTo: this.state.yearTo + "-" + this.state.monthTo + "-" + this.state.dayTo,
          LunchImage: this.state.uploadFile ? this.state.uploadFile[0].name : null ,
          LunchText: this.state.textValue,
          Price: this.state.priceValue,

  			}),
  			headers: {
  				'Content-Type': 'application/json',
  				'X-Access-Token': localStorage.getItem('apiToken'),
  			}
  		})
  		.then((res) => {
  			if (!res.ok || res.status !== 201) {
  				// handle error
          throw new Error("invalid iwas");
  			}
        this.resetState();
  });
}

  handleTextChange(e){
    this.setState({ textValue: e.target.value });
  }

  handlePriceChange(e){
    this.setState({ priceValue: e.target.value });
  }

callbackDateFrom(event, mydate){
  this.setState({
    yearFrom:mydate.getUTCFullYear(),
    dayFrom:mydate.getUTCDate()+1,
    monthFrom:mydate.getUTCMonth()+1,
  });
}

callbackDateTo(event, mydate){
  this.setState({
    yearTo:mydate.getUTCFullYear(),
    dayTo:mydate.getUTCDate()+1,
    monthTo:mydate.getUTCMonth()+1,
  });
}

showPreview(){
  if(this.state.uploadFile !== null){
    return <img alt="uploadedImage" style={{width:"100%", height:"auto"}} src={this.state.uploadFile[0].preview} />
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
            <DatePicker date={this.callbackDateFrom} hintText={"From"} />
            <DatePicker date={this.callbackDateTo} hintText={"To"} />
          </div>
        </div>
        <div style={{clear:"both"}}></div>
      </div>
      {this.showPreview()}
    </Tab>
    <Tab label="By Hand" >
      <div>
        <div className="DateWrapper">
            <DatePicker date={this.callbackDateFrom} hintText={"From"} />
            <DatePicker date={this.callbackDateTo} hintText={"To"} />

          </div>
        <TextField
                style={styles.textField}
                hintText="Type your lunch"
                multiLine={true}
                onChange={this.handleTextChange}
        />
        <TextField
                style={styles.textField}
                hintText="Price"
                onChange={this.handlePriceChange}
        />
      </div>
    </Tab>
  </Tabs>
)
};


  render() {
        return(
            <div className = "loginBg">
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
          onClick = {this.handleSubmit}
				/>
                </CardText>
                </Card>
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
