/*
*@author Stella Neser & Diana Beldiman 
* Komponente erzeugt ein Dialogfeld für die Datenschutzgrundverordnung(Dsgvo)
* Wird bei der Registrierung nach aufrufen angezeigt
* Komponente lädt den Text der Dsgvo aus DsgvoText.js 
*/
import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import CreateDsgvoText from '../signup/DsgvoText';

const styles = {
    radioButton: {
      marginTop: 16,
    },
  };

/**
 * Dialog content can be scrollable.
 */
export default class Dsgvo extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            open: false,
        };
    }
      handleOpen = () => {
        this.setState({open: true});
      };

      handleClose = () => {
        this.setState({open: false});
      };

      handleClick = () => {
        this.props.closeDrawer();
        this.handleOpen();
      };

      
    render(){
        const actions = [
            <FlatButton
              label="Back"
              primary={true}
              onClick={this.handleClose}
            />,
        ];     
        
        return(
        <div>
            <FlatButton className="flatButton1" label="read here" onClick={this.handleOpen}/>
            <Dialog
            title="Datenschutzerklärung"
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
            autoScrollBodyContent={true}
            >
           <p>{CreateDsgvoText.dsgvo}</p>
            </Dialog>
        </div>        
        );
    }
}
