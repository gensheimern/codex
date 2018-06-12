import React, {
    Component
} from "react";
import "./Lunch.css";

import config from '../../config';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {Card,CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

class RestaurantLogin extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            errorPrompt: "",
            open: false,
            errorText: "",
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


    handleSubmit = event => {
        event.preventDefault();

        fetch(config.apiPath + "/authenticate", {
            method: 'POST',
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            if(!res.ok) {
                this.setState({errorText:'Invalid Password or Email'})
                throw new Error("Invalid Password");
            } else if(res.status !== 200) {
                throw new Error("Forbidden");
            }
            return res;
        }).then(res => res.json()).then((res) => {

            if(typeof (Storage) !== "undefined") {
                localStorage.setItem("apiToken", res.token);
            } else {
                // TODO Code without local storage
            }

            this.props.history.push("/feed");
        }).catch((err) => {
            const actions = [
                <FlatButton
                  label="Cancel"
                  primary={true}
                  onClick={this.handleClose}
                />,
                <FlatButton
                  label="Discard"
                  primary={true}
                  onClick={this.handleClose}
                />,
              ];
            this.setState({
                errorPrompt: (
                <div>
                    <RaisedButton label="Alert" onClick={this.handleOpen} />
                    <Dialog
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    >
                     Password or Email wrong!
                    </Dialog>
                </div>)
            });
        });
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
                <h2 className = "h2header">Restaurant Login</h2>
                <TextField
                    id="email"
					label="E-Mail"
					value={this.state.email}
					onChange={this.handleChange('email')}
					floatingLabelText="E-Mail"
					style= {styles.textField}

                />
                <TextField
					id="password"
					label="Password"
					type="password"
					value={this.state.password}
					onChange={this.handleChange('password')}
					floatingLabelText="Password"
					style= {styles.textField}
				/>

          <div className="errorText"> {this.state.errorText} </div>

                <br/>
                <br/>
                <RaisedButton
					backgroundColor="#b9b9b9"
					type="submit"
					label="Login"
					primary={true}
					disabled={!this.validateForm()}
					style = {styles.loginButton}
          onClick={this.handleSubmit}
				/>
                <br/>
                <p>Dot have an account yet?&nbsp;
						<Link to = "/restaurantsignup">Create an account</Link>
				</p>
                </CardText>
                </Card>
            </form>
            </div>
            );

	}
}
export default withRouter(RestaurantLogin);
