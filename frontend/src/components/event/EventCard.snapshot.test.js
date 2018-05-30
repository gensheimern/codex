import React from 'react';
import renderer from'react-test-renderer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
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

describe('EventCard Snapshot', () => {
    test('renders', () =>{
        const component = renderer.create(
            <MuiThemeProvider>
                <EventCard  event = {{
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
                }]} />
            </MuiThemeProvider>
        );
        let tree= component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
