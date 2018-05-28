import React from 'react';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';


const styles = {
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};

function handleRequestDelete() {
  alert('You clicked the delete button.');
}

function handleClick() {
  alert('You clicked the Chip.');
}

/**
 * Examples of Chips, using an image [Avatar](/#/components/font-icon), [Font Icon](/#/components/font-icon) Avatar,
 * [SVG Icon](/#/components/svg-icon) Avatar, "Letter" (string) Avatar, and with custom colors.
 *
 * Chips with the `onRequestDelete` property defined will display a delete icon.
 */
export default class ChipExampleSimple extends React.Component {

  handleDelete(){
    console.log("worked");
  }

  render() {
    return (
      <div style={styles.wrapper}>

        <Chip
          onRequestDelete={handleRequestDelete}
          onClick={handleClick}
          style={styles.chip}
        >
          <Avatar src={this.props.peopleImage} />
         {this.props.name}
        </Chip>

      </div>
    );
  }
}
