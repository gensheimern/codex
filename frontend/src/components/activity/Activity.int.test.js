import React from 'react';
import {shallow, mount} from 'enzyme';
import Activity from './Activity';

describe("Activity", () => {
    let mountedActivity;
    const activity = () => {
        if(!mountedActivity){
            mountedActivity = mount(
                <Activity />
            );
        }
        return mountedActivity;
    };
    
    it("always renders a div", () => {
        const divs = activity().find("div");
        expect(divs.length).toBeGreaterThan(0);
    });

    it("contains everything else that gets rendered", () =>{
        const divs = activity().find("div");
        const wrappingDiv = divs.first();
        expect(wrappingDiv.children()).toEqual(activity().children);
    });

    it("always renders a 'ActivityItem'", ()=>{
        expect(activity().find(ActivityItem).length).toBe(1);
    });

    it("ActivityItems does receive props", () =>{
        const activityItem = activity().find("ActivityItem");
        expect(Object.keys(activityItem.props())).toContain("key");
        expect(Object.keys(activityItem.props())).toContain("activity");
    });
});
