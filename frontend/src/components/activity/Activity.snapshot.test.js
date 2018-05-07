import React from 'react';
import renderer from'react-test-renderer';

import Activity from './Activity';

describe('Activity Snapshot', () => {
    test('renders', () =>{
        const component = renderer.create(
            <Activity />
        );
        let tree= component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});