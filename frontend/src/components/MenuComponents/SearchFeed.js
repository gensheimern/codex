import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import IconSearch from 'material-ui/svg-icons/action/search';
import "./sidebars.css"

const SearchIcon = <IconSearch/>;

export default class SearchFeed extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleClick = () => console.log("serached for nothing!");



  render() {
    return (
      <div className="SearchFeed">
        <FlatButton
          backgroundColor="#a4c639"
          hoverColor="#8AA62F"
          icon={<IconSearch/>}
          onClick={this.handleClick}

        />
      </div>
    );
  }
}