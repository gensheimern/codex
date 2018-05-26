const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const TestTools = require('./TestTools');
const TestError = require('./TestError');

chai.use(chaiAsPromised);
const { expect } = chai;
const ParticipatesController = require('../routes/activity/participatesController');
const ParticipatesModel = require('../models/participatesModel');
const ActivityModel = require('../models/ActivityModel');

function correctResponseType(res, status) {
	expect(res._isEndCalled(), 'End called').to.be.true;
	expect(res._getStatusCode(), 'Right status code').to.equal(status);
	expect(res._isJSON(), 'JSON response').to.be.true;
	expect(res._isUTF8(), 'UTF-8 encoding').to.be.true;
}


describe('Participates controller', () => {
	let mockModels;

	beforeEach(() => {
		mockModels = [];
	});

	afterEach(() => {
		mockModels.forEach(mockModel => mockModel.restore());
		mockModels = [];
	});


	describe('GET all participations', () => {
		it('should send all participants of an activity', async () => {
			// Mock user model
			mockModels.push(TestTools.mockModel(ParticipatesModel, 'getMemberOfActivity', null, [{
				User_Id: 1,
				Firstname: 'Max',
				Name: 'Mustermann',
				Email: 'valid@email.com',
				Password: '1234',
				Image: '/image.png',
			},
			{
				User_Id: 2,
				Firstname: 'Max2',
				Name: 'Mustermann2',
				Email: 'valid2@email.com',
				Password: '5678',
				Image: '/image2.png',
			},
			]));
			mockModels.push(TestTools.mockModel(ActivityModel, 'isPrivate', null, false));
			mockModels.push(TestTools.mockModel(ParticipatesModel, 'isParticipant', null, false));

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				method: 'GET',
				baseUrl: '/team/5/member',
				params: {
					teamId: 5,
				},
			});

			// Call test method
			await ParticipatesController.getParticipates(req, res);

			// Validate result
			correctResponseType(res, 200);
			expect(res.body(), 'Correct respnse body').to.deep.equal([
				{
					id: 1,
					firstName: 'Max',
					name: 'Mustermann',
					email: 'valid@email.com',
					image: '/image.png',
				},
				{
					id: 2,
					firstName: 'Max2',
					name: 'Mustermann2',
					email: 'valid2@email.com',
					image: '/image2.png',
				},
			]);
		});

		it('should send 404 if the user is not allowed to see the participants', async () => {
			// Mock user model
			mockModels.push(TestTools.mockModel(ParticipatesModel, 'getMemberOfActivity', null, [{
				User_Id: 1,
				Firstname: 'Max',
				Name: 'Mustermann',
				Email: 'valid@email.com',
				Password: '1234',
				Image: '/image.png',
			},
			{
				User_Id: 2,
				Firstname: 'Max2',
				Name: 'Mustermann2',
				Email: 'valid2@email.com',
				Password: '5678',
				Image: '/image2.png',
			},
			]));
			mockModels.push(TestTools.mockModel(ActivityModel, 'isPrivate', null, true));
			mockModels.push(TestTools.mockModel(ParticipatesModel, 'isParticipant', null, false));

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				method: 'GET',
				baseUrl: '/team/5/member',
				params: {
					teamId: 5,
				},
			});

			// Call test method
			await ParticipatesController.getParticipates(req, res);

			// Validate result
			correctResponseType(res, 404);
			expect(res.body().message, 'Correct respnse body').to.be.a('string');
		});

		it('should send 500 if there is a database error.', async () => {
			// Mock user model
			mockModels.push(TestTools.mockModel(ParticipatesModel, 'getMemberOfActivity', new TestError('Test error'), null));
			mockModels.push(TestTools.mockModel(ActivityModel, 'isPrivate', new TestError('Test error'), null));
			mockModels.push(TestTools.mockModel(ParticipatesModel, 'isParticipant', new TestError('Test error'), null));

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				method: 'GET',
				baseUrl: '/team/5/member',
				params: {
					teamId: 5,
				},
			});

			// Call test method
			const result = ParticipatesController.getParticipates(req, res);

			// Validate result
			expect(result).to.eventually.be.rejectedWith(TestError);
		});
	});

	describe('POST a new participation', () => {
		it('should add a participation if the activity is public', async () => {
			// Mock user model
			mockModels.push(TestTools.mockModel(ParticipatesModel, 'getMemberOfActivity', null, [{
				User_Id: 1,
				Firstname: 'Max',
				Name: 'Mustermann',
				Email: 'valid@email.com',
				Password: '1234',
				Image: '/image.png',
			},
			{
				User_Id: 2,
				Firstname: 'Max2',
				Name: 'Mustermann2',
				Email: 'valid2@email.com',
				Password: '5678',
				Image: '/image2.png',
			},
			]));
			mockModels.push(TestTools.mockModel(ActivityModel, 'isPrivate', null, false));
			mockModels.push(TestTools.mockModel(ParticipatesModel, 'isParticipant', null, false));

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				method: 'GET',
				baseUrl: '/team/5/member',
				params: {
					teamId: 5,
				},
			});

			// Call test method
			await ParticipatesController.getParticipates(req, res);

			// Validate result
			correctResponseType(res, 200);
			expect(res.body(), 'Correct respnse body').to.deep.equal([
				{
					id: 1,
					firstName: 'Max',
					name: 'Mustermann',
					email: 'valid@email.com',
					image: '/image.png',
				},
				{
					id: 2,
					firstName: 'Max2',
					name: 'Mustermann2',
					email: 'valid2@email.com',
					image: '/image2.png',
				},
			]);
		});
	});
});
