import React from 'react';
import {shallow, mount, render } from 'enzyme';
import EventItem from './EventItem';
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
    fetchMock.get( config.apiPath +'/user/me',
    {
        id:7,
        firstName: "Max",
        name: "Mustermann",
        email: "max.mustermann@gmail.com",
        image: "",
    
    });
    fetchMock.get(config.apiPath + '/activity/5/participants',[{
        id:7,
        firstName: "Max",
        name: "Mustermann",
        email: "max.mustermann@gmail.com",
        image: "",
    }])
  });

describe("EventItem", () => {
    let shallowEventItem;
    const eventItem = () => {
        if(!shallowEventItem){
            shallowEventItem = shallow(
                <EventItem event = {{
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
        return shallowEventItem;
    };

describe('EventItem Component', () =>{

        it('should render without throwing an error', () =>{
            expect(eventItem().exists(<form className = 'EventItem'></form>)).toBe(true)
        });

    });
});