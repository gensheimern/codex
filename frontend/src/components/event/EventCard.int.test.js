import React from 'react';
import {shallow, mount} from 'enzyme';
import EventCard from './EventCard';
import config from '../../config';
const fetchMock = require('fetch-mock');



beforeEach(() => {
    window.localStorage = {getItem: () => ""};
    fetchMock.get(config.apiPath +'/activity/5/message', [ { id: 6,
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
  });

  afterEach(() => {
   fetchMock.restore();
  });

describe("EventCard", () => {
    let mountedCreateTeam;
    const createTeam = () => {
        if(!mountedCreateTeam){
            mountedCreateTeam = mount(
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
        return mountedCreateTeam;
    };
    
    it("always renders a div", () => {
        const divs = createTeam().find("div");
        expect(divs.length).toBeGreaterThan(0);
    });

    it("contains everything else that gets rendered", () => {
        const divs = createTeam().find("div");
        const wrappingDiv = divs.first();
        expect(wrappingDiv.children).toEqual(createTeam().children);
    });
});

