const chai = require('chai');

const { expect } = chai;
const activityValidation = require('../routes/activity/activityValidation');


describe('Activity validation', () => {
	describe('validate activity', () => {
		it('should accept valid activity', () => {
			const activity = {
				name: 'Grosses Event',
				description: 'Es wird sehr toll!',
				place: 'Mannheim',
				time: '2018-04-20 12:34:18',
				event: true,
				private: true,
				banner: 'image.png',
				maxParticipants: 12,
			};
			const result = activityValidation.validActivity(activity);
			expect(result, 'Correct validation').to.be.true;
		});

		it('should reject no value', () => {
			const result = activityValidation.validActivity();
			expect(result, 'Correct validation').to.be.false;
		});

		it('should reject invalid name', () => {
			const activity = {
				name: '',
				description: 'Es wird sehr toll!',
				place: 'Mannheim',
				time: '2018-04-20 12:34:18',
				event: true,
				private: true,
				banner: 'image.png',
				maxParticipants: 12,
			};
			const result = activityValidation.validActivity(activity);
			expect(result, 'Correct validation').to.be.false;
		});

		it('should reject invalid description', () => {
			const activity = {
				name: 'Grosses Event',
				description: null,
				place: 'Mannheim',
				time: '2018-04-20 12:34:18',
				event: true,
				private: true,
				banner: 'image.png',
				maxParticipants: 12,
			};
			const result = activityValidation.validActivity(activity);
			expect(result, 'Correct validation').to.be.false;
		});

		it('should reject invalid place', () => {
			const activity = {
				name: 'Grosses Event',
				description: 'Es wird sehr toll!',
				place: '',
				time: '2018-04-20 12:34:18',
				event: true,
				private: true,
				banner: 'image.png',
				maxParticipants: 12,
			};
			const result = activityValidation.validActivity(activity);
			expect(result, 'Correct validation').to.be.false;
		});

		it('should reject invalid time', () => {
			const activity = {
				name: 'Grosses Event',
				description: 'Es wird sehr toll!',
				place: 'Mannheim',
				time: 'today',
				event: true,
				private: true,
				banner: 'image.png',
				maxParticipants: 12,
			};
			const result = activityValidation.validActivity(activity);
			expect(result, 'Correct validation').to.be.false;
		});

		it('should reject invalid description', () => {
			const activity = {
				name: 'Grosses Event',
				description: 'Es wird sehr toll!',
				place: 'Mannheim',
				time: '2018-04-20 12:34:18',
				event: null,
				private: true,
				banner: 'image.png',
				maxParticipants: 12,
			};
			const result = activityValidation.validActivity(activity);
			expect(result, 'Correct validation').to.be.false;
		});

		it('should reject invalid description', () => {
			const activity = {
				name: 'Grosses Event',
				description: 'Es wird sehr toll!',
				place: 'Mannheim',
				time: '2018-04-20 12:34:18',
				event: true,
				private: null,
				banner: 'image.png',
				maxParticipants: 12,
			};
			const result = activityValidation.validActivity(activity);
			expect(result, 'Correct validation').to.be.false;
		});

		it('should reject invalid description', () => {
			const activity = {
				name: 'Grosses Event',
				description: 'Es wird sehr toll!',
				place: 'Mannheim',
				time: '2018-04-20 12:34:18',
				event: true,
				private: true,
				banner: null,
				maxParticipants: 12,
			};
			const result = activityValidation.validActivity(activity);
			expect(result, 'Correct validation').to.be.false;
		});

		it('should reject invalid description', () => {
			const activity = {
				name: 'Grosses Event',
				description: 'Es wird sehr toll!',
				place: 'Mannheim',
				time: '2018-04-20 12:34:18',
				event: true,
				private: true,
				banner: 'image.png',
				maxParticipants: 'alle',
			};
			const result = activityValidation.validActivity(activity);
			expect(result, 'Correct validation').to.be.false;
		});
	});

	describe('validate activity name', () => {
		it('should accept valid name', () => {
			const result = activityValidation.validName('Grosses Event');
			expect(result, 'Correct validation').to.be.true;
		});

		it('should reject no value', () => {
			const result = activityValidation.validName();
			expect(result, 'Correct validation').to.be.false;
		});

		it('should reject wrong type', () => {
			const result = activityValidation.validName(123);
			expect(result, 'Correct validation').to.be.false;
		});

		it('should reject too short name', () => {
			const result = activityValidation.validName('');
			expect(result, 'Correct validation').to.be.false;
		});
	});

	describe('validate activity description', () => {
		it('should accept valid description', () => {
			const result = activityValidation.validDescription('Lange Beschreibung.');
			expect(result, 'Correct validation').to.be.true;

			const result2 = activityValidation.validDescription('');
			expect(result2, 'Correct validation').to.be.true;
		});

		it('should reject no value', () => {
			const result = activityValidation.validDescription();
			expect(result, 'Correct validation').to.be.false;
		});

		it('should reject wrong type', () => {
			const result = activityValidation.validDescription(123);
			expect(result, 'Correct validation').to.be.false;
		});
	});

	describe('validate activity place', () => {
		it('should accept valid place', () => {
			const result = activityValidation.validPlace('Mannheim');
			expect(result, 'Correct validation').to.be.true;
		});

		it('should reject no value', () => {
			const result = activityValidation.validPlace();
			expect(result, 'Correct validation').to.be.false;
		});

		it('should reject wrong type', () => {
			const result = activityValidation.validPlace(123);
			expect(result, 'Correct validation').to.be.false;
		});

		it('should reject too short name', () => {
			const result = activityValidation.validPlace('');
			expect(result, 'Correct validation').to.be.false;
		});
	});

	describe('validate activity time', () => {
		it('should accept valid time', () => {
			const result = activityValidation.validTime('2018-04-20 12:34:18');
			expect(result, 'Correct validation').to.be.true;
		});

		it('should reject no value', () => {
			const result = activityValidation.validTime();
			expect(result, 'Correct validation').to.be.false;
		});

		it('should reject wrong type', () => {
			const result = activityValidation.validTime(123);
			expect(result, 'Correct validation').to.be.false;
		});

		it('should reject wrong format', () => {
			const result = activityValidation.validTime('');
			expect(result, 'Correct validation').to.be.false;

			const result2 = activityValidation.validTime('today');
			expect(result2, 'Correct validation').to.be.false;
		});
	});

	describe('validate activity event tag', () => {
		it('should accept valid event tag', () => {
			const result = activityValidation.validEventTag(true);
			expect(result, 'Correct validation').to.be.true;

			const result2 = activityValidation.validEventTag(false);
			expect(result2, 'Correct validation').to.be.true;
		});

		it('should reject no value', () => {
			const result = activityValidation.validEventTag();
			expect(result, 'Correct validation').to.be.false;
		});

		it('should reject wrong type', () => {
			const result = activityValidation.validEventTag(null);
			expect(result, 'Correct validation').to.be.false;
		});
	});

	describe('validate activity private tag', () => {
		it('should accept valid event tag', () => {
			const result = activityValidation.validPrivateTag(true);
			expect(result, 'Correct validation').to.be.true;

			const result2 = activityValidation.validPrivateTag(false);
			expect(result2, 'Correct validation').to.be.true;
		});

		it('should reject no value', () => {
			const result = activityValidation.validPrivateTag();
			expect(result, 'Correct validation').to.be.false;
		});

		it('should reject wrong type', () => {
			const result = activityValidation.validPrivateTag(null);
			expect(result, 'Correct validation').to.be.false;
		});
	});

	describe('validate activity banner', () => {
		it('should accept valid banner', () => {
			const result = activityValidation.validBanner('banner.png');
			expect(result, 'Correct validation').to.be.true;

			const result2 = activityValidation.validBanner('');
			expect(result2, 'Correct validation').to.be.true;
		});

		it('should reject no value', () => {
			const result = activityValidation.validBanner();
			expect(result, 'Correct validation').to.be.false;
		});

		it('should reject wrong type', () => {
			const result = activityValidation.validBanner(123);
			expect(result, 'Correct validation').to.be.false;
		});
	});

	describe('validate activity max participants', () => {
		it('should accept valid max participants', () => {
			const result = activityValidation.validMaxParticipants(12);
			expect(result, 'Correct validation').to.be.true;
		});

		it('should reject no value', () => {
			const result = activityValidation.validMaxParticipants();
			expect(result, 'Correct validation').to.be.false;
		});

		it('should reject wrong type', () => {
			const result = activityValidation.validMaxParticipants('12');
			expect(result, 'Correct validation').to.be.false;
		});

		it('should reject negative numbers', () => {
			const result = activityValidation.validMaxParticipants(-1);
			expect(result, 'Correct validation').to.be.false;
		});
	});
});
