import React from 'react';
import { withRouter } from 'react-router-dom';
import './lunchcss.css';
import Paper from 'material-ui/Paper';
import Stepper from './Stepper';


class Lunch extends React.Component {



  render(){

      const style = {
        height: "70%",
        width: "70%",
        textAlign: 'center',
        margin: '5% auto',
      };

    return(
      <div className="background">
              <Paper style={style} zDepth={5}  >
                <h1> Create your lunch </h1>
                <Stepper />
              </Paper>
      </div>
    )
  }


}

export default withRouter(Lunch);
