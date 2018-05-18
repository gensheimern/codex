import React from 'react';
import {Card, CardActions,  CardMedia, CardTitle, CardText} from 'material-ui/Card';

export default class children extends React.Component {

  render(){
      return(<div>
        <Card >
      <button onClick={console.log("clicked")}> alles klar luder</button>
      </Card >

      </div>

    );
  }

}
