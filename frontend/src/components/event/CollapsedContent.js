import React from 'react';
import CollapseFA from 'react-icons/lib/fa/angle-down';

export default class CollapsedContent extends React.Component {

  constructor(props){
    super(props);

  }



  ToggleCollapse(){
    if(this.props.collapse){
      let participatesIMG;
      if (this.props.participants.length !== 0) {
        //Mapping trough the participates array and returning the profile picture
          participatesIMG = this.props.participants.map((participatesItem, index) => {
              return ( <
                  img className = "myimage" key={index}
                  src = {
                      participatesItem.image
                  }
                  alt = "profile" / >
              );
          });
      }

      return (
        <div className="collapse-activity">
            <div className="extendedInfo">
                <div className="alreadyJoining">
                    <h6> Already joining </h6>
                </div>
                <div className="joinInfo">
                    {participatesIMG}
                    <h6> 6/12 </h6>
                </div>
            </div>
            <span id="collapseKommentare"><h6> 2 Kommentare </h6></span>
            <span id="collapseFA"><h6> <CollapseFA /> </h6></span>
        </div>
      );
    } else {
      return(
      <div className="collapse-activity">
          <span id="collapseKommentare"><h6> 3 Kommentare </h6></span>
          <span id="collapseFA"><h6> <CollapseFA /> </h6></span>
      </div>
    );
    }
  }

render (){
  return (<div>
      {this.ToggleCollapse()}
      </div>
  )
}
}
