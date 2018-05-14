import React from 'react';
import config from '../../config';
import dateParser from './dateParser';
import CollapseFA from 'react-icons/lib/fa/angle-down';
import GroupFA from 'react-icons/lib/fa/group';
import PlaceMUI from 'react-icons/lib/md/place';
import TextField from 'material-ui/TextField';
import jwt_decode from 'jwt-decode';

export default class CollapsedContent extends React.Component {

  constructor(props){
    super(props);

    this._onKeyPress = this._onKeyPress.bind(this);
  }

  _onKeyPress(event) {
  if (event.charCode === 13) { // enter key pressed
    event.preventDefault();

    fetch(config.apiPath + "/activity/" + this.props.event.id + "/message", {
      method: 'POST',
      body: JSON.stringify({
        content: this.refs.myTextfield.getValue()

              }),

      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': localStorage.getItem('apiToken')
      }
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Request failed.");
      } else if (res.status !== 201) {
        throw new Error("Forbidden");
      }

      return res;
    })
    .then(res => res.json())
    .then(res => {
            this.props.loadMessages();
      console.log("jupfetched");

    })

    .catch((err) => {
      console.log(err);

      this.setState({
        error: 'An Error occured.',
      });
    });


  }


}


  ToggleCollapse(){

    if(this.props.collapse){
      let participatesIMG;
      let participatesIMGPlus;
      let message;
      let counter = 1;

      if (this.props.messages.length !==0 ){
        message = this.props.messages.map((messageItem, index) => {
          return (
            <div className="commentWrapper">
              <div className="commentUserImage">
                  <img src={messageItem.author.image} />
              </div>
              <div>
                <span id="commentName"> {messageItem.author.name + " " + messageItem.author.firstName} </span>

                <h6>{messageItem.content}</h6>

                <h6>{dateParser.DateparserTime(messageItem.time)}</h6>
              </div>
            </div>
          )
        });
      }

      if (this.props.participants.length !== 0) {
        //Mapping trough the participates array and returning the profile picture
          participatesIMG = this.props.participants.map((participatesItem, index) => {
              if(counter<=4){
                counter = counter+1;
                return ( <
                  img className = "myimage" key={index}
                  src = {
                      participatesItem.image
                  }
                  alt = "profile" / >
              );
            }
          });
      }

      if (this.props.participants.length >=4) {
        participatesIMGPlus = <div className="participants-counter-icon"><h6> +{this.props.participants.length -4}</h6></div>
      }

    let decode = jwt_decode(localStorage.getItem('apiToken'));
      return (
        <div className="collapse-activity">
          <div className="event-extend-info">
              <h4> <PlaceMUI />  {this.props.event.place} </h4>
          </div>
            <div className="extendedInfo">
                <div className="alreadyJoining">
                    <h6> Already joining </h6>
                </div>
                <div className="joinInfo">
                  <div className="participants-images">
                    <div className="participants-row">{participatesIMG}</div> {participatesIMGPlus}
                      <span id="participant-counter"> <h6><GroupFA />{" "} {this.props.participants.length}/{this.props.event.maxParticipants} </h6></span>
                  </div>

                </div>
            </div>
            <div style={{clear:"both"}}> </div>
            <hr className="activity-hr" />
            <div className="event-textfield">
                {message}
                <div className="texfield-profile-picture">
                    <img src= {decode.image} />
                </div>
                <div  className="myTextfield">
                <TextField
                      hintText= "Add a new comment"
                      fullWidth={true}
                      className="addComment"
                      onKeyPress={this._onKeyPress}
                      ref="myTextfield"
                />
                </div>
            </div>
        </div>
      );
    } else {
      return(
      <div className="collapse-activity">
          <hr className="activity-hr" />
      </div>
    );
    }
  }

render (){
  return (<div>
      {this.ToggleCollapse()}
      </div>
  )
}
}
