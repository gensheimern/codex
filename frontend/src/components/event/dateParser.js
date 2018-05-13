import React from 'react';

export default class dateParser extends React.Component {

  DateparserDate() {
    var d = new Date(this.props.event.time);
    var month = [];
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
  return d.getDay() + " " + month[d.getMonth()];
  }

    DateparserTime(){

      var d = new Date(this.props.event.time);
      var h = this.addZero(d.getHours());
      var m = this.addZero(d.getMinutes());

      return h + ":" + m;
  }

  addZero(i) {
      if (i < 10) {
          i = "0" + i;
      }
      return i;
  }


}
