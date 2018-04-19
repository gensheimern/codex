import React from "react";
import {
    Button,
    FormGroup,
    FormControl,
    ControlLabel,
    Alert,
    Table
} from "react-bootstrap";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import "./groupmanager.css";
import logo from '../../IMG/codex_logo1x.png';
import config from '../../config';
import BootstrapTable from 'react-bootstrap-table-next';

export default class ListTeams extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            groups: []
        };
    }

    componentDidMount() {
        this.loadContent();
    }
    nameHostId() {

        let resN;
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
                theButton = <button type="button" onClick={() => this.SendTeamToDelete.bind(this)(Tid)}>
                    Delete the Group
                </button>
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

    loadContent() {
        console.log(localStorage.getItem('apiToken'))
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
            console.log(res);
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

    render() {
        const columns = [{
            dataField: 'Team_Id',
            text: 'Team ID'
        }, {
            dataField: 'Teamname',
            text: 'Team Name'
        }, {
            dataField: 'Teammanager',
            text: 'Team Leiter'
        }];

        return(<div className="listTeams">
            <div>
                <BootstrapTable keyField='Team_Id' data={this.state.groups} columns={columns}/>
            </div>
        </div>);
    }
}