/**
 * @author:Stella Neser
 *  Komponente ist ein Snapshottest
 */
import React from 'react';
import renderer from'react-test-renderer';
import CreateEventCard from './CreateEventCard';
import config from '../../config';
import {MemoryRouter} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const fetchMock = require('fetch-mock');

describe('CreateEventCard Snapshot', () => {
    test('renders', () =>{
        const component = renderer.create(
            <MemoryRouter>
                 <MuiThemeProvider>
                    <CreateEventCard/>
                </MuiThemeProvider>
            </MemoryRouter>
        );
        let tree= component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});