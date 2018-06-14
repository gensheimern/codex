/**
 * @author:Stella Neser
 *  Komponente ist ein Snapshottest
 */
import React from 'react';
import renderer from'react-test-renderer';
import JoinOrganization from './JoinOrganization';
import config from '../../config';
import {MemoryRouter} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
const fetchMock = require('fetch-mock');

describe('JoinOrganization Snapshot', () => {
    test('renders', () =>{
        const component = renderer.create(
            <MemoryRouter>
                <MuiThemeProvider>
                    <JoinOrganization/>
                </MuiThemeProvider>
            </MemoryRouter>
        );
        let tree= component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});