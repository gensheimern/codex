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
				},
				{
					Team_Id: 2,
					Teamname: 'Test2',
					Firstname: 'Nico',
					Name: 'Mustermann',
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
					managerFirstName: 'Max',
					managerName: 'Mustermann',
				},
				{
					id: 2,
					name: 'Test2',
					managerFirstName: 'Nico',
					managerName: 'Mustermann',
				},
			]);
		});
	});

	describe('GET one team by id', () => {
		it('should send the data of one team if the user is a member', async () => {
			// Mock user model
			const mockModel = TestTools.mockModel(teamModel, 'getTeamById', null, [{
				Team_Id: 5,
				Teamname: 'Test1',
				Firstname: 'Max',
				Name: 'Mustermann',
			}]);

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				method: 'GET',
				baseUrl: '/team',
				params: {
					id: 5,
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
				managerFirstName: 'Max',
				managerName: 'Mustermann',
			});
		});
	});

	describe('GET one team by id', () => {
		it('should send the data of one team if the user is a member', async () => {
			// Mock user model
			const mockModel = TestTools.mockModel(teamModel, 'getTeamById', null, [{
				Team_Id: 5,
				Teamname: 'Test1',
				Firstname: 'Max',
				Name: 'Mustermann',
			}]);

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				method: 'GET',
				baseUrl: '/team',
				params: {
					id: 5,
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
				managerFirstName: 'Max',
				managerName: 'Mustermann',
			});
		});

		it('should not send the data of one team the user is no member of', async () => {
			// Mock user model
			const mockModel = TestTools.mockModel(teamModel, 'getTeamById', null, []);

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				method: 'GET',
				baseUrl: '/team',
				params: {
					id: 5,
				},
			});

			// Call test method
			await teamController.getTeamById(req, res);

			// Restore mock
			mockModel.restore();

			expect(res._isEndCalled(), 'End called').to.be.true;
			expect(res._getStatusCode(), 'Right status code').to.equal(404);
			expect(res._isJSON(), 'JSON response').to.be.true;
			expect(res._isUTF8(), 'UTF-8 encoding').to.be.true;
			expect(JSON.parse(res._getData()).message).to.be.a('string');
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
					id: '8',
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
			const mockTeamModel = TestTools.mockModel(teamModel, 'updateTeam', null, TestTools.dbUpdateSuccess);

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
			expect(res._getStatusCode(), 'Right status code').to.equal(200);
			expect(res._isJSON(), 'JSON response').to.be.true;
			expect(res._isUTF8(), 'UTF-8 encoding').to.be.true;
			expect(JSON.parse(res._getData()).success).to.be.true;
			expect(JSON.parse(res._getData()).message).to.be.a('string');
		});
	});
});
