import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';
import config from '../../config';
const fetchMock = require('fetch-mock');

configure({
	adapter: new Adapter()
});

 window.localStorage = {getItem: () => ""};
	fetchMock.get(config.apiPath +'/activity/5/message', 
    	[ { id: 6,
        	time: new Date('12.12.2018'),
        	content: "",
        	author:{
            	id:7,
            	firstName: "",
            	name: "",
            	email: "",
            	image: "",
        	}
    	}]);
    fetchMock.get( config.apiPath +'/user/me',{
            id:7,
            firstName: "Max",
            name: "Mustermann",
            email: "max.mustermann@gmail.com",
            image: "",
        
	});
	fetchMock.get(config.apiPath +'/activity',{
        	id:8,
			description: "",
			name: "",
			place: "",
			time: new Date('01.06.2018'),
			event: true,
			private: true,
			banner: "",
			maxParticipants: "",
			host: {
				id:7,
            	firstName: "Max",
            	name: "Mustermann",
            	email: "max.mustermann@gmail.com",
            	image: "",
            	me: true,
			},
   	 });
  




// Add global test initialization here...hat nicht so funktioniert wie gewollt,deshalb momentan in jeder komponente für sich einzeln