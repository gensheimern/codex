import React from 'react';
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

class CardLunchFeed extends React.Component {
  constructor(props){
    super(props);
  }

  checkForTitle = () => {
    if(this.props.price === ''){
      return 'Click for more info'
    } else {
      return this.props.price
    }
  }

  checkForImage = () => {
    console.log(this.props.image);
    if(this.props.image === null){
      return ("weblogin.jpg")
    }else {
      return ("lunch_"+this.props.image)
    }
  }

  handleClick = () => {
    console.log("lkjljlkjlkj");
  }

 render(){
   return(
  <Card>
    <CardMedia
      overlay={<CardTitle title={this.checkForTitle()} />}
    >
      <img onClick={this.handleClick} style={{objectFit:"cover", height:"300px"}} src={this.checkForImage()} alt="" />
    </CardMedia>
    <CardTitle title={this.props.name} subtitle={this.props.place} />
    <CardText>
      {this.props.text}
    </CardText>
    <CardActions>
      <FlatButton label="Action1" />
      <FlatButton label="Action2" />
    </CardActions>
  </Card>
);
}
}
export default CardLunchFeed;
