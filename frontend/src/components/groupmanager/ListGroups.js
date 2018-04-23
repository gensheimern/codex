import React from "react";
import {
    Button,
    ButtonGroup
} from "react-bootstrap";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import "./groupmanager.css";
import config from '../../config';
import BootstrapTable from 'react-bootstrap-table-next';

export default class ListTeams extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            groups: [],
            unseen: []
        };

        this.SendTeamToDelete = this.SendTeamToDelete.bind(this);

        this.componentDidMount = this.componentDidMount.bind(this);

    }

    // componentDidUpdate(prevProps, prevState) {
    //      only update chart if the data has changed
    //     console.log('didpdate called');
    //     if (prevProps.data !== this.props.data) {
    //         this.listTeams = this.listTeams.load({data: this.props.data});
    //     }
    // }
    SendTeamToDelete(Tid) {
        fetch(config.apiPath + "/team/" + Tid, {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Access-Token': localStorage.getItem('apiToken')
                }
            })
            .then((resN) => {
                if(!resN.ok) {
                    throw new Error("Request failed.");
                } else if(resN.status !== 200) {
                    throw new Error("Forbidden");
                } else {
                    return resN;
                }
            })
            .then(resN => resN.json())
            .then(resN => {
                this.props.update();
            });
    }

    componentDidMount() {
        this.props.update();
    }

    render() {
        const columns = [{
            style: {},
            classes: 'span-1',
            dataField: 'Team_Id',
            text: 'Team ID'
            // headerStyle: {
            //   backgroundColor: 'lightblue'
        }, {
            classes: 'span-2',
            dataField: 'Teamname',
            text: 'Team Name'
        }, {
            classes: 'span-2',
            dataField: 'TMName',
            text: 'Team Leiter'
        }, {
            classes: 'span-1',
            dataField: 'buttongroup',
            text: 'Eintrag löschen',
            allign: 'center'
        }];

        return(<div className = "listTeams">
        <div>
        <BootstrapTable responsive = "responsive"
        keyField = 'Team_Id'
        data = {
          this.props.teams
        }
        columns = {
          columns
        }
        /> </div > </div>);
    }
}