import React from 'react';
import renderer from'react-test-renderer';
import SearchBar from './SearchBar';
import config from '../../config';
import {MemoryRouter} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
const fetchMock = require('fetch-mock');

beforeEach(() => {
    window.localStorage = {getItem: () => ""};
    fetchMock.get(config.apiPath +'/user/me',{
        id: 6,
        firstName: 'Max',
        name: 'Mustermann',
        email: 'max.mustermann@gmail.com',
        image: '',
        me: true,
    });

    fetchMock.get(config.apiPath +'/user/me/notifications/unseen', {
        unseenNotifications: 4,
		
    });
});

afterEach(() => {
    fetchMock.restore();
   });

describe('SearchBar Snapshot', () => {
    test('renders', () =>{
        const component = renderer.create(
            <MemoryRouter>
                <MuiThemeProvider>
                    <SearchBar/>
                </MuiThemeProvider>
            </MemoryRouter>
        );
        let tree= component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});