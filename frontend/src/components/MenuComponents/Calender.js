import React from 'react';
import Calendar from 'react-calendar';

export default class Calender extends React.Component {
  state = {
     date: new Date(),
     value: new Date(),
   }
   onChange = date => this.setState({ date })

    render() {
      const { value } = this.state;
      return (
        <div>
          <Calendar
            onClickDay={(date=value.getDay()) =>console.log( {date})}
            showWeekNumbers
            value={value}
            onChange={this.onChange}
            value={this.state.date}
          />
        </div>
      );
    }
  }