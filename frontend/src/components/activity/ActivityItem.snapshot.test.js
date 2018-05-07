import React from 'react';
import renderer from'react-test-renderer';

import ActivityItem from './ActivityItem';
// networkrequest
// fetch mocken 
// 
describe('ActivityItem Snapshot', () => {
    test('renders', () =>{
        const component = renderer.create(
            <ActivityItem />
        );
        let tree= component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});