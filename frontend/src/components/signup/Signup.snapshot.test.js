/**
 * @author:Stella Neser
 *  Komponente ist ein Snapshottest
 */
import React from 'react';
import renderer from'react-test-renderer';
import {MemoryRouter} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Signup from './Signup';
import config from '../../config';

describe('Signup Snapshot', () => {
    test('renders', () =>{
        const component = renderer.create(
            <MemoryRouter>
                <MuiThemeProvider>
                    <Signup />
                </MuiThemeProvider>
            </MemoryRouter> 
        );
        let tree= component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
