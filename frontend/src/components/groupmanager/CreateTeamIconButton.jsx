import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import "./groupmanager.css"

export default class CreateTeamIconButton extends React.Component {

  constructor(props) {
    super(props);
    this.state = {kappa:true};

    this.handleClick = this.handleClick.bind(this);

  }
handleClick = () => {
  this.setState({kappa:true});
  this.props.handleClick(this.props.index, this.props.icon)}


  render() {
    let classNameDiv =
        ((this.props.isActive) ? 'selectedIcon' : 'unselectedIcon')
      ;

    return (
      <div className={classNameDiv}>
        <FlatButton
          style={{
            height:"32px",
            width:"32px",
            minWidth:"32px",
            lineHeight:"30px",
            borderRadius: 50,
            color:"#1EA185"
          }}
          onClick={this.handleClick}
          target="_blank"
          icon = {this.props.icon}/>
    </div>
    );
  }
}