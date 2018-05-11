import React from "react";
import {
    Button,Alert,Checkbox
  ,FormGroup,FormControl
} from "react-bootstrap";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import config from '../../config';
import NavbarMenu from "../MenuComponents/NavbarMenu.js";


export default class CreateActivity extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          groups: [],
          show: false,
          description: "",
          activityName: "",
          description: "Test Description",
          activityName: "Test",
          place: "",
          time: "",
          time: "2018.05.01 12:00",
          Banner:"name.jpg",
          Private:false,
          MaxParticipants: 100,
          eventTag: false,
          showError: false
      };
          this.validateForm = this.validateForm.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
    }
  validateForm() {
      return this.state.activityName.length > 0 && this.state.place.length > 0;
  }

  handleChange = event => {
      this.setState({
          [event.target.id]: event.target.value
      });
      console.log(this.state);
  }

  handleSubmit = e => {
    e.preventDefault();

    fetch(config.apiPath + "/activity", {
      method: 'POST',
      body: JSON.stringify({
        Description: this.state.description,
        ActivityName: this.state.activityName,
        Activityname: this.state.activityName,
        Place: this.state.place,
        Time: this.state.time,
        EventTag: this.state.eventTag,
        Host: this.state.host,
        Eventtag: this.state.eventTag,
        Private: this.state.Private,
        Banner: this.state.Banner,
        MaxParticipants: this.state.MaxParticipants
      }),
      headers: {
          'Content-Type': 'application/json',
          'X-Access-Token': localStorage.getItem('apiToken')
        }
    }).then((res) => {
      if(res.status !== 201) {
          throw new Error("Invalid Entries");
      } else if(res.status !== 200) {
      } else if(res.status !== 201) {
          throw new Error("Forbidden");
      }
        return res;
    }).then(res => res.json()).then((res) => {
        //console.log("Token: " + res.token)

        if(typeof (Storage) !== "undefined") {
            localStorage.setItem("apiToken", res.token);
        } else {
            // TODO Code without local storage
        }

        this.props.history.push("/activity");
    }).catch((err) => {
        this.setState({
            errorPrompt: (<Alert bsStyle = "warning"> <strong> Holy guacamole ! </strong>
              Best check yo self, youre not looking too good. </Alert>)
        });
    });

  }

render() {
    return(  <form onSubmit={this.handleSubmit}>
      <FormGroup controlId="errorprompt" bsSize="large">
          {this.errorPrompt}
      </FormGroup>
               	<FormGroup controlId="errorprompt" bsSize="large">
               			{this.state.errorPrompt}
               	</FormGroup>
               	<FormGroup controlId="activityName" bsSize="large">
               			 <FormControl id="activityName" placeholder="activityName" autoFocus="autoFocus" type="text" value={this.state.activityName} onChange={this.handleChange}/>
               	 </FormGroup>
                    <FormGroup controlId="description" bsSize="large">
               			  <FormControl id="description" placeholder="description" autoFocus="autoFocus" type="text" value={this.state.description} onChange={this.handleChange}/>
               			</FormGroup>
                <FormGroup controlId="place" bsSize="large">
                    <FormControl id="place" placeholder="place" autoFocus="autoFocus" type="text" value={this.state.place} onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup controlId="time" bsSize="large">
                  <FormControl id="time" placeholder="time" autoFocus="autoFocus" type="text" value={this.state.time} onChange={this.handleChange}/>
                </FormGroup>
                    <span>Event<Checkbox  id="eventTag" value={this.state.eventTag} onChange={this.handleChange}/></span>
               			<Button id="createBtn" bsStyle="primary" block bsSize="large" disabled={!this.validateForm()} type="submit">
               			  erstellen
               			</Button>
               		  </form>

    )
  }}