const chai = require('chai');
const TestTools = require('./TestTools');

const { expect } = chai;
const teamController = require('../routes/TeamController');
const teamModel = require('../models/TeamModel');
const memberModel = require('../models/MemberModel');

describe('Team controller', () => {
	describe('GET all teams', () => {
		it('should send all teams the user is member of', async () => {
			// Mock user model
			const mockModel = TestTools.mockModel(teamModel, 'getAllTeams', null, [
				{
					Team_Id: 1,
					Teamname: 'Test1',
					Firstname: 'Max',
					Name: 'Mustermann',
					Email: 'valid@email.com',
					Password: '1234',
					Image: '/image.png',
				},
				{
					Team_Id: 2,
					Teamname: 'Test2',
					Firstname: 'Nico',
					Name: 'Mustermann',
					Email: 'valid2@email.com',
					Password: '5678',
					Image: '/image2.png',
				},
			]);

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				method: 'GET',
				baseUrl: '/team',
			});

			// Call test method
			await teamController.getAllTeams(req, res);

			// Restore mock
			mockModel.restore();

			expect(res._isEndCalled(), 'End called').to.be.true;
			expect(res._getStatusCode(), 'Right status code').to.equal(200);
			expect(res._isJSON(), 'JSON response').to.be.true;
			expect(res._isUTF8(), 'UTF-8 encoding').to.be.true;
			expect(JSON.parse(res._getData()), 'Correct respnse body').to.deep.equal([
				{
					id: 1,
					name: 'Test1',
					manager: {
						firstName: 'Max',
						name: 'Mustermann',
						email: 'valid@email.com',
						image: '/image.png',
					},
				},
				{
					id: 2,
					name: 'Test2',
					manager: {
						firstName: 'Nico',
						name: 'Mustermann',
						email: 'valid2@email.com',
						image: '/image2.png',
					},
				},
			]);
		});

		it('should send 500 if there is a database error', async () => {
			// Mock user model
			const mockModel = TestTools.mockModel(teamModel, 'getAllTeams', new Error('Test error'), null);

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				method: 'GET',
				baseUrl: '/team',
			});

			// Call test method
			await teamController.getAllTeams(req, res);

			// Restore mock
			mockModel.restore();

			expect(res._isEndCalled(), 'End called').to.be.true;
			expect(res._getStatusCode(), 'Right status code').to.equal(500);
		});
	});

	/* describe('GET one team by id', () => {
		it('should send the data of one team if the user is a member', async () => {
			// Mock user model
			const mockModel = TestTools.mockModel(teamModel, 'getTeamById', null, [{
				Team_Id: 5,
				Teamname: 'Test1',
				Firstname: 'Max',
				Name: 'Mustermann',
				Email: 'valid@email.com',
				Image: '/image.png',
			}]);

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				method: 'GET',
				baseUrl: '/team',
				params: {
					teamId: 5,
				},
			});

			// Call test method
			await teamController.getTeamById(req, res);

			// Restore mock
			mockModel.restore();

			expect(res._isEndCalled(), 'End called').to.be.true;
			expect(res._getStatusCode(), 'Right status code').to.equal(200);
			expect(res._isJSON(), 'JSON response').to.be.true;
			expect(res._isUTF8(), 'UTF-8 encoding').to.be.true;
			expect(JSON.parse(res._getData()), 'Correct respnse body').to.deep.equal({
				id: 5,
				name: 'Test1',
				manager: {
					firstName: 'Max',
					name: 'Mustermann',
					email: 'valid@email.com',
					image: '/image.png',
				},
			});
		});
	}); */

	describe('GET one team by id', () => {
		it('should send the data of one team if the user is a member', async () => {
			// Mock user model
			const mockModel = TestTools.mockModel(teamModel, 'getTeamById', null, {
				Team_Id: 5,
				Teamname: 'Test1',
				Firstname: 'Max',
				Name: 'Mustermann',
				Email: 'valid@email.com',
				Password: '1234',
				Image: '/image.png',
			});
			const mockModel2 = TestTools.mockModel(memberModel, 'isMember', null, true);

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				method: 'GET',
				baseUrl: '/team',
				params: {
					teamId: 5,
				},
			});

			// Call test method
			await teamController.getTeamById(req, res);

			// Restore mock
			mockModel.restore();
			mockModel2.restore();

			expect(res._isEndCalled(), 'End called').to.be.true;
			expect(res._getStatusCode(), 'Right status code').to.equal(200);
			expect(res._isJSON(), 'JSON response').to.be.true;
			expect(res._isUTF8(), 'UTF-8 encoding').to.be.true;
			expect(JSON.parse(res._getData()), 'Correct respnse body').to.deep.equal({
				id: 5,
				name: 'Test1',
				manager: {
					firstName: 'Max',
					name: 'Mustermann',
					email: 'valid@email.com',
					image: '/image.png',
				},
			});
		});

		it('should not send the data of one team the user is no member of', async () => {
			// Mock user model
			const mockModel = TestTools.mockModel(teamModel, 'getTeamById', null, null);
			const mockModel2 = TestTools.mockModel(memberModel, 'isMember', null, false);

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				method: 'GET',
				baseUrl: '/team',
				params: {
					teamId: 5,
				},
			});

			// Call test method
			await teamController.getTeamById(req, res);

			// Restore mock
			mockModel.restore();
			mockModel2.restore();

			expect(res._isEndCalled(), 'End called').to.be.true;
			expect(res._getStatusCode(), 'Right status code').to.equal(404);
			expect(res._isJSON(), 'JSON response').to.be.true;
			expect(res._isUTF8(), 'UTF-8 encoding').to.be.true;
			expect(JSON.parse(res._getData()).message).to.be.a('string');
		});

		it('should send 500 if there is a database error', async () => {
			// Mock user model
			const mockModel = TestTools.mockModel(teamModel, 'getTeamById', new Error('Test error'), null);
			const mockModel2 = TestTools.mockNotCalled(memberModel, 'isMember');

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				method: 'GET',
				baseUrl: '/team',
				params: {
					teamId: 5,
				},
			});

			// Call test method
			await teamController.getTeamById(req, res);

			// Restore mock
			mockModel.restore();
			mockModel2.restore();

			expect(res._isEndCalled(), 'End called').to.be.true;
			expect(res._getStatusCode(), 'Right status code').to.equal(500);
		});
	});

	describe('POST new team', () => {
		it('should create a new team', async () => {
			// Mock user model
			const mockTeamModel = TestTools.mockModel(teamModel, 'addTeam', null, TestTools.dbInsertSuccess);
			const mockMemberModel = TestTools.mockModel(memberModel, 'addMember', null, TestTools.dbInsertSuccess);

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				method: 'POST',
				baseUrl: '/team',
				body: {
					name: 'Test Team',
				},
			});

			// Call test method
			await teamController.addTeam(req, res);

			// Restore mock
			mockTeamModel.restore();
			mockMemberModel.restore();

			expect(res._isEndCalled(), 'End called').to.be.true;
			expect(res._getStatusCode(), 'Right status code').to.equal(201);
			expect(res._isJSON(), 'JSON response').to.be.true;
			expect(res._isUTF8(), 'UTF-8 encoding').to.be.true;
			expect(JSON.parse(res._getData()).teamId).to.equal(10);
		});

		it('should send 400 if no name is passed', async () => {
			// Mock user model
			const mockTeamModel = TestTools.mockNotCalled(teamModel, 'addTeam');
			const mockMemberModel = TestTools.mockNotCalled(memberModel, 'addMember');

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				method: 'POST',
				baseUrl: '/team',
			});

			// Call test method
			await teamController.addTeam(req, res);

			// Restore mock
			mockTeamModel.restore();
			mockMemberModel.restore();

			expect(res._isEndCalled(), 'End called').to.be.true;
			expect(res._getStatusCode(), 'Right status code').to.equal(400);
			expect(res._isJSON(), 'JSON response').to.be.true;
			expect(res._isUTF8(), 'UTF-8 encoding').to.be.true;
			expect(JSON.parse(res._getData()).message).to.be.a('string');
		});

		it('should send 500 if there is a database error', async () => {
			// Mock user model
			const mockTeamModel = TestTools.mockModel(teamModel, 'addTeam', new Error('Test error'), null);
			const mockMemberModel = TestTools.mockModel(memberModel, 'addMember', new Error('Test error'), null);

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				method: 'POST',
				baseUrl: '/team',
				body: {
					name: 'Test Team',
				},
			});

			// Call test method
			await teamController.addTeam(req, res);

			// Restore mock
			mockTeamModel.restore();
			mockMemberModel.restore();

			expect(res._isEndCalled(), 'End called').to.be.true;
			expect(res._getStatusCode(), 'Right status code').to.equal(500);
		});
	});

	describe('PUT update team', () => {
		it('should update a team if the user is the admin of the team.', async () => {
			// Mock user model
			const mockTeamModel = TestTools.mockModel(teamModel, 'updateTeam', null, TestTools.dbUpdateSuccess);

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				method: 'PUT',
				baseUrl: '/team',
				params: {
					teamId: '8',
				},
				body: {
					name: 'Test Team',
				},
			});

			// Call test method
			await teamController.updateTeam(req, res);

			// Restore mock
			mockTeamModel.restore();

			expect(res._isEndCalled(), 'End called').to.be.true;
			expect(res._getStatusCode(), 'Right status code').to.equal(200);
			expect(res._isJSON(), 'JSON response').to.be.true;
			expect(res._isUTF8(), 'UTF-8 encoding').to.be.true;
			expect(JSON.parse(res._getData()).success).to.be.true;
			expect(JSON.parse(res._getData()).message).to.be.a('string');
		});

		it('should not update a team if the user is not the admin of the team.', async () => {
			// Mock user model
			const mockTeamModel = TestTools.mockModel(teamModel, 'updateTeam', null, TestTools.dbUpdateFailed);

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				method: 'PUT',
				baseUrl: '/team',
				body: {
					name: 'Test Team',
				},
			});

			// Call test method
			await teamController.updateTeam(req, res);

			// Restore mock
			mockTeamModel.restore();

			expect(res._isEndCalled(), 'End called').to.be.true;
			expect(res._getStatusCode(), 'Right status code').to.equal(404);
			expect(res._isJSON(), 'JSON response').to.be.true;
			expect(res._isUTF8(), 'UTF-8 encoding').to.be.true;
			expect(JSON.parse(res._getData()).success).to.be.false;
			expect(JSON.parse(res._getData()).message).to.be.a('string');
		});

		it('should send 400 if no name is passed.', async () => {
			// Mock user model
			const mockTeamModel = TestTools.mockNotCalled(teamModel, 'updateTeam');

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				method: 'PUT',
				baseUrl: '/team',
				params: {
					teamId: '8',
				},
			});

			// Call test method
			await teamController.updateTeam(req, res);

			// Restore mock
			mockTeamModel.restore();

			expect(res._isEndCalled(), 'End called').to.be.true;
			expect(res._getStatusCode(), 'Right status code').to.equal(400);
			expect(res._isJSON(), 'JSON response').to.be.true;
			expect(res._isUTF8(), 'UTF-8 encoding').to.be.true;
			expect(JSON.parse(res._getData()).message).to.be.a('string');
		});

		it('should send 500 if there is a database error.', async () => {
			// Mock user model
			const mockTeamModel = TestTools.mockModel(teamModel, 'updateTeam', new Error('Test error'), null);

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				method: 'PUT',
				baseUrl: '/team',
				params: {
					teamId: '8',
				},
				body: {
					name: 'Test Team',
				},
			});

			// Call test method
			await teamController.updateTeam(req, res);

			// Restore mock
			mockTeamModel.restore();

			expect(res._isEndCalled(), 'End called').to.be.true;
			expect(res._getStatusCode(), 'Right status code').to.equal(500);
		});
	});

	describe('DELETE team', () => {
		it('should delete a team if the user is the admin of the team.', async () => {
			// Mock user model
			const mockTeamModel = TestTools.mockModel(teamModel, 'deleteTeam', null, TestTools.dbDeleteSuccess);

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				method: 'DELETE',
				baseUrl: '/team',
				params: {
					teamId: '8',
				},
			});

			// Call test method
			await teamController.deleteTeam(req, res);

			// Restore mock
			mockTeamModel.restore();

			expect(res._isEndCalled(), 'End called').to.be.true;
			expect(res._getStatusCode(), 'Right status code').to.equal(200);
			expect(res._isJSON(), 'JSON response').to.be.true;
			expect(res._isUTF8(), 'UTF-8 encoding').to.be.true;
			expect(JSON.parse(res._getData()).success, 'Correct success state').to.be.true;
			expect(JSON.parse(res._getData()).message, 'Message property').to.be.a('string');
		});

		it('should not delete a team if the user is not the admin of the team.', async () => {
			// Mock user model
			const mockTeamModel = TestTools.mockModel(teamModel, 'deleteTeam', null, TestTools.dbDeleteFailed);

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				method: 'DELETE',
				baseUrl: '/team',
				params: {
					teamId: '8',
				},
			});

			// Call test method
			await teamController.deleteTeam(req, res);

			// Restore mock
			mockTeamModel.restore();

			expect(res._isEndCalled(), 'End called').to.be.true;
			expect(res._getStatusCode(), 'Right status code').to.equal(404);
			expect(res._isJSON(), 'JSON response').to.be.true;
			expect(res._isUTF8(), 'UTF-8 encoding').to.be.true;
			expect(JSON.parse(res._getData()).success, 'Correct success state').to.be.false;
			expect(JSON.parse(res._getData()).message, 'Message property').to.be.a('string');
		});

		it('should send 500 if there is a database error.', async () => {
			// Mock user model
			const mockTeamModel = TestTools.mockModel(teamModel, 'deleteTeam', new Error('Test error'), null);

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				method: 'DELETE',
				baseUrl: '/team',
				params: {
					teamId: '8',
				},
			});

			// Call test method
			await teamController.deleteTeam(req, res);

			// Restore mock
			mockTeamModel.restore();

			expect(res._isEndCalled(), 'End called').to.be.true;
			expect(res._getStatusCode(), 'Right status code').to.equal(500);
		});
	});
});
