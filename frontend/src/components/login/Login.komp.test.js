import React from 'react';
import {shallow, mount, render } from 'enzyme';
import Login from './Login';
import renderer from 'react-test-renderer';

describe('Login Component', () =>{

    it('should render without throwing an error', () =>{
        expect(shallow(<Login />).exists(<form className = 'Login'></form>)).toBe(true)
    });

   

    /* describe('Email input', () => {
        it('should respond to change event and change the state of the Login Component', () =>{
            const wrapper = shallow(<Login />)
            wrapper.find('#email').simulate('change', {target:
                {name: 'email', value: 'blah@gmail.com'}
            });
            expect(wrapper.state('password')).toEqual('blah@gmail.com')
        })
    })
       
    describe('Password input', () => {
        it('should respond to change event and change the state of the Login Component', () => {
            const wrapper = shallow(<Login />)
            wrapper.find('#password').simulate('change', {target: {name: 'password', value: 'cats'}})
            expect(wrapper.state('password')).toEqual('cats')
        })
    }) */
     
});