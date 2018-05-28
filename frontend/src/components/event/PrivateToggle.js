import React from 'react';
import Toggle from 'material-ui/Toggle';

const styles = {
  block: {
    maxWidth: 250,
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

export default class PrivateToggle extends React.Component{


  render(){
    return(
      <Toggle
        label={this.props.label}
        thumbStyle={styles.thumbOff}
        trackStyle={styles.trackOff}
        thumbSwitchedStyle={styles.thumbSwitched}
        trackSwitchedStyle={styles.trackSwitched}
        labelStyle={styles.labelStyle}
        onToggle={this.props.togglePrivate}
      />
    )
  }

}
