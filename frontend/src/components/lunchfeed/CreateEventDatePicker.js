import React from 'react';
import DatePicker from 'material-ui/DatePicker';

/**
 * The Date Picker defaults to a portrait dialog. The `mode` property can be set to `landscape`.
 * You can also disable the Dialog passing `true` to the `disabled` property.
 * To display the year selection first, set the `openToYearSelection` property to `true`.
 */

export default class CreateEventDatePicker extends React.Component{


onShow = () => {
  console.log("show")
}

render(){
  const today = new Date();
    return(
      <div>
        <DatePicker
          ref={ref => this.datePickerRef = ref}
          id="CreateEventDatePicker"
          textFieldStyle={{width:'100%'}}
          autoOk={true}
          hintText="Today"
          minDate={today}
          onShow={this.onShow}
        />
      </div>
);

}
}
