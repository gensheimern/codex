import React from 'react';
import renderer from'react-test-renderer';

import CreateTeam from './CreateTeam';

describe('CreateTeam Snapshot', () => {
    test('renders', () =>{
        const component = renderer.create(
            <CreateTeam />
        );
        let tree= component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});