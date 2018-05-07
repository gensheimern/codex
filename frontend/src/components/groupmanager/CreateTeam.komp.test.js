import React from 'react';
import { mount, render, shallow, configure} from 'enzyme';
import CreateTeam , {componentDidUpdate, validateForm, inputName, handleChange, handleClick}from './CreateTeam';
import Adapter from 'enzyme-adapter-react-16';
import Button from 'react-bootstrap/lib/Button';
import sinon from 'sinon';
import renderer from 'react-test-renderer';

//configure({ adapter: new Adapter()});

global.mount = mount;
global.render = render;
global.shallow = shallow;

describe('<CreateTeam>', () =>{

    it('renders without crashing', () => {
		shallow(<CreateTeam/>);
    });
    
    it ('should render one <Button/> component', () =>{
        const wrapper = shallow(<CreateTeam/>);
        expect(wrapper.find("Button").length).toBe(1);
        
     });

     it ('should render two <FormGroup/> component', () =>{
        const wrapper = shallow(<CreateTeam/>);
        expect(wrapper.find("FormGroup").length).toBe(2);
        
     });

 
     it('simulates click-event  the counter', () =>{
       const wrapper = shallow(<CreateTeam />);
       wrapper.setState({name: "1"});
       wrapper.find('form').at(0).simulate('click');

       expect(wrapper.state().name).toEqual("1");
     });


});