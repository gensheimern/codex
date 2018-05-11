import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import config from '../../config';
import {TextField} from "material-ui";



export default class CreateActivity extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            events: {},
            groups: [],
            show: false,
            description: "",
            description: "Test Description",
            activityName: "Test",
            place: "",
            time: "",
            time: "2018.05.01 12:00",
            Banner:"name.jpg",
            Private:false,
            MaxParticipants: "",
            eventTag: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentWillMount() {
        // custom rule will have name 'isPasswordMatch'
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            if (false) {
                return false;
            }
            return true;
        });
    }

    handleChange(event) {
      const { events } = this.state;
      events[event.target.name] = event.target.value;
      this.setState({ events });
    }

    handleSubmit() {

                    const { events } = this.state;

      fetch(config.apiPath + "/activity", {
        method: 'POST',
        body: JSON.stringify({
          Description: events.description,
          ActivityName: events.activityName,
          Activityname: events.activityName,
          Place: events.place,
          Time: events.time,
          EventTag: events.eventTag,
          Host: events.host,
          Eventtag: events.eventTag,
          Private: events.Private,
          Banner: events.Banner,
          MaxParticipants: events.MaxParticipants
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
      })
    }

    render() {
              const { events } = this.state;

        return (
            <ValidatorForm
                onSubmit={this.handleSubmit}
            >
                <TextValidator
                    floatingLabelText="Name der Aktivität"
                    onChange={this.handleChange}
                    name="activityName"
                    validators={['required']}
                    errorMessages={['this field is required']}
                    value={events.activityName}
                />
                <TextValidator
                    floatingLabelText="Beschreibung"
                    onChange={this.handleChange}
                    name="description"
                    validators={['required']}
                    errorMessages={['this field is required']}
                    value={events.description}
                    />
                <TextValidator
                    floatingLabelText="Ort"
                    onChange={this.handleChange}
                    name="place"
                    validators={['required']}
                    errorMessages={['this field is required']}
                    value={events.place}
                />
                <TextValidator
                    floatingLabelText="Zeit"
                    onChange={this.handleChange}
                    name="time"
                    validators={['required']}
                    errorMessages={['this field is required']}
                    value={events.time}
                />
                <TextValidator
                    floatingLabelText="maximale Anzahl der Teilnehmer"
                    onChange={this.handleChange}
                    name="MaxParticipants"
                    validators={['required']}
                    errorMessages={['this field is required']}
                    value={events.MaxParticipants}
                />

                <RaisedButton type="submit" />
            </ValidatorForm>
        );
    }}
