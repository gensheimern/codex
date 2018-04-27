import React from "react";

export default class Userimg extends React.Component {

render() {
  console.log(this.props.participates.Image);
  return(
    <img source={{uri: 'http://initiumit.de/wp-content/uploads/2015/02/download-1-Large-min-iloveimg-compressed-400x267.jpg'}}
         style={{width: 400, height: 400}} />

  )
}

}
