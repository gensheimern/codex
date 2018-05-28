import React, {Component} from 'react';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconAdd from 'material-ui/svg-icons/content/add-circle';
import IconNotifications from 'material-ui/svg-icons/social/notifications';
import IconProfile from 'material-ui/svg-icons/social/person';
import IconCalendar from 'material-ui/svg-icons/action/event';
import IconFeed from 'material-ui/svg-icons/action/assignment';


const FeedIcon = <IconFeed/>;
const CalendarIcon = <IconCalendar/>;
const AddIcon = <IconAdd/>;
const NotifIcon = <IconNotifications/>;
const ProfileIcon = <IconProfile />;

/**
 * A simple example of `BottomNavigation`, with three labels and icons
 * provided. The selected `BottomNavigationItem` is determined by application
 * state (for instance, by the URL).
 */
class AppNavBottom extends Component {
  state = {
    selectedIndex: 0,
  };

  select = (index) => {
    this.setState({selectedIndex: index})
    this.props.changeContent(index);
  };

  render() {
    return (
      <Paper zDepth={1}>
        <BottomNavigation selectedIndex={this.state.selectedIndex}>
          <BottomNavigationItem
            icon={FeedIcon}
            onClick={() => this.select(0)}
          />
          <BottomNavigationItem
            icon={CalendarIcon}
            onClick={() => this.select(1)}
          />
          <BottomNavigationItem
            icon={AddIcon}
            onClick={() => this.select(2)}
          />
          <BottomNavigationItem
            icon={NotifIcon}
            onClick={() => this.select(3)}
          />
          <BottomNavigationItem
            icon={ProfileIcon}
            onClick={() => this.select(4)}
          />
        </BottomNavigation>
      </Paper>
    );
  }
}

export default AppNavBottom;