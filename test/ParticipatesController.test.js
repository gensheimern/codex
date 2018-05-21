const chai = require('chai');
const TestTools = require('./TestTools');

const { expect } = chai;
const ParticipatesController = require('../routes/participatesController');
const ParticipatesModel = require('../models/participatesModel');
const ActivityModel = require('../models/ActivityModel');

describe('Participates controller', () => {
	describe('GET all participations', () => {
		it('should send all participants of an activity', async () => {
			// Mock user model
			const mockModel = TestTools.mockModel(ParticipatesModel, 'getMemberOfActivity', null, [{
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
			]);
			const mockModel2 = TestTools.mockModel(ActivityModel, 'isPrivate', null, false);
			const mockModel3 = TestTools.mockModel(ParticipatesModel, 'isParticipant', null, false);

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

			// Restore mock
			mockModel.restore();
			mockModel2.restore();
			mockModel3.restore();

			expect(res._isEndCalled(), 'End called').to.be.true;
			expect(res._getStatusCode(), 'Right status code').to.equal(200);
			expect(res._isJSON(), 'JSON response').to.be.true;
			expect(res._isUTF8(), 'UTF-8 encoding').to.be.true;
			expect(JSON.parse(res._getData()), 'Correct respnse body').to.deep.equal([
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
			const mockModel = TestTools.mockModel(ParticipatesModel, 'getMemberOfActivity', null, [{
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
			]);
			const mockModel2 = TestTools.mockModel(ActivityModel, 'isPrivate', null, true);
			const mockModel3 = TestTools.mockModel(ParticipatesModel, 'isParticipant', null, false);

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

			// Restore mock
			mockModel.restore();
			mockModel2.restore();
			mockModel3.restore();

			expect(res._isEndCalled(), 'End called').to.be.true;
			expect(res._getStatusCode(), 'Right status code').to.equal(404);
			expect(res._isJSON(), 'JSON response').to.be.true;
			expect(res._isUTF8(), 'UTF-8 encoding').to.be.true;
			expect(JSON.parse(res._getData()).message, 'Correct respnse body').to.be.a('string');
		});

		it('should send 500 if there is a database error.', async () => {
			// Mock user model
			const mockModel = TestTools.mockNotCalled(ParticipatesModel, 'getMemberOfActivity');
			const mockModel2 = TestTools.mockModel(ActivityModel, 'isPrivate', new Error('Test error'), null);
			const mockModel3 = TestTools.mockNotCalled(ParticipatesModel, 'isParticipant');

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

			// Restore mock
			mockModel.restore();
			mockModel2.restore();
			mockModel3.restore();

			expect(res._isEndCalled(), 'End called').to.be.true;
			expect(res._getStatusCode(), 'Right status code').to.equal(500);
		});
	});

	describe('POST a new participation', () => {
		it('should add a participation if the activity is public', async () => {
			// Mock user model
			const mockModel = TestTools.mockModel(ParticipatesModel, 'getMemberOfActivity', null, [{
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
			]);
			const mockModel2 = TestTools.mockModel(ActivityModel, 'isPrivate', null, false);
			const mockModel3 = TestTools.mockModel(ParticipatesModel, 'isParticipant', null, false);

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

			// Restore mock
			mockModel.restore();
			mockModel2.restore();
			mockModel3.restore();

			expect(res._isEndCalled(), 'End called').to.be.true;
			expect(res._getStatusCode(), 'Right status code').to.equal(200);
			expect(res._isJSON(), 'JSON response').to.be.true;
			expect(res._isUTF8(), 'UTF-8 encoding').to.be.true;
			expect(JSON.parse(res._getData()), 'Correct respnse body').to.deep.equal([
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
