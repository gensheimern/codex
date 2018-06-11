import React from 'react';
import renderer from'react-test-renderer';
import Events from './Events';
import config from '../../config';
import {MemoryRouter} from 'react-router-dom';

const fetchMock = require('fetch-mock');

beforeEach(() => {
    window.localStorage = {getItem: () => ""};
    fetchMock.get(config.apiPath +'/activity/5/message', 
    [ { id: 6,
        time: new Date('12.12.2018'),
        content: "",
        author:{
            id:7,
            firstName: "",
            name: "",
            email: "",
            img: "",
        }
    }]);
    fetchMock.get( config.apiPath +'/user/me',{
        id:7,
        firstName: "Max",
        name: "Mustermann",
        email: "max.mustermann@gmail.com",
        image: "",
        me: true,
    });
    fetchMock.get(config.apiPath +'/activity',{
        id:8,
		description: "",
		name: "",
		place: "",
		time: new Date('01.06.2018'),
		event: true,
		private: true,
		banner: "",
		maxParticipants: "",
		host: {
			id:7,
            firstName: "Max",
            name: "Mustermann",
            email: "max.mustermann@gmail.com",
            image: "",
            me: true,
		},
    });
  });

  afterEach(() => {
   fetchMock.restore();
  });

describe('Events Snapshot', () => {
    test('renders', () =>{
        const component = renderer.create(
            <MemoryRouter>
            <Events/>
            </MemoryRouter>
        );
        let tree= component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});