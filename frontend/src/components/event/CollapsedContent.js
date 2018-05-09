import React from 'react';
import CollapseFA from 'react-icons/lib/fa/angle-down';

export default class CollapsedContent extends React.Component {

  constructor(props){
    super(props);

  }

  ToggleCollapse(){
    if(this.props){
      return (
        <div className="collapse-activity">
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
