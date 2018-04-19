import React from "react";
import {} from "react-bootstrap";
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

<<<<<<< HEAD
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
            }).then((resN) => {
                if(!resN.ok) {
                    throw new Error("Request failed.");
                } else if(resN.status !== 200) {
                    throw new Error("Forbidden");
                } else {
                    return resN;
                }
            }).then(resN => resN.json()).then(resN => {
                this.props.update;
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
                    dataField: 'Teammanager',
                    text: 'Team Leiter'
                }, {
                    classes: 'span-1',
                    dataField: 'button',
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
        /> </div > <
        /div>);
      }
    }
=======
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
>>>>>>> development
