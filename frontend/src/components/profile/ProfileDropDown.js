import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

const styles = {
  customWidth: {
    width: 37,
    height: 37
  },
};


export default class ProfileDropDown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: 1};
      }

    handleChange = event => {
        this.setState({
        [event.target.id]: event.target.value
        });
    }
    render(){
        return(
            <div>
                <DropDownMenu 
                value={this.state.value} 
                onChange= {this.handleChange}
                style = {styles.customWidth} 
                autoWidth ={false}
                >
                    <MenuItem value= {1} Dein Profil />
                    <MenuItem value= {2} primaryText = "Sprache Wechseln" />
                    <MenuItem value= {3} primaryText = "Neuen Usere Registrieren" />
                    <MenuItem value= {3} primaryText = "Log Out" href="/logout"/>
                </DropDownMenu>
            </div>
        );
    }
}