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
                <br/>
                <b>So übst du deine Rechte aus</b>
                <br/>
            Gemäß der Datenschutz-Grundverordnung oder anderen geltenden Gesetzen hast du das Recht auf Auskunft, Berichtigung,
            Übertragbarkeit bzw. Löschung deiner Informationen sowie das Recht, bestimmte Verarbeitungen deiner Informationen einzuschränken bzw. ihnen zu widersprechen.
            Dies umfasst auch das Recht, unserer Verarbeitung deiner Informationen für Direktwerbung zu widersprechen und das Recht, unserer Verarbeitung deiner Informationen
            zu widersprechen, wenn wir eine Aufgabe im öffentlichen Interesse wahrnehmen oder unsere berechtigten Interessen bzw. die eines Dritten verfolgen. Du kannst auf deine
            Informationen zugreifen bzw. sie übertragen, indem du unsere In-App-Funktion „Profile Settings“ (verfügbar unter Profilbild > Profile Settings) nutzt. Dort kannst du direkt
            deine Informationen berichtigen, aktualisieren und löschen. Wenn wir deine Informationen aufgrund unserer berechtigten Interessen bzw. aufgrund der berechtigten Interessen
            eines Dritten oder im öffentlichen Interesse verarbeiten, kannst du dieser Verarbeitung widersprechen. Wir stellen dann die Verarbeitung deiner Informationen ein, es sei denn
            die Verarbeitung basiert auf zwingenden berechtigten Gründen oder ist aus rechtlichen Gründen erforderlich.
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
            <br/>

            <h2>1. Welche Arten von Informationen erfassen wir?</h2>
            Meet’n’Eat muss einige Informationen erhalten oder erfassen, um unseren Dienst zu betreiben, anzubieten und zu verbessern. Dies geschieht u. a. wenn du unseren Dienst installierst,
            nutzt oder auf sie zugreifst. Die Arten von Informationen, die wir erhalten und erfassen, hängen davon ab, wie du unseren Dienst nutzt.
            <br/>
            <b>Informationen, die du zur Verfügung stellst :</b>
            <ul>
                <li><b>Deine Account Informationen.</b> <br/> Um einen Meet’n’Eat Account zu erstellen, gibst du deine E-mail und grundlegende Informationen (Vorname, Nachnahme und Passwort) an.
                Du kannst auch später andere Informationen zu deinem Account hinzufügen, wie beispielsweise ein Profilbild , Telefonnummer und Geburtstagsdatum.</li>
                <li><b>Deine Kommentaren.</b> <br/> Wir speichern deine Kommentare im Rahmen der Bereitstellung unseres Dienstes. Sobald das Event, an dem du kommentiert hast,
                gelöscht wird, werden die Kommentaren von unseren Servern gelöscht. Die in eine Gruppe von dir zugestellten Nachrichten , können von dir manuell gelöscht werden
                oder werden erst automatisch bei löschung der Gruppe entfernt.</li>
                <li><b>Dein Netzwerk.</b> <br/> Damit du besser bzw. einfacher mit anderen kommunizieren kannst, können wir dir bei der Identifizierung deiner Kontakte helfen,
                die ebenfalls Meet’n’Eat nutzen. Du kannst dann Gruppen erstellen, ihnen beitreten oder zu ihnen hinzugefügt werden. Solche Gruppen werden mit deinen Account-Informationen
                verknüpft. Du vergibst einen Namen für deine Gruppen. Du kannst auswählen, ob du ein Gruppenprofilbild oder eine Gruppenbeschreibung bereitstellst.</li>
            </ul>
            <br/>

            <h2>2. Wie verwenden wir diese Informationen?</h2>
            Du teilst deine Informationen, wenn du unseren Dienst nutzt und über diesen kommunizierst, und wir teilen deine Informationen, damit wir unseren Dienst betreiben, anbieten,
            verbessern, verstehen, individualisieren, unterstützen und vermarkten können.
            <br/>
            <ul>
                <li><b>Unser Dienst.</b> <br/> Wir verwenden die uns zur Verfügung stehenden Informationen, um unseren Dienst zu betreiben und bereitzustellen; dazu gehören auch das Anbieten eines
                Customer Supports und die Verbesserung, Instandsetzung und Individualisierung unseres Dienstes. Wir verstehen, wie Menschen unseren Dienst nutzen, und wir analysieren und verwenden
                die uns zur Verfügung stehenden Informationen, um unseren Dienst zu bewerten und zu verbessern, neue Dienste und Funktionen zu erforschen, zu entwickeln und zu testen und Aktivitäten
                zur Problem- bzw. Fehlerbehebung durchzuführen. Deine Informationen verwenden wir auch, um dir zu antworten, wenn du uns kontaktierst.</li>
                <li><b>Account-Informationen.</b> <br/> Deine E-mail und deine Profil-Informationen sind möglicherweise für jeden verfügbar, der unsere Dienste nutzt, obwohl du deine Einstellungen
                für Dienste konfigurieren kannst, um bestimmte Informationen zu verwalten, die für andere Nutzer und Unternehmen verfügbar sind, mit denen du kommunizierst.</li>
                <li><b>Keine Werbebanner von Dritten.</b> <br/> Wir gestatten weiterhin keine Werbebanner von Dritten auf Meet’n’Eat. Wir haben keine Absicht sie einzuführen, sollten wir es jedoch
                jemals beabsichtigen, werden wir diese Richtlinie aktualisieren.</li>
            </ul>
            <br/>

            <h2>3. Wie werden diese Informationen geteilt?</h2>
            Deine Informationen werden folgendermaßen mit anderen geteilt:
            <ul>
              <li><b>Personen mit denen du kommunizierst. </b><br/> Wenn du unter Nutzung unserer Produkte kommunizierst, wählst du die Zielgruppe für deine Inhalte aus, die du teilst. Wenn du beispielsweise
              etwas auf Meet’n’Eat schreiben willst, wählst du die Zielgruppe für den Beitrag aus: z. B. eine private Gruppe,ein privates oder öffentliches Event. Wenn du unsere Produkt nutzt, um mit Personen
              zu kommunizieren, können diese Personen die Inhalte sehen, die du sendest.</li>
              <li><b>Öffentliche Informationen. </b><br/> Öffentliche Informationen können von jedem auf unseren Produkten gesehen werden, also nur wenn er/sie ein Konto hat. Dies umfasst deinen Namen, jedwede Informationen,
               die du eingegeben hast, sowie Telefonnummer, Geburtsdatum, E-mail, deine Position in der Firma und den Raum in dem du arbeitest.</li>
              <li><b>Inhalte, die andere über dich (erneut) teilen.</b><br/> Du solltest dir gut überlegen, was für Inhalte du teilst, da die Personen, die deine Aktivität auf unseren Produkten sehen können, die Inhalte mit
              anderen außerhalb von unseren Produkten teilen können, einschließlich Personen und Unternehmen, die nicht zu der Zielgruppe gehören, mit der du die Inhalte geteilt hast. Wenn du zum Beispiel ein Kommentar
              an bestimmte Gruppen oder Events schreibst, können sie diesen Inhalt herunterladen, einen Screenshot davon anfertigen oder ihn erneut mit anderen auf oder außerhalb von unseren Produkten, in persönlichen
              Erlebnissen oder solchen der virtuellen Realität wie Facebook Spaces teilen. Außerdem ist, wenn du einen Beitrag von jemand anderem kommentierst oder auf dessen Inhalte reagierst, dein Kommentar bzw. deine
              Reaktion für jeden sichtbar, der die Inhalte der anderen Person sehen kann; darüber hinaus kann eine solche Person später die Zielgruppe ändern. </li>
              <li><b>Neuer Eigentümer.</b><br/> Sollten sich die Eigentums- oder Machtverhältnisse aller bzw. eines Teils unserer Produkte oder ihrer Vermögenswerte ändern, können wir deine Informationen an den neuen Eigentümer
               übertragen. Der neue Eigentümer ist für die Überarbeitung an der DSGVO selbst verantwortlich. </li>
            </ul>
            <br/>

            <h2>4. Wie kannst du deine gemäß DSGVO gewährten Rechte ausüben?</h2>
            Gemäß Datenschutz-Grundverordnung hast du das Recht auf Auskunft, Berichtigung, Übertragbarkeit bzw. Löschung deiner Daten. Du hast auch das Recht Widerspruch einzulegen gegen bestimmte Verarbeitungen deiner
            Daten bzw. sie einzuschränken. Dazu gehören:

            <ul>
              <li>das Recht, Widerspruch gegen unsere Verarbeitung deiner Daten einzulegen, welches du durch Verwendung des „Profil Settings“-Link ausüben kannst; </li>
              <li>das Recht, Widerspruch gegen unsere Verarbeitung deiner Daten in dem Fall einzulegen, wenn wir eine Aufgabe im öffentlichen Interesse erfüllen oder unsere berechtigten Interessen bzw. die eines Dritten verfolgen. </li>
            </ul>
            <br/>

            <h2>5. Datenspeicherung, Deaktivierung und Löschung von Konten</h2>
            Wir speichern Daten bis sie nicht mehr benötigt werden, um unseren Dienst bereitzustellen, oder bis dein Konto gelöscht wird - je nachdem, was zuerst eintritt. Dies ist eine Einzelfallbestimmung und hängt von
            Dingen ab wie der Art der Daten, warum sie erfasst und verarbeitet werden sowie den relevanten rechtlichen oder betrieblichen Speicherbedürfnissen.
            Wenn du dein Konto löschst, löschen wir von dir gepostete Dinge, wie beispielsweise deine Fotos und Profil Informationen, und diese Informationen kannst du anschließend nicht wiederherstellen. Informationen,
            die andere über dich geteilt haben, gehören nicht zu deinem Konto und werden nicht gelöscht. Um dein Konto jederzeit zu löschen, gehe bitte zu den “Profil-Settings”.

            <h2>6. So kontaktierst du Codex bei Fragen</h2>
            <br/>
            <ul>
                <li><b>Aktualisierungen unserer Richtlinie</b><br/>Wir benachrichtigen dich, bevor wir Änderungen an dieser Datenschutzrichtlinie vornehmen, und geben dir die Gelegenheit, die überarbeitete Datenschutzrichtlinie zu überprüfen,
                bevor du dich dazu entscheidest, unseren Dienst weiterhin zu nutzen.</li>
                <li><b>Kontaktinformationen</b><br/>Solltest du Fragen zu unserer Datenschutzrichtlinie haben, kontaktiere uns bitte oder schreibe uns unter:</li>
            </ul>
            <br/>
                Codex   <br/>
                support@codex.de  <br/>
                Paul-Wittsack-Straße 10  <br/>
                68163 Mannheim  <br/>
                Deutschland  <br/>

            </CardText>
        </Card>
        );
    }
}
