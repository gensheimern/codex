import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import IconSearch from 'material-ui/svg-icons/action/search';
import "./sidebars.css"

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