import React from 'react';
import {shallow, mount, render } from 'enzyme';
import Signup from './Signup';
import renderer from 'react-test-renderer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

describe('Signup Component', () =>{

    it('should render without throwing an error', () =>{
        expect(shallow(<Signup />).exists(<form className = 'Signup'></form>)).toBe(true)
    });

    it('renders a firstname input', () => {
        expect(shallow(<Signup/>).find('#firstName').length).toEqual(1)
    });

    it('renders a name input', () => {
        expect(shallow(<Signup/>).find('#name').length).toEqual(1)
    });

    it('renders a email input', () => {
        expect(shallow(<Signup/>).find('#email').length).toEqual(1)
    });

    it('renders a password input', () => {
        expect(shallow(<Signup />).find('#password').length).toEqual(1)
    });
    
    it('renders a retypepassword input', () => {
        expect(shallow(<Signup />).find('#retypePassword').length).toEqual(1)
    });

    it ('should render one <RaisedButton/> component', () =>{
        const wrapper = shallow(<Signup />);
        expect(wrapper.find("RaisedButton").length).toBe(1);
        
     });
});