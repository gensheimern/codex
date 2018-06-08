import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardText} from 'material-ui/Card';
import AutoComplete from 'material-ui/AutoComplete';

export default class Signup extends React.Component{

    constructor(props) {
		super(props);

		this.handleChange.bind(this);
		this.signupUser.bind(this);

		this.state = {
            name: "",
			password: "",
		}
    }
    
    render() {
        return(
            <div className="organisationBg">
			<form className="Organisation" onSubmit={this.organisationUser}>
				<div>
					<Paper style={styles.paperStyle} zDepth={1} />
 				</div>

				<br/>
				<center>
					<h3 className="h3header">Lunchplanner</h3>
				</center>
                <Card className="organisationCard">
				<CardText>
				<h2 className="h2header">SIGN UP</h2>

				<TextField
					id="name"
					label="name"
					value={this.state.firstName}
					onChange={this.handleChange('firstName')}
					floatingLabelText="First name"
					style= {styles.textField}
				/>

                <AutoComplete
                    ref = {"autocomplete"}
                    floatingLabelText="Organisation"
                    filter={AutoComplete.fuzzyFilter}
                    dataSource={this.state.usersList}
                    dataSourceConfig={this.state.usersListConfig}
                    maxSearchResults={5}
                    onNewRequest= {(chosenRequest, index) =>{

                    }}
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

				<RaisedButton
					backgroundColor="#b9b9b9"
					type="submit"
					label="OK"
					primary={true}
					disabled={!this.validateForm()}
					style = {styles.signupButton}
				/>
				<br/>
				</CardText>
				</Card>
				
			</form>
			</div>


        );
    }
}