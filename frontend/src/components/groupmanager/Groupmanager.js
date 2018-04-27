import React from "react";
import {} from "react-bootstrap";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import "./groupmanager.css";
import CreateTeam from './CreateTeam.js'
import config from '../../config';
import ListGroups from './ListGroups.js'

export default class Groupmanager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            groups: []
        };

        this.loadContent = this.loadContent.bind(this);
    }

    loadContent() {
        fetch(config.apiPath + "/team", {
            headers: {
                'Content-Type': 'application/json',
                'X-Access-Token': localStorage.getItem('apiToken')
            }
        }).then((res) => {
            if(!res.ok) {
                throw new Error("Request failed.");
            } else if(res.status !== 200) {
                throw new Error("Forbidden");
            } else {
                return res;
            }
        }).then(res => res.json()).then(res => {
            this.setState({
                groups: res
            });
            let resNM = this.state.groups;
            for(let i = 0; i < this.state.groups.length; i++) {
                let TMNameR;
                TMNameR = this.state.groups[i].Firstname + " " + this.state.groups[i].Name;
                resNM[i].TMName = TMNameR;
            }
            this.createGroupDeleteButtons();
        }).catch((err) => {
            this.setState({
                groups: []
            });
        });

    }
    createGroupDeleteButtons() {
        for(let i = 0; i < this.state.groups.length; i++) {
            //let TMid = this.state.groups[i].Teammanager;
            let Tid = this.state.groups[i].Team_Id;
            let resNM = this.state.groups;
            let theButton
            theButton = <button type = "button"
                onClick = {() => this.SendTeamToDelete.bind(this)(Tid)}>
                    Delete the Group </button>
            resNM[i].button = theButton;

            this.setState({
                groups: resNM
            });
        }

    }
    SendTeamToDelete(Tid) {
        fetch(config.apiPath + "/team/" + Tid, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Access-Token': localStorage.getItem('apiToken')
                }
            }).then((resN) => {
                if(!resN.ok) {
                    throw new Error("Request failed.");
                } else if(resN.status !== 200) {
                    throw new Error("Forbidden");
                } else {
                    return resN;
                }
            })
            .then(() => {
                this.loadContent();
            });
    }
    render() {
        return(<React.Fragment><CreateTeam update={this.loadContent}/><ListGroups update={this.loadContent} teams={this.state.groups}/></React.Fragment>)
    }
}