import React from "react";
import "./Organization.css";
import RaisedButton from 'material-ui/RaisedButton';
//import config from '../../config';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import {Card, CardText} from 'material-ui/Card';
//import AutoComplete from 'material-ui/AutoComplete';

export default class Organization extends React.Component{

    constructor(props) {
		super(props);

		this.handleChange.bind(this);

		this.state = {
            name: "",
			password: "",
		}
	}
	
	handleChange = name => e => {
		this.setState({
			[name]: e.target.value
		});
	}
/*
	validateForm() {
		return this.emailRegExp.test(this.state.email)
			&& this.state.name !== ""
			&& this.state.password === this.state.retypePassword
	} 
	
	updateCheck() {
		this.setState((oldState) => {
		  return {
			checked: !oldState.checked,
		  };
		});
	}

	handleSubmit = event => {
        event.preventDefault();

        fetch(config.apiPath + "/authenticate", {
            method: 'POST',
            body: JSON.stringify({
                name: this.state.name,
                password: this.state.password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            if(!res.ok) {
                this.setState({errorText:'Invalid Password or Name'})
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
            
        });
    }*/
    
    render() {

		const styles = {

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
		
		};


        return(
            <div className="organizationBg">
			<form className="organization" >
				<div>
					<Paper style={styles.paperStyle} zDepth={1} />
 				</div>

				<br/>
				<center>
					<h3 className="h3header">Lunchplanner</h3>
				</center>
                <Card className="organizationCard">
				<CardText>
				<h2 className="h2header">Organization</h2>
				
                {/*<AutoComplete
					fullWidth={true}
                    ref = {"autocomplete"}
                    floatingLabelText="Organization"
                   	filter={AutoComplete.fuzzyFilter}
                    dataSource={this.state.usersList}
                    dataSourceConfig={this.state.usersListConfig}
                    maxSearchResults={5}
                    onNewRequest= {(chosenRequest, index) =>{
						this.setState({ inviteList: [...this.state.inviteList, chosenRequest.ValueKey ] });
						this.setState({ inviteImageList: [...this.state.inviteImageList,{textKey: chosenRequest.textKey, ValueImage: chosenRequest.ValueImage, ValueKey: chosenRequest.ValueKey} ] })
						this.props.people(this.state.inviteImageList);
						this.refs["autocomplete"].setState({searchText:''});
                    }}
				/>*/ }

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
				<div style={{foat: "left"}}>
				<RaisedButton
					backgroundColor="#b9b9b9"
					type="submit"
					label="Cancel"
					primary={true}
					//disabled={!this.validateForm()}
					//onClick={this.handleSubmit}
				/>

				<RaisedButton
					backgroundColor="#b9b9b9"
					type="submit"
					label="OK"
					primary={true}
					//disabled={!this.validateForm()}
					style = {{
						marginBottom: '10px',
						marginLeft: '10px'}}
					//onClick={this.handleSubmit}
				/>
				
				</div>

				</CardText>
				</Card>
				
			</form>
			</div>


        );
    }
}