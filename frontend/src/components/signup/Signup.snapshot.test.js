import React from 'react';
import renderer from'react-test-renderer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Signup from './Signup';

describe('Signup Snapshot', () => {
    test('renders', () =>{
        const component = renderer.create(
            <MuiThemeProvider>
                <Signup />
            </MuiThemeProvider>
        );
        let tree= component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});