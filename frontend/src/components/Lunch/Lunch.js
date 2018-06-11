import React from 'react';
import "./Lunch.css";
import { withRouter } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Card,CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import { Link } from 'react-router-dom';
import ImageUpload from './ImageUpload';



class Lunch extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
          email: "",
          password: "",
          errorPrompt: "",
          open: false,
          errorText: "",
          value:1,
      };
  }

  handleOpen = () => {
      this.setState({open: true});
  };

  handleClose = () => {
      this.setState({open: false});
  };

  handleChange = name => e => {
  this.setState({
    [name]: e.target.value
  });
}

  validateForm() {
      return this.state.email.length > 0 && this.state.password.length > 0;
  }



  render() {
        const styles ={

            paperStyle:{
				height: 62,
				width: 62,
				borderRadius: 7,
				display: 'block',
				marginLeft: 'auto',
				marginRight: 'auto',
            },

            textField:{
				width: '80%',
				marginLeft: '10%',
				marginRight: '10%',
            },

            loginButton:{
				heigt: 40.57,
				width: '30%',
				borderRadius: 3,
				boxShadow: "inset 0 1 3 0 rgba(0,0,0,0.5),0 1 2 0 rgba(0,0,0,0.5)",
				display: 'block',
				marginLeft: 'auto',
				marginRight: 'auto',
			},
        }

        return(
            <div className = "loginBg">
            <form className ="login" >
                <div>
                    <Paper style={styles.paperStyle} zDepth= {1}/>
                </div>
                <center>
                    <h3 className = "h3header">Lunchplannner</h3>
                </center>
                <Card className = "loginCard">
                <CardText>
                <h2 className = "h2header">Insert your Lunch for today</h2>

                <TextField
                        style={styles.textField}
                        hintText="Type your text"
                        multiLine={true}
                        rows={2}
                />
                <TextField
                        style={styles.textField}
                        hintText="Price"
                />

          <div className="errorText"> {this.state.errorText} </div>

          <ImageUpload />


    <form ref='uploadForm'
      id='uploadForm'
      action={ 'http://localhost:5000/api/upload'}
      method='post'
      encType="multipart/form-data">
        <input type="file" name="sampleFile" />
        <input type='submit' value='Upload!' />
    </form>



                <br/>
                <br/>
                <RaisedButton
					backgroundColor="#b9b9b9"
					type="submit"
					label="Login"
					primary={true}
					disabled={!this.validateForm()}
					style = {styles.loginButton}
				/>
                <br/>
                <p>Dot have an account yet?&nbsp;
						<Link to = "/signup">Create an account</Link>
				</p>
                </CardText>
                </Card>
            </form>
            </div>
            );

	}

}

export default withRouter(Lunch);
