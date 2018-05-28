import React from 'react';
import Drawer from 'material-ui/Drawer';
import FlatButton from 'material-ui/RaisedButton';
import Groups from '../Groups';

import IconGroup from 'material-ui/svg-icons/social/group';

export default class GroupsDrawer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});

  render() {
    return (
      <div className="GroupsDrawer">
        <FlatButton
          backgroundColor="#a4c639"
           icon={ <IconGroup/> }
          onClick={this.handleToggle}
        />
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
        <Groups changeContent={this.props.changeContent} closeDrawer={this.handleClose} id="groups-wrapper" height="100%" />
        </Drawer>
      </div>
    );
  }
}