import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import IconAdd from 'material-ui/svg-icons/content/add-circle';
import "./sidebars.css"

export default class CreateTeamButton extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleClick = () => {console.log("created group for nothing!");
  this.props.changeContent(6);
  this.props.closeDrawer();};



  render() {
    return (
      <div className="CreateTeamButton">
        <FlatButton
          icon={<IconAdd color="#FFFFFF"/>}
          onClick={this.handleClick}
          target="_blank"
          style={{color:"white"}}/>
      </div>
    );
  }
}