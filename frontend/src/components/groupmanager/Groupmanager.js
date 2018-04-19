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
            this.nameHostId = this.nameHostId.bind(this);
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
                this.nameHostId();
            }).catch((err) => {
                this.setState({
                    groups: []
                });
            });

        }

        nameHostId() {
                for(let i = 0; i < this.state.groups.length; i++) {
                    let TMid = this.state.groups[i].Teammanager;
                    let Tid = this.state.groups[i].Team_Id;
                    fetch(config.apiPath + "/user/" + TMid, {
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
                        }).then(resN => resN.json()).then(resN => {
                                let resNM = this.state.groups;
                                let theButton
                                theButton = <button type = "button"
                onClick = {
                        () => this.SendTeamToDelete.bind(this)(Tid)
                    } >
                    Delete the Group </button>
                resNM[i].button = theButton;
                if(resN.length > 0)
                    resNM[i].Teammanager = resN[0].Firstname + " " + resN[0].Name;

                this.setState({
                    groups: resNM
                });

                // }).catch((err) => {
                //     this.setState({groups: []});
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