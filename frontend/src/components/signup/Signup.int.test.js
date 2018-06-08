import React from 'react';
import {shallow, mount} from 'enzyme';
import Signup from './Signup';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

describe("Signup", () => {
    let mountedCreateTeam;
    const createTeam = () => {
        if(!mountedCreateTeam){
            mountedCreateTeam = mount(
                <MuiThemeProvider>
                    <Signup />
                </MuiThemeProvider>
            );
        }
        return mountedCreateTeam;
    };
    
    it("always renders a div", () => {
        const divs = createTeam().find("div");
        expect(divs.length).toBeGreaterThan(0);
    });

    it("contains everything else that gets rendered", () => {
        const divs = createTeam().find("div");
        const wrappingDiv = divs.first();
        expect(wrappingDiv.children).toEqual(createTeam().children);
    });
});