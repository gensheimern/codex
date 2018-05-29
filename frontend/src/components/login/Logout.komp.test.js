import React from 'react';
import Logout from './Logout';
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';

describe('Logout Component',() =>{
    it('should render without throwing an error', () =>{
        expect(shallow(<Logout />).exists(<form className = 'static-modal'></form>)).toBe(true)
    });
    
    it ('should render one <Button/> component', () =>{
        const wrapper = shallow(<Logout />);
        expect(wrapper.find("Button").length).toBe(1);
        
     });

});
