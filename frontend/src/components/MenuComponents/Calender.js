import React from 'react';
import Calendar from 'react-calendar';

export default class Calender extends React.Component {
  state = {
     date: new Date(),
   }
   onChange = date => this.setState({ date })

    render() {
      return (
        <div>
          <Calendar
            onClickDay={(date=this.state.date.getDay()) =>console.log( {date})}
            showWeekNumbers
            onChange={this.onChange}
            value={this.state.date}
          />
        </div>
      );
    }
  }