/*
* @author:Stella Neser
*  Komponente ist ein Snapshottest
*/
import React from 'react';
import renderer from'react-test-renderer';
import TextNotification from './TextNotification';
import config from '../../config';
import {MemoryRouter} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const fetchMock = require('fetch-mock');

describe('TextNotification Snapshot', () => {
   test('renders', () =>{
       const component = renderer.create(
           <MemoryRouter>
               <MuiThemeProvider>
                   <TextNotification title= "Test" type= "private" message= "Das ist eine Test" time= "" seen ={true} />
               </MuiThemeProvider>
           </MemoryRouter>
       );
       let tree= component.toJSON();
       expect(tree).toMatchSnapshot();
   });
});