import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import config from '../../config';
import {DatePicker,TimePicker} from "material-ui";
import {} from "../validation/ValidatedDatePicker";
import "./activity.css";



export default class CreateActivity extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            groups: [],
            show: false,
            description: "Test Description",
            activityName: "Test",
            place: "Test Ort",
            date: "",
            time: "",
            Banner:"strandbar.jpg",
            Private:false,
            MaxParticipants: "99",
            eventTag: false,
        };
        this.handleChangeActivityName = this.handleChangeActivityName.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);
        this.handleChangePlace = this.handleChangePlace.bind(this);
        this.handleChangeTime = this.handleChangeTime.bind(this);
        this.handleChangeEventTag = this.handleChangeEventTag.bind(this);
        this.handleChangePrivate = this.handleChangePrivate.bind(this);
        this.handleChangeMaxParticipants = this.handleChangeMaxParticipants.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleChangeTime = this.handleChangeTime.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.formatDate = this.formatDate.bind(this);
        this.formatTime = this.formatTime.bind(this);

    }

    handleChangeActivityName = event => {
      this.setState({activityName: event.target.value});
      console.log(this.state);    }

      handleChangeDescription = event => {
        this.setState({description: event.target.value});
        console.log(this.state);    }

      handleChangePlace = event => {
          this.setState({place: event.target.value});
          console.log(this.state);    }

      handleChangeTime = event => {
            this.setState({time: event.target.value});
            console.log(this.state);    }

      handleChangeEventTag = event => {
              this.setState({eventTag: event.target.value});
              console.log(this.state);    }

       handleChangePrivate = event => {
                this.setState({private: event.target.value});
                console.log(this.state);    }

        handleChangeMaxParticipants = event => {
                this.setState({MaxParticipants: event.target.value});
                 console.log(this.state);    }

        handleChangeDate = event => {
                  console.log(event);
                  this.setState({date: event});
                  console.log(this.state);    }

        handleChangeTime = event => {
                  this.setState({time: event});
                  console.log(this.state);    }

    handleSubmit() {
      let dateF = this.formatDate(this.state.date);
      let timeF = this.formatTime(this.state.time);
      let datetime = dateF + " " + timeF;

      fetch(config.apiPath + "/activity", {
        method: 'POST',
        body: JSON.stringify({
          description: this.state.description,
          name: this.state.activityName,
          place: this.state.place,
          time: datetime,
          event: this.state.eventTag,
          private: this.state.Private,
          banner: this.state.Banner,
          maxParticipants: this.state.MaxParticipants
        }),
        headers: {
            'Content-Type': 'application/json',
            'X-Access-Token': localStorage.getItem('apiToken')
          }
      }).then((res) => {
        console.log(res);
        console.log(this.state);
        if(res.status !== 201) {
          console.log(res.status);
        } else if(res.status !== 200) {
        } else if(res.status !== 201) {
          console.log(res.status);
        }
          return res;
      }).then(res => res.json()).then((res) => {
          //console.log("Token: " + res.token)

          if(typeof (Storage) !== "undefined") {
              localStorage.setItem("apiToken", res.token);
          } else {
              // TODO Code without local storage
          }
      });
    }

      formatDate(date){
        return date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
  }

      formatTime(time){
       console.log(time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds());
        return time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
      }

    render() {

        return (
            <ValidatorForm
                onSubmit={this.handleSubmit}
            >
                <TextValidator
                    floatingLabelText="Name der Aktivität"
                    onChange={this.handleChangeActivityName}
                    name="activityName"
                    validators={['required']}
                    errorMessages={['this field is required']}
                    value={this.state.activityName}
                    className="selection"

                />
                <TextValidator
                    floatingLabelText="Beschreibung"
                    onChange={this.handleChangeDescription}
                    name="description"
                    validators={['required']}
                    errorMessages={['this field is required']}
                    value={this.state.description}
                    className="selection"

                    />
                <TextValidator
                    floatingLabelText="Veranstaltungsort"
                    onChange={this.handleChangePlace}
                    name="place"
                    validators={['required']}
                    errorMessages={['this field is required']}
                    value={this.state.place}
                    className="selection"

                />
                <TextValidator
                    floatingLabelText="maximale Anzahl der Teilnehmer"
                    onChange={this.handleChangeMaxParticipants}
                    name="MaxParticipants"
                    validators={['required']}
                    errorMessages={['this field is required']}
                    value={this.state.MaxParticipants}
                    className="selection"

                />
              <div>
              <DatePicker
                 hintText="Datum des Events"
                 mode="potrait"
                 value={this.state.date}
                 onChange={(x, event) => {this.handleChangeDate(event)}}
                 formatDate={this.formatDate}
                 className="selection"
                 />
              <TimePicker
                   hintText="Zeit des Events"
                   value={this.state.date}
                   format="24hr"
                   onChange={(x, event) => {this.handleChangeTime(event)}}
                   autoOk={true}
                   formatDate={this.formatTime}
                   className="selection"
                  />

              </div>
              <RaisedButton type="submit" fullWidth={true} backgroundColor="#1ea185"> Erstellen </RaisedButton>
            </ValidatorForm>
        );
    }}
