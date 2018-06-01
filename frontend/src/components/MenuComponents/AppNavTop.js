import React, {Component} from 'react';
import GroupsDrawer from './GroupsDrawerMobile.js';
import SearchFeed from './SearchFeed';
import SearchBar from './SearchBar';

import "./sidebars.css";


/**
 * A simple example of `BottomNavigation`, with three labels and icons
 * provided. The selected `BottomNavigationItem` is determined by application
 * state (for instance, by the URL).
 */
class AppNavTop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      show:false,
  };
  this.select = this.select.bind(this);
  this.changeShow = this.changeShow.bind(this);
}

  select = (index) => {
    this.setState({selectedIndex: index})
    this.props.changeContent(index);
  };
  changeShow(){
    if(this.state.show === true)
      this.setState({show:false})
    if(this.state.show === false)
      this.setState({show:true})
  }
  render() {
    console.log(this.props.searchFilterFeed)


    if(this.state.show === false){

    return (<div className="MobileNavTop">
      <GroupsDrawer
        searchFilterFeed={this.props.searchFilterFeed}
        changeContent={this.props.changeContent}/>
      <div>
          <div className="AppNameDisplay">
              Lunch-Planner
          </div>
          <SearchFeed searchFilterFeed={this.props.searchFilterFeed} changeShow={this.changeShow}/>
      </div>
    </div>
    )
  }

  if(this.state.show === true){

  return(<div className="MobileNavTop">
    <GroupsDrawer
      searchFilterFeed={this.props.searchFilterFeed}
      changeContent={this.props.changeContent}/>

     <SearchBar
        searchFilterFeed={this.props.searchFilterFeed}
        show={this.state.show}
        changeShow={this.changeShow}
        style={{float:"left"}}
     />
    </div>
  );
  }

}}

export default AppNavTop;