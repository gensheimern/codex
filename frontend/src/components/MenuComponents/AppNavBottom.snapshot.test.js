/**
 * @author:Stella Neser
 *  Komponente ist ein Snapshottest
 */
import React from 'react';
import renderer from'react-test-renderer';
import AppNavBottom from './AppNavBottom';
import config from '../../config';
import {MemoryRouter} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const fetchMock = require('fetch-mock');

beforeEach(() => {
    window.localStorage = {getItem: () => ""};
    fetchMock.get(config.apiPath +'/user/me/notifications/unseen', {
        unseenNotifications: 4,
    
    });
});

describe('AppNavBottom Snapshot', () => {
    test('renders', () =>{
        const component = renderer.create(
            <MemoryRouter>
                 <MuiThemeProvider>
                    <AppNavBottom/>
                </MuiThemeProvider>
            </MemoryRouter>
        );
        let tree= component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});