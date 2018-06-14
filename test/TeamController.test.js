const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const TestTools = require('./TestTools');
const TestError = require('./TestError');

chai.use(chaiAsPromised);
const { expect } = chai;
const teamController = require('../routes/team/TeamController');
const teamModel = require('../models/TeamModel');
const memberModel = require('../models/MemberModel');
const NotificationModel = require('../models/NotificationModel');

function correctResponseType(res, status) {
	expect(res._isEndCalled(), 'End called').to.be.true;
	expect(res._getStatusCode(), 'Right status code').to.equal(status);
	expect(res._isJSON(), 'JSON response').to.be.true;
	expect(res._isUTF8(), 'UTF-8 encoding').to.be.true;
}


describe('Team controller', () => {
	let mockModels;

	beforeEach(() => {
		mockModels = [];
	});

	afterEach(() => {
		mockModels.forEach(mockModel => mockModel.restore());
		mockModels = [];
	});


	describe('GET all teams', () => {
		it('should send all teams the user is member of', async () => {
			// Mock user model
			mockModels.push(TestTools.mockModel(teamModel, 'getAllTeams', null, [
				{
					Team_Id: 1,
					Teamname: 'Test1',
					description:"Test description 1",
					icon:"Icon1.jpg",
					Firstname: 'Max',
					Name: 'Mustermann',
					Email: 'valid@email.com',
					Password: '1234',
					Image: '/image.png',
				},
				{
					Team_Id: 2,
					Teamname: 'Test2',
					description:"Test description 2",
					icon:"Icon2.jpg",
					Firstname: 'Nico',
					Name: 'Mustermann',
					Email: 'valid2@email.com',
					Password: '5678',
					Image: '/image2.png',
				},
			]));

			// Mock http request and response
			const { req, res } = TestTools.mockRequest();

			// Call test method
			await teamController.getAllTeams(req, res);

			// Validate result
			correctResponseType(res, 200);
			expect(res.body(), 'Correct respnse body').to.deep.equal([
				{
					id: 1,
					name: 'Test1',
					description:"Test description 1",
					icon:"Icon1.jpg",
					manager: {
						firstName: 'Max',
						name: 'Mustermann',
						email: 'valid@email.com',
						image: '/image.png',
						me: false,
					},
				},
				{
					id: 2,
					name: 'Test2',
					description:"Test description 2",
					icon:"Icon2.jpg",
					manager: {
						firstName: 'Nico',
						name: 'Mustermann',
						email: 'valid2@email.com',
						image: '/image2.png',
						me: false,
					},
				},
			]);
		});

		it('should send 500 if there is a database error', async () => {
			// Mock user model
			mockModels.push(TestTools.mockModel(teamModel, 'getAllTeams', new TestError('Test error'), null));

			// Mock http request and response
			const { req, res } = TestTools.mockRequest();

			// Call test method
			const result = teamController.getAllTeams(req, res);

			// Validate result
			expect(result, 'Correct error thrown.').to.eventually.be.rejectedWith(TestError);
		});
	});

	describe('GET one team by id', () => {
		it('should send the data of one team if the user is a member', async () => {
			// Mock user model
			mockModels.push(TestTools.mockModel(teamModel, 'getTeamById', null, {
				Team_Id: 5,
				Teamname: 'Test1',
				description:"Test description 1",
				icon:"Icon1.jpg",
				Firstname: 'Max',
				Name: 'Mustermann',
				Email: 'valid@email.com',
				Password: '1234',
				Image: '/image.png',
			}));
			mockModels.push(TestTools.mockModel(memberModel, 'isMember', null, true));

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				params: {
					teamId: 5,
				},
			});

			// Call test method
			await teamController.getTeamById(req, res);

			// Validate result
			correctResponseType(res, 200);
			expect(res.body(), 'Correct response body').to.deep.equal({
				id: 5,
				name: 'Test1',
				description:"Test description 1",
				icon:"Icon1.jpg",
				manager: {
					firstName: 'Max',
					name: 'Mustermann',
					email: 'valid@email.com',
					image: '/image.png',
					me: false,
				},
			});
		});

		it('should not send the data of one team the user is no member of', async () => {
			// Mock user model
			mockModels.push(TestTools.mockModel(teamModel, 'getTeamById', null, null));
			mockModels.push(TestTools.mockModel(memberModel, 'isMember', null, false));

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				params: {
					teamId: 5,
				},
			});

			// Call test method
			await teamController.getTeamById(req, res);

			// Validate result
			correctResponseType(res, 404);
			expect(res.body().message).to.be.a('string');
		});

		it('should send 500 if there is a database error', async () => {
			// Mock user model
			mockModels.push(TestTools.mockModel(teamModel, 'getTeamById', new TestError('Test error'), null));
			mockModels.push(TestTools.mockModel(memberModel, 'isMember', new TestError('Test error'), null));

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				params: {
					teamId: 5,
				},
			});

			// Call test method
			const result = teamController.getTeamById(req, res);

			// Validate result
			expect(result, 'Correct error thrown.').to.eventually.be.rejectedWith(TestError);
		});
	});

	describe('POST new team', () => {
		it('should create a new team', async () => {
			// Mock user model
			mockModels.push(TestTools.mockModel(teamModel, 'addTeam', null, TestTools.dbInsertSuccess));
			mockModels.push(TestTools.mockModel(memberModel, 'addMember', null, TestTools.dbInsertSuccess));

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				body: {
					name: 'Test Team',
					description:"Test description 1",
					icon:"Icon1.jpg",
				},
			});

			// Call test method
			await teamController.addTeam(req, res);

			// Validate result
			correctResponseType(res, 201);
			expect(res.body().teamId).to.equal(10);
		});

		it('should send 400 if no name is passed', async () => {
			// Mock user model
			mockModels.push(TestTools.mockNotCalled(teamModel, 'addTeam'));
			mockModels.push(TestTools.mockNotCalled(memberModel, 'addMember'));

			// Mock http request and response
			const { req, res } = TestTools.mockRequest();

			// Call test method
			await teamController.addTeam(req, res);

			// Validate result
			correctResponseType(res, 400);
			expect(res.body().message).to.be.a('string');
		});

		it('should send 500 if there is a database error', async () => {
			// Mock user model
			mockModels.push(TestTools.mockModel(teamModel, 'addTeam', new TestError('Test error'), null));
			mockModels.push(TestTools.mockModel(memberModel, 'addMember', new TestError('Test error'), null));

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				body: {
					name: 'Test Team',
					description:"Test description 1",
					icon:"Icon1.jpg",
				},
			});

			// Call test method
			const result = teamController.addTeam(req, res);

			// Validate result
			expect(result, 'Correct error thrown.').to.eventually.be.rejectedWith(TestError);
		});
	});

	describe('PUT update team', () => {
		it('should update a team if the user is the admin of the team.', async () => {
			// Mock user model
			mockModels.push(TestTools.mockModel(teamModel, 'updateTeam', null, TestTools.dbUpdateSuccess));
			mockModels.push(TestTools.mockModel(NotificationModel, 'notifyTeam', null, null));

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				params: {
					teamId: '8',
				},
				body: {
					name: 'Test Team',
					description:"Test description 1",
					icon:"Icon1.jpg",
				},
			});

			// Call test method
			await teamController.updateTeam(req, res);

			// Validate result
			correctResponseType(res, 200);
			expect(res.body().success).to.be.true;
			expect(res.body().message).to.be.a('string');
		});

		it('should not update a team if the user is not the admin of the team.', async () => {
			// Mock user model
			mockModels.push(TestTools.mockModel(teamModel, 'updateTeam', null, TestTools.dbUpdateFailed));
			mockModels.push(TestTools.mockModel(NotificationModel, 'notifyTeam', null, null));

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				body: {
					name: 'Test Team',
					description:"Test description 1",
					icon:"Icon1.jpg",
				},
			});

			// Call test method
			await teamController.updateTeam(req, res);

			// Validate result
			correctResponseType(res, 404);
			expect(res.body().success).to.be.false;
			expect(res.body().message).to.be.a('string');
		});

		it('should send 400 if no name is passed.', async () => {
			// Mock user model
			mockModels.push(TestTools.mockNotCalled(teamModel, 'updateTeam'));
			mockModels.push(TestTools.mockModel(NotificationModel, 'notifyTeam', null, null));

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				params: {
					teamId: '8',
				},
			});

			// Call test method
			await teamController.updateTeam(req, res);

			// Validate result
			correctResponseType(res, 400);
			expect(res.body().message).to.be.a('string');
		});

		it('should send 500 if there is a database error.', async () => {
			// Mock user model
			mockModels.push(TestTools.mockModel(teamModel, 'updateTeam', new TestError('Test error'), null));
			mockModels.push(TestTools.mockModel(NotificationModel, 'notifyTeam', new TestError('Test error'), null));

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				params: {
					teamId: '8',
				},
				body: {
					name: 'Test Team',
					description:"Test description 1",
					icon:"Icon1.jpg",
				},
			});

			// Call test method
			const result = teamController.updateTeam(req, res);

			// Validate result
			expect(result, 'Correct error thrown.').to.eventually.be.rejectedWith(TestError);
		});
	});

	describe('DELETE team', () => {
		it('should delete a team if the user is the admin of the team.', async () => {
			// Mock user model
			mockModels.push(TestTools.mockModel(teamModel, 'deleteTeam', null, TestTools.dbDeleteSuccess));

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				params: {
					teamId: '8',
				},
			});

			// Call test method
			await teamController.deleteTeam(req, res);

			// Validate result
			correctResponseType(res, 200);
			expect(res.body().success, 'Correct success state').to.be.true;
			expect(res.body().message, 'Message property').to.be.a('string');
		});

		it('should not delete a team if the user is not the admin of the team.', async () => {
			// Mock user model
			mockModels.push(TestTools.mockModel(teamModel, 'deleteTeam', null, TestTools.dbDeleteFailed));

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				params: {
					teamId: '8',
				},
			});

			// Call test method
			await teamController.deleteTeam(req, res);

			// Validate result
			correctResponseType(res, 404);
			expect(res.body().success, 'Correct success state').to.be.false;
			expect(res.body().message, 'Message property').to.be.a('string');
		});

		it('should send 500 if there is a database error.', async () => {
			// Mock user model
			mockModels.push(TestTools.mockModel(teamModel, 'deleteTeam', new TestError('Test error'), null));

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				params: {
					teamId: '8',
					description:"Test description 1",
					icon:"Icon1.jpg",
				},
			});

			// Call test method
			const result = teamController.deleteTeam(req, res);

			// Validate result
			expect(result, 'Correct error thrown.').to.eventually.be.rejectedWith(TestError);
		});
	});
});
