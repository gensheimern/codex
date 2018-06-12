import React from 'react';
import renderer from'react-test-renderer';
import FeedToolbar from './FeedToolbar';
import config from '../../config';
import {MemoryRouter} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const fetchMock = require('fetch-mock');

describe('Events Snapshot', () => {
    test('renders', () =>{
        const component = renderer.create(
            <MemoryRouter>
                 <MuiThemeProvider>
                    <FeedToolbar/>
                </MuiThemeProvider>
            </MemoryRouter>
        );
        let tree= component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});