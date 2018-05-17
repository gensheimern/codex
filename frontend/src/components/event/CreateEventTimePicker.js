import React from 'react';
import TimePicker from 'material-ui/TimePicker';

const TimePickerExampleSimple = () => (
  <div>
    <TimePicker
      format="24hr"
      hintText="12:00"
      minutesSteps={10}
      autoOk={true}
    />
  </div>
);

export default TimePickerExampleSimple;
