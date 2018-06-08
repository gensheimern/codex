import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import "./sidebars.css"

export default class CreateTeamButton extends React.Component {

  constructor(props) {
    super(props);
    this.state = {kappa:true};

    this.handleClick = this.handleClick.bind(this);

  }
handleClick = () => {
  this.setState({kappa:true});
  this.props.clickGroupButton(this.props.index)}


  render() {

    return (
      <div className="GroupSidebarButton">
        <FlatButton
          className={
          (this.props.main) ? ((this.props.isActive) ? 'highlightSidebarContent' : 'nonHighlightSidebarContent' ) : ((this.props.isActive) ? 'selectedGroup' : 'groupName')
          }
          onClick={this.handleClick}
          target="_blank"
          style={{color:"white", minWidth:"0px",margin:"0px"}}>
          {this.props.name}
        </FlatButton>
    </div>
    );
  }
}