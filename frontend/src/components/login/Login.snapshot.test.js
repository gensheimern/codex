import React from 'react';
import renderer from'react-test-renderer';
import Login from './Login';
import config from '../../config';
import {MemoryRouter} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

//const fetchMock = require('fetch-mock');

describe('Login Snapshot', () => {
    test('renders', () =>{
        const component = renderer.create(
            <MemoryRouter>
                <MuiThemeProvider>
                    <Login/>
                </MuiThemeProvider>
            </MemoryRouter>
        );
        let tree= component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});