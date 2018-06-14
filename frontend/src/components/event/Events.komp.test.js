/**
 * @author:Stella Neser
 *  Komponente ist ein Komponententest
 */
import React from 'react';
import {shallow, mount, render } from 'enzyme';
import Events from './Events';
import renderer from 'react-test-renderer';
import config from '../../config';

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

describe('Events Component', () =>{

    it('should render without throwing an error', () =>{
    expect(shallow(<Events />).exists(<form className = 'Events'></form>)).toBe(true)
    });

});