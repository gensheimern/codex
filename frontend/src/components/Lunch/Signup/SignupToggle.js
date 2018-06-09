import React from 'react';
import Toggle from 'material-ui/Toggle';

const styles = {
  block: {
    maxWidth: 50,
  },
  toggle: {
    marginBottom: 16,
  },

  thumbSwitched: {
    backgroundColor: 'rgb(30 161 133)',
  },
  trackSwitched: {
    backgroundColor: '#B0E8D2',
  },
  labelStyle: {
    color: 'grey',
  },
};

export default class ReminderToggle extends React.Component{


  render(){
    return(
      <Toggle
        label="By hand"
        labelPosition="right"
        thumbStyle={styles.thumbOff}
        trackStyle={styles.trackOff}
        thumbSwitchedStyle={styles.thumbSwitched}
        trackSwitchedStyle={styles.trackSwitched}
        labelStyle={styles.labelStyle}
        onToggle={this.props.toggle}
        style={{width:"50%",paddingLeft:"3%",paddingRight:"10%"}}
      />
    )
  }

}
