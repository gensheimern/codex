import React from 'react';
import renderer from'react-test-renderer';
import ProfileToolbar from './ProfileToolbar';
import config from '../../config';
import {MemoryRouter} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
const fetchMock = require('fetch-mock');

beforeEach(() => {
    window.localStorage = {getItem: () => ""};
    fetchMock.get(config.apiPath +'/team', 
    [ { id: 6,
		name: "Döner",
		manager: {
			id: 6,
		    firstName: "Max",
		    name: "Mustermann",
		    email: "max.mustermann@web.de",
		    image: "",
		    me: true,
		},
    }]);

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

describe('ProfileToolbar Snapshot', () => {
    test('renders', () =>{
        const component = renderer.create(
            <MemoryRouter>
                <MuiThemeProvider>
                    <ProfileToolbar/>
                </MuiThemeProvider>
            </MemoryRouter>
        );
        let tree= component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});