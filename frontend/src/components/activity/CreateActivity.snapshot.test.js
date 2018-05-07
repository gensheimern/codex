import React from 'react';
import renderer from'react-test-renderer';

import CreateActivity from './CreateActivity';

describe('CreateActivity Snapshot', () => {
    test('renders', () =>{
        const component = renderer.create(
            <CreateActivity />
        );
        let tree= component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});