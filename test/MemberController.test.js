const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const TestTools = require('./TestTools');
const TestError = require('./TestError');

chai.use(chaiAsPromised);
const { expect } = chai;
const memberController = require('../routes/team/memberController');
const memberModel = require('../models/MemberModel');
const TeamModel = require('../models/TeamModel');
const NotificationModel = require('../models/NotificationModel');

function correctResponseType(res, status) {
	expect(res._isEndCalled(), 'End called').to.be.true;
	expect(res._getStatusCode(), 'Right status code').to.equal(status);
	expect(res._isJSON(), 'JSON response').to.be.true;
	expect(res._isUTF8(), 'UTF-8 encoding').to.be.true;
}

describe('Member controller', () => {
	let mockModels;

	beforeEach(() => {
		mockModels = [];
	});

	afterEach(() => {
		mockModels.forEach(mockModel => mockModel.restore());
		mockModels = [];
	});


	describe('GET all member of a team', () => {
		it('should send all members of a team', async () => {
			// Mock user model
			mockModels.push(TestTools.mockModel(memberModel, 'getMemberOfTeam', null, [{
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
			mockModels.push(TestTools.mockModel(memberModel, 'isMember', null, true));

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				params: {
					teamId: 5,
				},
			});

			// Call test method
			await memberController.getMemberOfTeam(req, res);

			// Validate result
			correctResponseType(res, 200);
			expect(res.body(), 'Correct respnse body').to.deep.equal([
				{
					id: 1,
					firstName: 'Max',
					name: 'Mustermann',
					email: 'valid@email.com',
					image: '/image.png',
					me: false,
				},
				{
					id: 2,
					firstName: 'Max2',
					name: 'Mustermann2',
					email: 'valid2@email.com',
					image: '/image2.png',
					me: false,
				},
			]);
		});

		it('should not send members if the user is no member of the team', async () => {
			// Mock user model
			mockModels.push(TestTools.mockModel(memberModel, 'getMemberOfTeam', null, [{
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
			mockModels.push(TestTools.mockModel(memberModel, 'isMember', null, false));

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				params: {
					teamId: 5,
				},
			});

			// Call test method
			await memberController.getMemberOfTeam(req, res);

			// Validate result
			correctResponseType(res, 404);
			expect(res.body().message, 'Correct respnse body').to.equal('Invalid team id.');
		});

		it('should send 500 if there is a database error', async () => {
			// Mock user model
			mockModels.push(TestTools.mockModel(memberModel, 'getMemberOfTeam', new TestError('Test error'), null));
			mockModels.push(TestTools.mockModel(memberModel, 'isMember', new TestError('Test error'), null));

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				params: {
					teamId: 5,
				},
			});

			// Call test method
			const result = memberController.getMemberOfTeam(req, res);

			// Validate result
			expect(result, 'Correct error thrown.').to.eventually.be.rejectedWith(TestError);
		});
	});

	describe('POST a new member', () => {
		it('should post a new member', async () => {
			// Mock user model
			mockModels.push(TestTools.mockModel(memberModel, 'addMember', null, TestTools.dbInsertSuccess));
			mockModels.push(TestTools.mockModel(TeamModel, 'isTeammanager', null, true));
			mockModels.push(TestTools.mockModel(TeamModel, 'getTeamById', null, {
				Team_Id: 5,
				Teamname: 'Test1',
				Firstname: 'Max',
				Name: 'Mustermann',
				Email: 'valid@email.com',
				Password: '1234',
				Image: '/image.png',
			}));
			mockModels.push(TestTools.mockModel(NotificationModel, 'addNotification', null, null));

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				params: {
					teamId: 6,
					userId: 7,
				},
			});

			// Call test method
			await memberController.addMember(req, res);

			// Validate result
			correctResponseType(res, 201);
			expect(res.body().message, 'Correct respnse body').to.equal('Member added to team.');
		});

		it('should not add a new member when user is not teammanager', async () => {
			// Mock user model
			mockModels.push(TestTools.mockNotCalled(memberModel, 'addMember'));
			mockModels.push(TestTools.mockModel(TeamModel, 'isTeammanager', null, false));

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				params: {
					teamId: 6,
					userId: 7,
				},
			});

			// Call test method
			await memberController.addMember(req, res);

			// Validate result
			correctResponseType(res, 403);
			expect(res.body().message, 'Correct respnse body').to.equal('Only the creator of a group can add members.');
		});

		it('should send 400 if no member id is specified', async () => {
			// Mock user model
			mockModels.push(TestTools.mockNotCalled(memberModel, 'addMember'));
			mockModels.push(TestTools.mockNotCalled(TeamModel, 'isTeammanager'));

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				params: {
					teamId: 6,
				},
			});

			// Call test method
			await memberController.addMember(req, res);

			// Validate result
			correctResponseType(res, 400);
			expect(res.body().message, 'Correct respnse body').to.equal('Invalid team id or user id.');
		});

		it('should send 500 if there is a database error', async () => {
			// Mock user model
			mockModels.push(TestTools.mockModel(memberModel, 'addMember', new TestError('Test Error'), null));
			mockModels.push(TestTools.mockModel(TeamModel, 'isTeammanager', new TestError('Test Error'), null));

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				params: {
					teamId: 6,
					userId: 7,
				},
			});

			// Call test method
			const result = memberController.addMember(req, res);

			// Validate result
			expect(result, 'Correct error thrown.').to.eventually.be.rejectedWith(TestError);
		});
	});

	describe('DELETE a member', () => {
		it('should delete a member when team manager', async () => {
			// Mock user model
			mockModels.push(TestTools.mockModel(memberModel, 'isMember', null, true));
			mockModels.push(TestTools.mockModel(TeamModel, 'isTeammanager', null, true));
			mockModels.push(TestTools.mockModel(memberModel, 'deleteMember', null, TestTools.dbDeleteSuccess));
			mockModels.push(TestTools.mockModel(TeamModel, 'getTeamById', null, {
				Teamname: 'Test name',
			}));
			mockModels.push(TestTools.mockModel(NotificationModel, 'notifyTeam', null, null));

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				params: {
					teamId: 6,
					userId: 7,
				},
			});

			// Call test method
			await memberController.deleteMember(req, res);

			// Validate result
			correctResponseType(res, 200);
			expect(res.body().success, 'Correct respnse body').to.be.true;
			expect(res.body().message, 'Correct respnse body').to.equal('Member deleted.');
		});

		it('should delete a member', async () => {
			// Mock user model
			mockModels.push(TestTools.mockModel(memberModel, 'isMember', null, true));
			mockModels.push(TestTools.mockModel(TeamModel, 'isTeammanager', null, false));
			mockModels.push(TestTools.mockModel(memberModel, 'deleteMember', null, TestTools.dbDeleteSuccess));
			mockModels.push(TestTools.mockModel(TeamModel, 'getTeamById', null, {
				Teamname: 'Test name',
			}));
			mockModels.push(TestTools.mockModel(NotificationModel, 'notifyTeam', null, null));

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				params: {
					teamId: 6,
					userId: 5,
				},
			});

			// Call test method
			await memberController.deleteMember(req, res);

			// Validate result
			correctResponseType(res, 200);
			expect(res.body().success, 'Correct respnse body').to.be.true;
			expect(res.body().message, 'Correct respnse body').to.equal('Member deleted.');
		});

		it('should return 400 if no member id is specified', async () => {
			// Mock user model
			mockModels.push(TestTools.mockNotCalled(memberModel, 'isMember'));
			mockModels.push(TestTools.mockNotCalled(TeamModel, 'isTeammanager'));
			mockModels.push(TestTools.mockNotCalled(memberModel, 'deleteMember'));
			mockModels.push(TestTools.mockModel(TeamModel, 'getTeamById', null, {
				Teamname: 'Test name',
			}));
			mockModels.push(TestTools.mockModel(NotificationModel, 'notifyTeam', null, null));

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				params: {
					teamId: 6,
				},
			});

			// Call test method
			await memberController.deleteMember(req, res);

			// Validate result
			correctResponseType(res, 400);
			expect(res.body().success, 'Correct respnse body').to.be.false;
			expect(res.body().message, 'Correct respnse body').to.equal('Invalid team or user id.');
		});

		it('should send 500 if there is a database error', async () => {
			// Mock user model
			mockModels.push(TestTools.mockModel(memberModel, 'isMember', new TestError('Test error'), null));
			mockModels.push(TestTools.mockModel(TeamModel, 'isTeammanager', new TestError('Test error'), null));
			mockModels.push(TestTools.mockModel(memberModel, 'deleteMember', new TestError('Test error'), null));
			mockModels.push(TestTools.mockModel(TeamModel, 'getTeamById', null, new TestError('Test error')));
			mockModels.push(TestTools.mockModel(NotificationModel, 'notifyTeam', null, new TestError('Test error')));

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				params: {
					teamId: 6,
					userId: 7,
				},
			});

			// Call test method
			const result = memberController.deleteMember(req, res);

			// Validate result
			expect(result, 'Correct error thrown.').to.eventually.be.rejectedWith(TestError);
		});

		it('should send 403 if the user has no permission', async () => {
			// Mock user model
			mockModels.push(TestTools.mockModel(memberModel, 'isMember', false, null));
			mockModels.push(TestTools.mockModel(TeamModel, 'isTeammanager', false, null));
			mockModels.push(TestTools.mockNotCalled(memberModel, 'deleteMember'));

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				params: {
					teamId: 6,
					userId: 7,
				},
			});

			// Call test method
			await memberController.deleteMember(req, res);

			// Validate result
			correctResponseType(res, 403);
			expect(res.body().success, 'Correct respnse body').to.be.false;
			expect(res.body().message, 'Correct respnse body').to.equal('Invalid team or user id.');
		});

		it('should send 404 if the deletion is not successful', async () => {
			// Mock user model
			mockModels.push(TestTools.mockModel(memberModel, 'isMember', null, true));
			mockModels.push(TestTools.mockModel(TeamModel, 'isTeammanager', null, true));
			mockModels.push(TestTools.mockModel(memberModel, 'deleteMember', null, TestTools.dbDeleteFailed));
			mockModels.push(TestTools.mockModel(TeamModel, 'getTeamById', null, {
				Teamname: 'Test name',
			}));
			mockModels.push(TestTools.mockModel(NotificationModel, 'notifyTeam', null, null));

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				params: {
					teamId: 6,
					userId: 7,
				},
			});

			// Call test method
			await memberController.deleteMember(req, res);

			// Validate result
			correctResponseType(res, 404);
			expect(res.body().success, 'Correct respnse body').to.be.false;
			expect(res.body().message, 'Correct respnse body').to.equal('Invalid team or user id.');
		});
	});
});
