import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import config from '../../config';
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
});

  afterEach(() => {
    fetchMock.restore();
   });


it('renders without crashing', () => {
  window.localStorage = {
    getItem: () => '',
  };
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
