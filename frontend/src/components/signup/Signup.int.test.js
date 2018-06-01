import React from 'react';
import {shallow, mount} from 'enzyme';
import Signup from './Signup';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

describe("Signup", () => {
    let mountedSignup;
    const signup = () => {
        if(!mountedSignup){
            mountedSignup = mount(
                <MuiThemeProvider>
                    <Signup />
                </MuiThemeProvider>
            );
        }
        return mountedSignup;
    };
    
    it("always renders a div", () => {
        const divs = signup().find("div");
        expect(divs.length).toBeGreaterThan(0);
    });

    it("contains everything else that gets rendered", () => {
        const divs = signup().find("div");
        const wrappingDiv = divs.first();
        expect(wrappingDiv.children).toEqual(signup().children);
    });
});