import React from 'react';
import renderer from'react-test-renderer';
import SidebarContent from './SidebarContent';
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
			id: 8,
		    firstName: "Max",
		    name: "Mustermann",
		    email: "max.mustermann@web.de",
		    image: "",
		    me: true,
		},
    }]);
});

describe('SidebarContent Snapshot', () => {
    test('renders', () =>{
        const component = renderer.create(
            <MemoryRouter>
                <MuiThemeProvider>
                    <SidebarContent/>
                </MuiThemeProvider>
            </MemoryRouter>
        );
        let tree= component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});