import React from 'react';
import renderer from'react-test-renderer';

import Login from './Login';

describe('Login Snapshot', () => {
    test('renders', () =>{
        const component = renderer.create(
            <Login/>
        );
        let tree= component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});