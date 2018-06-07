import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

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
    render(){
        const actions = [
            <FlatButton
              label="Cancel"
              primary={true}
              onClick={this.handleClose}
            />,
            <FlatButton
              label="Submit"
              primary={true}
              keyboardFocused={true}
              onClick={this.handleClose}
            />,
          ];
      
          const radios = [];
          for (let i = 0; i < 30; i++) {
            radios.push(
              <RadioButton
                key={i}
                value={`value${i + 1}`}
                label={`Option ${i + 1}`}
                style={styles.radioButton}
              />
            );
          }
      

        return(
/* Hier neue !!! Keine Karte mehr  schreib unten ruhig weiter muss dann oben eingesetzt werden */
        <div>
            <form>
            <RaisedButton label="Datenschutzerklärung" onClick={this.handleOpen} />
            <Dialog
            title="Datenschutzerklärung"
            
            
            
            
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
            autoScrollBodyContent={true}
            >
            <RadioButtonGroup name="shipSpeed" defaultSelected="not_light">
            {radios}
            </RadioButtonGroup>
            </Dialog>
            </form>
        </div>
/*Hier neu !! Keine Karte mehr  schreib unten ruhig weiter muss dann oben eingesetzt werden */

/*
        <Card>
            <CardTitel titel = "Datenschutzerklärung" subtitle= "(Vorschlag)"/ >
            <CardText>
            Diese Richtlinie beschreibt die Informationen, die wir zur Unterstützung von Meet’n’Eat verarbeiten.

            <b> Unsere Rechtsgrundlagen für die Verarbeitung von Informationen </b>
            <br/>
                Wir erfassen, verwenden und teilen die uns zur Verfügung stehenden Informationen auf die 
                oben beschriebene Art und Weise:
                <ul>
                    <li> wie es zur Erfüllung unserer Bedingungen erforderlich ist;</li>
                    <li>gemäß deiner Einwilligung, die du jederzeit widerrufen kannst;</li>
                    <li>wie es zur Erfüllung unserer rechtlichen Pflichten erforderlich ist;</li>
                    <li>mitunter, um deine lebenswichtigen Interessen oder die von anderen zu schützen;</li>
                    <li>wie es im öffentlichen Interesse erforderlich ist; </li>
                    <li>wie es für unsere berechtigten Interessen (sowie die von anderen) erforderlich ist, 
                        einschließlich unserer Interessen daran, innovative, relevante, sichere und profitable Dienste 
                        für unsere Nutzer und Partner bereitzustellen, sofern deine Interessen oder Grundrechte und 
                        Grundfreiheiten, die den Schutz personenbezogener Daten erfordern, nicht überwiegen.;</li>
                </ul>
            <b>So übst du deine Rechte aus</b>
            Gemäß der Datenschutz-Grundverordnung oder anderen geltenden Gesetzen hast du das Recht auf Auskunft, Berichtigung,
            Übertragbarkeit bzw. Löschung deiner Informationen sowie das Recht, bestimmte Verarbeitungen deiner Informationen einzuschränken bzw. ihnen zu widersprechen. 
            Dies umfasst auch das Recht, unserer Verarbeitung deiner Informationen für Direktwerbung zu widersprechen und das Recht, unserer Verarbeitung deiner Informationen 
            zu widersprechen, wenn wir eine Aufgabe im öffentlichen Interesse wahrnehmen oder unsere berechtigten Interessen bzw. die eines Dritten verfolgen. Du kannst auf deine Informationen zugreifen bzw. sie übertragen, indem du unsere In-App-Funktion „Profile Settings“ (verfügbar unter Profilbild > Profile Settings) nutzt. Dort kannst du direkt deine Informationen berichtigen, aktualisieren und löschen. Wenn wir deine Informationen aufgrund unserer berechtigten Interessen bzw. aufgrund der berechtigten Interessen eines Dritten oder im öffentlichen Interesse verarbeiten, kannst du dieser Verarbeitung widersprechen. Wir stellen dann die Verarbeitung deiner Informationen ein, es sei denn die Verarbeitung basiert auf zwingenden berechtigten Gründen oder ist aus rechtlichen Gründen erforderlich. 
            <br/>
            <b>Inhaltsverzeichnis</b>
            <ol type ="1">
                <li>Welche Arten von Informationen erfassen wir?</li>	
                <li>Wie verwenden wir diese Informationen?</li>	
                <li>Wie werden diese Informationen geteilt?	</li>
                <li>Wie kannst du deine gemäß DSGVO gewährten Rechte ausüben?</li>	
                <li>Datenspeicherung, Deaktivierung und Löschung von Konten</li>
                <li>So kontaktierst du Codex bei Fragen</li>
            </ol>  

            <h2>1. Welche Arten von Informationen erfassen wir?</h2>
            Meet’n’Eat muss einige Informationen erhalten oder erfassen, um unseren Dienst zu betreiben, anzubieten und zu verbessern. Dies geschieht u. a. wenn du unseren Dienst installierst, nutzt oder auf sie zugreifst. Die Arten von Informationen, die wir erhalten und erfassen, hängen davon ab, wie du unseren Dienst nutzt.

            <b>Informationen, die du zur Verfügung stellst :</b>
            <ul>
                <li><b>Deine Account Informationen.</b> Um einen Meet’n’Eat Account zu erstellen, gibst du deine E-mail und grundlegende Informationen (Vorname, Nachnahme und Passwort) an. Du kannst auch später andere Informationen zu deinem Account hinzufügen, wie beispielsweise ein Profilbild , Telefonnummer und Geburtstagsdatum.</li>
                <li><b>Deine Kommentaren.</b> Wir speichern deine Kommentare im Rahmen der Bereitstellung unseres Dienstes. Sobald das Event, an dem du kommentiert hast, gelöscht wird, werden die Kommentaren von unseren Servern gelöscht. Die in eine Gruppe von dir zugestellten Nachrichten , können von dir manuell gelöscht werden oder werden erst automatisch bei löschung der Gruppe entfernt.</li>
                <li><b>Dein Netzwerk.</b> Damit du besser bzw. einfacher mit anderen kommunizieren kannst, können wir dir bei der Identifizierung deiner Kontakte helfen, die ebenfalls Meet’n’Eat nutzen. Du kannst dann Gruppen erstellen, ihnen beitreten oder zu ihnen hinzugefügt werden. Solche Gruppen werden mit deinen Account-Informationen verknüpft. Du vergibst einen Namen für deine Gruppen. Du kannst auswählen, ob du ein Gruppenprofilbild oder eine Gruppenbeschreibung bereitstellst.</li>
            </ul>     



            
            </CardText>
        </Card> */           
        );
    }
}