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
import CreateTeam from './CreateTeam.js'
import ListGroups from './ListGroups.js'
import logo from '../../IMG/codex_logo1x.png';
import config from '../../config';
import BootstrapTable from 'react-bootstrap-table-next';

export default class Groupmanager extends React.Component {
    render() {
        return(<React.Fragment><CreateTeam/><ListGroups/></React.Fragment>)
    }
}