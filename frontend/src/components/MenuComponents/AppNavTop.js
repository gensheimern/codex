import React, {Component} from 'react';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import GroupsDrawer from './GroupsDrawerMobile.js';
import SearchFeed from './SearchFeed';
import "./sidebars.css";

import IconSearch from 'material-ui/svg-icons/action/search';
const SearchIcon = <IconSearch/>;


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
      <GroupsDrawer/>
      <div className="AppNameDisplay">
        Lunch-Planner
      </div>
      <SearchFeed/>
      </div>
    );
  }
}

export default AppNavBottom;