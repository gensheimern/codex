/*
*@author Stella Neser & Diana Beldiman 
* Komponente erzeugt ein Dialogfeld für die Datenschutzgrundverordnung(Dsgvo)
* Wird bei der Registrierung nach aufrufen angezeigt
* Komponente lädt den Text der Dsgvo aus DsgvoText.js 
*/
import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import CreateDsgvoText from '../signup/DsgvoText';

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
            <React.Fragment>
                {/* <FlatButton 
                    className="flatButton1" 
                    label="read here "  // General Data Protection
                    labelStyle= {{ 
                        textTransform: 'none',
                    }}
                    hoverColor= "#F5F5F5"
                    onClick={this.handleOpen}
                /> */}

                <p style={{
                    textAlign: 'left',
                }}>
                    Accept <span
                        style={{
                            fontWeight: 500,
                            textDecoration: 'underline',
                            cursor: 'pointer',
                        }}
                        onClick={this.handleOpen}
                    >
                        General Data Protection
                    </span>
                </p>

                <Dialog
                    title="General Data Protection"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    autoScrollBodyContent={true}
                >
                    <p>{CreateDsgvoText.dsgvo}</p>
                </Dialog>
            </React.Fragment>        
        );
    }
}
