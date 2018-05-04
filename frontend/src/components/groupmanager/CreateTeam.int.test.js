import React from 'react';
import {shallow, mount} from 'enzyme';
import CreateTeam from './CreateTeam';

describe("CreateTeam", () => {
    let mountedCreateTeam;
    const createTeam = () => {
        if(!mountedCreateTeam){
            mountedCreateTeam = mount(
                <CreateTeam />
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
    
    it("should always fail", () =>{
        const thing = false;
        //do some fancy calculations
        //...
        //I don't know what thing is...
       //console.log("What is the thing?",thing);
        expect(thing).toBeFalsy();
    });
});