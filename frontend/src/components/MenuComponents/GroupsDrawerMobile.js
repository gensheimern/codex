import React from 'react';
import Drawer from 'material-ui/Drawer';
import FlatButton from 'material-ui/FlatButton';
import Groups from '../Groups';
import "./sidebars.css";

import IconGroup from 'material-ui/svg-icons/social/group';

export default class GroupsDrawer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});

  render() {
    console.log(this.props.searchFilterFeed)

    return (
      <div className="GroupsDrawer">
        <FlatButton
          backgroundColor="#1EA185"
          icon={ <IconGroup color="#FFFFFF"/> }
          onClick={this.handleToggle}
        />
        <Drawer
          docked={false}
          width={"84%"}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
        <Groups changeContent={this.props.changeContent}
          searchFilterFeed={this.props.searchFilterFeed}
          closeDrawer={this.handleClose} id="groups-wrapper" height="100%" />
        </Drawer>
      </div>
    );
  }
}