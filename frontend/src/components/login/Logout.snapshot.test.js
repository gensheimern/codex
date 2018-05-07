import React from 'react';
import renderer from'react-test-renderer';

import Logout from './Logout';

describe('Logout Snapshot', () => {
    test('renders', () =>{
        const component = renderer.create(
            <Logout/>
        );
        let tree= component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});