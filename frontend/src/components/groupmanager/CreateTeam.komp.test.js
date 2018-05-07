import React from 'react';
import { shallow } from 'enzyme';
import CreateTeam from './CreateTeam';
import Button from 'react-bootstrap/lib/Button';
import sinon from 'sinon';
import renderer from 'react-test-renderer';

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
/*
     //Muss anders geschrieben werden ....ist noch falsch 
     it('simulates click events', () => {
       const groupErstellenButtonClick = sinon.spy();
       const wrapper = shallow(<Button groupErstelleButtonClick={groupErstelleButtonClick}/>);
       wrapper.find('button').simulate('click');
       expect(groupErstellenButtonClick.calledOnce).toEqual(true);
     });*/

});