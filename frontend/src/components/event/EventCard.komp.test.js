import React from 'react';
import { shallow } from 'enzyme';
import EventCard from './EventCard';

describe('EventCard', () => {
	let shallowEventCard;
	const eventCard = () => {
		if (!shallowEventCard) {
			shallowEventCard = shallow(<EventCard event = {{
					id: 5, description: "",
					name: "", place: "", 
					time: new Date('12.12.2018'),
					event: true,
					private: true,
					banner:"",
					maxParticipants:5,
					host: {
						id:5,
						firstName: "",
						name: "",
						email: "",
						img: "",
					}
				}} 
				messages = {[
				   { 
					id: 6,
					time: new Date('12.12.2018'),
					content: "",
					author:{
						id:7,
						firstName: "",
						name: "",
						email: "",
						img: "",
					}
				}]}/>
			);
		}
		return shallowEventCard;
	};

	describe('EventCard Component', () =>{

		it('should render without throwing an error', () =>{
			expect(eventCard().exists(<form className = 'EventCard'></form>)).toBe(true)
		});

		it ('should render one <button/> component', () =>{
			const wrapper = eventCard();
			expect(wrapper.find("button.joinBtn").length).toBe(1);     
		});
	});
});