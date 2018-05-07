import React from 'react';
import renderer from'react-test-renderer';

import Sidebar from './Sidebar';
// läuft wenn Max props umschreibt ansonsten alle 46 probps aufschreiben 
describe('Sidebar Snapshot', () => {
    test('renders', () =>{
        const component = renderer.create(
            <Sidebar />
        );
        let tree= component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});