import React from 'react';
import Login from './Login';
import {shallow} from 'enzyme';


describe("Login component", () => {
	it('renders without crashing', () => {
		shallow(<Login />);
	});

	it('renders an email input field', () => {
		const wrapper = shallow(<Login/>);
		expect(wrapper.find("FormControl#email").length).toBe(1);
	});

	it('renders an password input field', () => {
		const wrapper = shallow(<Login/>);
		expect(wrapper.find("FormControl#password").length).toBe(1);
	});

	it('renders an login button', () => {
		const wrapper = shallow(<Login/>);
		expect(wrapper.find("Button#loginBtn").length).toBe(1);
	});
})