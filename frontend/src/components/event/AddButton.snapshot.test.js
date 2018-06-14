/**
 * @author:Stella Neser
 *  Komponente ist ein Snapshottest
 */
import React from 'react';
import renderer from'react-test-renderer';
import AddButton from './AddButton';
import config from '../../config';
import {MemoryRouter} from 'react-router-dom';

const fetchMock = require('fetch-mock');

describe('AddButton Snapshot', () => {
    test('renders', () =>{
        const component = renderer.create(
            <MemoryRouter>
                <AddButton/>
            </MemoryRouter>
        );
        let tree= component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});