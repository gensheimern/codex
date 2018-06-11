import React from 'react';
import config from '../../config';
import dateParser from './dateParser';
import GroupFA from 'react-icons/lib/fa/group';
import PlaceMUI from 'react-icons/lib/md/place';
import TextField from 'material-ui/TextField';
import DeleteMUI from 'react-icons/lib/md/delete';
import FlatButton from 'material-ui/FlatButton';

export default class CollapsedContent extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      imgPath: '',
      value:'',
    };
    this.handleChange = this.handleChange.bind(this);
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
      this.setState({value:''});
    })

    .catch((err) => {
      console.log(err);

      this.setState({
        error: 'An Error occured.',
      });
    });


  }


}

  componentDidMount() {
    fetch(config.apiPath + "/user/me", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': localStorage.getItem('apiToken')
      },
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Request failed.");
      } else if (res.status !== 200) {
        throw new Error("Forbidden");
      }

      return res;
    })
    .then(res => res.json())
    .then(res => {
      this.setState({
        imgPath: res.image
      });
    })
    .catch((err) => {
      // TODO
    });
  }

  handleChange(e){
    this.setState({ value: e.target.value });
  }

  ToggleCollapse(){

    if(this.props.collapse){
      let participatesIMG;
      let participatesIMGPlus;
      let message;
      let counter = 1;
      let eventRef = this.props.event.id;

      if (this.props.messages.length !==0 ){
        message = this.props.messages.map((messageItem, index) => {
          return (
            <div className="commentWrapper" key={"messageItem"+index}>
              <div className="commentUserImage">
                  <img src={messageItem.author.image} alt="" />
              </div>
              <div className="commentInfoWrapper">
                <div className="commentContentWrapper">
                    <span id="commentName"> {messageItem.author.name + " " + messageItem.author.firstName} </span>
                    <h6>{messageItem.content}</h6>
                    <h6>{dateParser.DateparserTime(messageItem.time)}</h6>
                </div>
              </div>
              <div className="commentDelete">
              {messageItem.author.me ? <FlatButton
                                        icon={<DeleteMUI/>}
                                        onClick={() => { return fetch(config.apiPath + "/activity/" + eventRef+
                                                                      "/message/" + messageItem.id, {
                                    			method: 'DELETE',
                                    			headers: {
                                    				'Content-Type': 'application/json',
                                    				'X-Access-Token': localStorage.getItem('apiToken'),
                                    			}
                                    		})
                                    		.then((res) => {
                                          this.props.loadMessages()

                                    			if (!res.ok || res.status !== 201) {
                                    				// handle error
                                    			} else {
                                    				// this.renderSnackbar();
                                    				// this.props.history.push('/feed');
                                    			}
                                    		})
                                    	}}/>
                                       : <span />}

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
          return true;});
      }

      if (this.props.participants.length >4) {
        participatesIMGPlus = <div className="participants-counter-icon"><h6> +{this.props.participants.length -4}</h6></div>
      }


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
                    <img src= {this.state.imgPath} alt=""/>
                </div>
                <div  className="myTextfield">
                <TextField
                      value={this.state.value}
                      hintText= "Add a new comment"
                      fullWidth={true}
                      className="addComment"
                      onKeyPress={this._onKeyPress}
                      onChange={this.handleChange}
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
