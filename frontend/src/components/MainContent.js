import React from 'react';
import Events from './event/Events';

import Personal from './MenuComponents/SidebarContentCalender';
import ProfileContent from './Profile.js';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import CreateEventtCard from './event/CreateEventCard';
import CreateTeam from './groupmanager/CreateTeam';
import Paper from 'material-ui/Paper';
import FilterDropDown from './MenuComponents/FilterDropDown.js';

export default class MainContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayedContent: "0",
      open: false,
      value: "",
      address: ""
    };
  }
  componentDidMount() {
    const script = document.createElement("script");

    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAZvkEYTPa9zx8xs99WxPQDled7GJ4pjcg&libraries=places";
    script.async = true;

    document.body.appendChild(script);
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleSubmit = () => {
    this.child.createEvent();
    this.setState({open: false});
  }

  render() {
    const style = {
      marginRight: 20
    };

    const actions = [
      <FlatButton label="Cancel" primary={true} onClick={this.handleClose}/>,
      <FlatButton label="Submit" primary={true} keyboardFocused={true} onClick={this.handleSubmit}/>
    ];
    console.log(this.props.filterWord);

    if (this.props.mainContentNumber === 0) {
      return (<div style={{
          width: this.props.width,
          marginTop: "0%",
          float: "left",
          height: "100%",
          overflowY: "scroll"
        }}>
        <div className="FilterDiv">
          <FilterDropDown searchFilterFeed={this.props.searchFilterFeed}/>
        </div>
        <Events filterWord={this.props.filterWord} searchWord={this.props.searchWord} />
      </div>);
    } else if (this.props.mainContentNumber === 1) {
      return (<div style={{
          width: this.props.width,
          marginTop: "0%",
          margin: "5%",
          float: "left",
          height: "100%",
          overflowY: "scroll"
        }}>
        <Personal/>
      </div>);
    } else if (this.props.mainContentNumber === 2) {
      return (<div style={{
          width: this.props.width,
          marginTop: "0%",
          marginBottom: "10%",
          float: "left",
          height: "90%",
          overflowY: "scroll",
          margin: "10%"
        }}>
      <div>
        <Paper className="createEventWrapper">
          <CreateEventtCard ref={instance => {
              this.child = instance;
            }}/>
            <FlatButton
              onClick={this.handleSubmit}
              label="erstelle dein Event" fullWidth={true}
            />

        </Paper>
      </div>
      </div>);
    } else if (this.props.mainContentNumber === 3) {
      return (<div style={{
          width: this.props.width,
          marginTop: "0%",
          float: "left",
          height: "100%",
          overflowY: "scroll"
        }}>
        <Events filterWord={this.props.filterWord} searchWord={this.props.searchWord} />
      </div>);
    } else if (this.props.mainContentNumber === 4) {
      return (<div style={{
          width: this.props.width,
          marginTop: "0%",
          float: "left",
          height: "100%",
          overflowY: "scroll"
        }}>
        <ProfileContent/>
      </div>);
    } else if (this.props.mainContentNumber === 5) {
      return (<div style={{
          width: this.props.width,
          marginTop: "0%",
          float: "left",
          height: "100%",
          overflowY: "scroll"
        }}>
        <Dialog className="createEventWrapper" actions={actions} modal={false} open={this.state.open} onRequestClose={this.handleClose} contentStyle={{
            width: "95%",
            maxWidth: "none",
            paddingTop: "0px"
          }} bodyStyle={{
            padding: "0px",
            paddingTop: "0px"
          }} titleStyle={{
            paddingTop: "0px"
          }} autoScrollBodyContent={true}>
          <CreateEventtCard ref={instance => {
              this.child = instance;
            }}/>
        </Dialog>
        <FloatingActionButton onClick={this.handleOpen} style={style}>
          <ContentAdd/>
        </FloatingActionButton>
        <Events filterWord={this.props.filterWord} searchWord={this.props.searchWord} />
      </div>);
    } else if (this.props.mainContentNumber === 6) {
      return (<div style={{
          width: this.props.width,
          marginTop: "0%",
          float: "left",
          height: "100%",
          overflowY: "scroll"
        }}>
        <CreateTeam/>
      </div>);
    }

  }
}
