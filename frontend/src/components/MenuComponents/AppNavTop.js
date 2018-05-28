import React, {Component} from 'react';
import GroupsDrawer from './GroupsDrawerMobile.js';
import SearchFeed from './SearchFeed';
import "./sidebars.css";


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
      <div className="MobileNavTop">
      <GroupsDrawer changeContent={this.props.changeContent}/>
      <div className="AppNameDisplay">
        Lunch-Planner
      </div>
      <SearchFeed/>
      </div>
    );
  }
}

export default AppNavBottom;