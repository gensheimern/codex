import React from 'react';
import TimePicker from 'material-ui/TimePicker';


export default class CreateEventTimePicker extends React.Component {

  constructor(props){
    super(props);
    this.state= {
      value:{}
    }
  }



  render(){

    return(
  <div>
    <TimePicker
      textFieldStyle={{width:'100%'}}
      format="24hr"
      hintText={this.props.hours + ":" + this.props.minutes}
      minutesStep={15}
      autoOk={true}
      onChange={this.props.time}
      value={this.state.value}
    />
  </div>
);
}
}
