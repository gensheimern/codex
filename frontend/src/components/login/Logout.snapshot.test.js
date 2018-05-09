import React from 'react';
import renderer from'react-test-renderer';
import {MemoryRouter} from 'react-router-dom';
import Logout from './Logout';

describe('Logout Snapshot', () => {
    test('renders', () =>{
        const component = renderer.create(
            <MemoryRouter><Logout/> </MemoryRouter>
        );
        let tree= component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});