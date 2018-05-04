import React from 'react';
import {shallow, mount} from 'enzyme';
import CreateActivity from './CreateActivity';

describe("CreateActivity", () =>{
    let mountedCreateActivity;
    const createActivity =()=>{
        if(!mountedCreateActivity){
            mountedCreateActivity = mount(
                <CreateActivity />
            );
        }
        return mountedCreateActivity;
    }

    it("always rendes a div", ()=>{
        const divs = createActivity().find("div");
        expect(divs.length).toBeGreaterThan(0);
    })

    it("contains everything else that gets rendered", () => {
        const divs = createActivity().find("div");
        const wrappingDiv = divs.first();
        expect(wrappingDiv.children).toEqual(createActivity().children);
    });
});