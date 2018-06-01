import React from 'react';
import {shallow, mount} from 'enzyme';
import EventCard from './EventCard';

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
describe("EventCard", () => {
    let mountedEventCard;
    const eventCard = () => {
        if(!mountedEventCard){
            mountedEventCard = mount(
                <EventCard event = {{
                    id: 5, description: "",
                    name: "", place: "", 
                    time: new Date('12.12.2018'),
                    event: true,
                    private: true,
                    banner:"",
                    maxParticipants:5,
                    host: {
                        id:5,
                        firstName: "",
                        name: "",
                        email: "",
                        img: "",
                    }
                }} 
                messages = {[
                   { id: 6,
                    time: new Date('12.12.2018'),
                    content: "",
                    author:{
                        id:7,
                        firstName: "",
                        name: "",
                        email: "",
                        img: "",
                    }
                }]}/>
            );
        }
        return mountedEventCard;
    };
    
    it("always renders a div", () => {
        const divs = eventCard().find("div");
        expect(divs.length).toBeGreaterThan(0);
    });

    it("contains everything else that gets rendered", () => {
        const divs = eventCard().find("div");
        const wrappingDiv = divs.first();
        expect(wrappingDiv.children).toEqual(eventCard().children);
    });
});

