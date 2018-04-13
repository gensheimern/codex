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

    loadContent() {
        console.log(localStorage.getItem('apiToken'))
        fetch(config.apiPath + "/team", {
            headers: {
                'Content-Type': 'application/json',
                'X-Access-Token': localStorage.getItem('apiToken')
            }
        }).then((res) => {
            if (!res.ok) {
                throw new Error("Request failed.");
            } else if (res.status !== 200) {
                throw new Error("Forbidden");
            } else {
                return res;
            }
        }).then(res => res.json()).then(res => {
            console.log(res);
            this.setState({groups: res});
        }).catch((err) => {
            this.setState({groups: []});
        });
    }

    render() {
        const columns = [
            {
                dataField: 'Team_Id',
                text: 'Team ID'
            }, {
                dataField: 'Teamname',
                text: 'Team Name'
            }, {
                dataField: 'Teammanager',
                text: 'Team Leiter'
            }
        ];

        return (<div className="listTeams">
            <div>
                <BootstrapTable keyField='Team_Id' data={this.state.groups} columns={columns}/>
            </div>
        </div>);
    }
}