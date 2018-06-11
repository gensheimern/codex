import React from 'react';
import renderer from'react-test-renderer';
import {MemoryRouter} from 'react-router-dom';

import Signup from './Signup';

describe('Signup Snapshot', () => {
    test('renders', () =>{
        const component = renderer.create(
            <MemoryRouter>
                <Signup />
            </MemoryRouter>
        );
        let tree= component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});