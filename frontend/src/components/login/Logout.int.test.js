import React from 'react';
import {shallow, mount} from 'enzyme';
import Logout from './Logout';
import {MemoryRouter} from 'react-router-dom';

describe("Logout", () => {
    let mountedLogout;
    const logout = () => {
        if(!mountedLogout){
            mountedLogout = mount(
                <MemoryRouter><Logout /></MemoryRouter>
            );
        }
        return mountedLogout;
    };
    
    it("always renders a div", () => {
        const divs = logout().find("div");
        expect(divs.length).toBeGreaterThan(0);
    });

    it("contains everything else that gets rendered", () => {
        const divs = logout().find("div");
        const wrappingDiv = divs.first();
        expect(wrappingDiv.children).toEqual(logout().children);
    });

});