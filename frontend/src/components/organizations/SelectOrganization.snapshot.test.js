/**
 * @author:Stella Neser
 *  Komponente ist ein Snapshottest
 */
import React from 'react';
import renderer from'react-test-renderer';
import SelectOrganization from './SelectOrganization';
import config from '../../config';
import {MemoryRouter} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
const fetchMock = require('fetch-mock');

beforeEach(() => {
    window.localStorage = {getItem: () => ""};
    fetchMock.get( config.apiPath +'/organization/',
    {
        id: 8,
		name: "Das Team",
		description: "Der Test",
		admin: {
            id:7,
            firstName: "Max",
            name: "Mustermann",
            email: "max.mustermann@gmail.com",
            image: "",
            me: true,
		},
    });
});

describe('SelectOrganization Snapshot', () => {
    test('renders', () =>{
        const component = renderer.create(
            <MemoryRouter>
                <MuiThemeProvider>
                    <SelectOrganization organizations= {[]}/>
                </MuiThemeProvider>
            </MemoryRouter>
        );
        let tree= component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});