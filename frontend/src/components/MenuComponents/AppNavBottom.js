import React, {Component} from 'react';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconAdd from 'material-ui/svg-icons/content/add-circle';
import IconNotifications from 'material-ui/svg-icons/social/notifications';
import IconProfile from 'material-ui/svg-icons/social/person';
import IconCalendar from 'material-ui/svg-icons/action/event';
import IconFeed from 'material-ui/svg-icons/action/assignment';
import { Link, withRouter } from 'react-router-dom';


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
        <BottomNavigation selectedIndex={this.props.index}>
          <BottomNavigationItem
            icon={FeedIcon}
            onClick={() => this.props.history.push('/feed')}
          />
          <BottomNavigationItem
            icon={CalendarIcon}
            onClick={() => this.props.history.push('/personal')}
          />
          <BottomNavigationItem
            icon={AddIcon}
            onClick={() => this.props.history.push('/addevent')}
          />
          <BottomNavigationItem
            icon={NotifIcon}
            onClick={() => this.props.history.push('/notifications')}
          />
          <BottomNavigationItem
            icon={ProfileIcon}
            onClick={() => this.props.history.push('/profile')}
          />
        </BottomNavigation>
      </Paper>
    );
  }
}

export default withRouter(AppNavBottom);