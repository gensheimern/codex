import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import "./sidebars.css"
import IconGroup from 'material-ui/svg-icons/social/group';

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
          icon={<IconGroup style={{
                          float:"left",
                          marginRight:"3%",
                          marginTop:"2%",
                          marginLeft:"6%",
                        }}
              />
                      }
          className={
          (this.props.main) ? ((this.props.isActive) ? 'highlightSidebarContent' : 'nonHighlightSidebarContent' ) : ((this.props.isActive) ? 'selectedGroup' : 'groupName')
          }
          onClick={this.handleClick}
          target="_blank"
          style={{color:"white", minWidth:"0px",margin:"0px",width : "100%%", textAlign:"left"}}>
          {this.props.name}
        </FlatButton>
    </div>
    );
  }
}