/*
* @author:Stella Neser
*  Komponente ist ein Snapshottest
*/
import React from 'react';
import renderer from'react-test-renderer';
import JoinNotification from './JoinNotification';
import config from '../../config';
import {MemoryRouter} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const fetchMock = require('fetch-mock');

describe('JoinNotification Snapshot', () => {
   test('renders', () =>{
       const component = renderer.create(
           <MemoryRouter>
               <MuiThemeProvider>
                   <JoinNotification/>
               </MuiThemeProvider>
           </MemoryRouter>
       );
       let tree= component.toJSON();
       expect(tree).toMatchSnapshot();
   });
});