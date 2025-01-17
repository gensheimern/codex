const transforms = require('../routes/transforms');
const chai = require('chai');

const { expect } = chai;

describe('Transformation of database output', () => {
	it('should transform user data', () => {
		const dbUser = {
			User_Id: 1,
			Firstname: 'Max',
			Name: 'Mustermann',
			Email: 'valid@email.de',
			Password: 'Password123',
			Image: '/path.png',
			Test: 'Test value',
		};

		const result = transforms().transformUser(dbUser);

		expect(result).to.deep.equal({
			id: 1,
			firstName: 'Max',
			name: 'Mustermann',
			email: 'valid@email.de',
			image: '/path.png',
			me: false,
		});
	});

	it('should transform team data', () => {
		const dbTeam = {
			Team_Id: 2,
			Teamname: 'Test Team',
			Description: 'Test Description 1',
			Group_Icon: 'Icon1.jpg',
			User_Id: 1,
			Firstname: 'Max',
			Name: 'Mustermann',
			Email: 'valid@email.de',
			Password: 'Password123',
			Image: '/path.png',
			Test: 'Test value',
		};

		const result = transforms().transformTeam(dbTeam);

		expect(result).to.deep.equal({
			id: 2,
			name: 'Test Team',
			description: 'Test Description 1',
			icon: 'Icon1.jpg',
			manager: {
				id: 1,
				firstName: 'Max',
				name: 'Mustermann',
				email: 'valid@email.de',
				image: '/path.png',
				me: false,
			},
		});
	});

	it('should transform activity data', () => {
		const dbActivity = {
			Activity_Id: 2,
			Description: 'Let\'s eat some lunch.',
			Activityname: 'Lunch',
			Place: 'Mannheim',
			Time: 'Test Time',
			Eventtag: 1,
			Private: 0,
			Banner: '/banner.png',
			MaxParticipants: 12,
			User_Id: 1,
			Firstname: 'Max',
			Name: 'Mustermann',
			Email: 'valid@email.de',
			Password: 'Password123',
			Image: '/path.png',
			Test: 'Test value',
		};

		const result = transforms().transformActivity(dbActivity);

		expect(result).to.deep.equal({
			id: 2,
			description: 'Let\'s eat some lunch.',
			name: 'Lunch',
			place: 'Mannheim',
			time: 'Test Time',
			event: true,
			private: false,
			banner: '/banner.png',
			maxParticipants: 12,
			host: {
				id: 1,
				firstName: 'Max',
				name: 'Mustermann',
				email: 'valid@email.de',
				image: '/path.png',
				me: false,
			},
		});
	});
});
