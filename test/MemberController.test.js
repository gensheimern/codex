const chai = require('chai');
const TestTools = require('./TestTools');

const { expect } = chai;
const memberController = require('../routes/memberController');
const memberModel = require('../models/MemberModel');
const TeamModel = require('../models/TeamModel');

describe('Member controller', () => {
	describe('GET all member of a team', () => {
		it('should send all members of a team', async () => {
			// Mock user model
			const mockModel = TestTools.mockModel(memberModel, 'getMemberOfTeam', null, [{
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
			const mockModel2 = TestTools.mockModel(memberModel, 'isMember', null, true);

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				method: 'GET',
				baseUrl: '/team/5/member',
				params: {
					teamId: 5,
				},
			});

			// Call test method
			await memberController.getMemberOfTeam(req, res);

			// Restore mock
			mockModel.restore();
			mockModel2.restore();

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

		it('should not send members if the user is no member of the team', async () => {
			// Mock user model
			const mockModel = TestTools.mockModel(memberModel, 'getMemberOfTeam', null, [{
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
			const mockModel2 = TestTools.mockModel(memberModel, 'isMember', null, false);

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				method: 'GET',
				baseUrl: '/team/5/member',
				params: {
					teamId: 5,
				},
			});

			// Call test method
			await memberController.getMemberOfTeam(req, res);

			// Restore mock
			mockModel.restore();
			mockModel2.restore();

			expect(res._isEndCalled(), 'End called').to.be.true;
			expect(res._getStatusCode(), 'Right status code').to.equal(404);
			expect(res._isJSON(), 'JSON response').to.be.true;
			expect(res._isUTF8(), 'UTF-8 encoding').to.be.true;
			expect(JSON.parse(res._getData()).message, 'Correct respnse body').to.equal('Invalid team id.');
		});
	});

	describe('POST a new member', () => {
		it('should post a new member', async () => {
			// Mock user model
			const mockModel = TestTools.mockModel(memberModel, 'addMember', null, TestTools.dbInsertSuccess);
			const mockModel2 = TestTools.mockModel(TeamModel, 'isTeammanager', null, true);

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				method: 'POST',
				baseUrl: '/team/6/member/7',
				params: {
					teamId: 6,
					memberId: 7,
				},
			});

			// Call test method
			await memberController.addMember(req, res);

			// Restore mock
			mockModel.restore();
			mockModel2.restore();

			expect(res._isEndCalled(), 'End called').to.be.true;
			expect(res._getStatusCode(), 'Right status code').to.equal(201);
			expect(res._isJSON(), 'JSON response').to.be.true;
			expect(res._isUTF8(), 'UTF-8 encoding').to.be.true;
			expect(JSON.parse(res._getData()).message, 'Correct respnse body').to.equal('Member added to team.');
		});

		it('should not add a new member when user is not teammanager', async () => {
			// Mock user model
			const mockModel = TestTools.mockModel(memberModel, 'addMember', null, TestTools.dbInsertSuccess);
			const mockModel2 = TestTools.mockModel(TeamModel, 'isTeammanager', null, false);

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				method: 'POST',
				baseUrl: '/team/6/member/7',
				params: {
					teamId: 6,
					memberId: 7,
				},
			});

			// Call test method
			await memberController.addMember(req, res);

			// Restore mock
			mockModel.restore();
			mockModel2.restore();

			expect(res._isEndCalled(), 'End called').to.be.true;
			expect(res._getStatusCode(), 'Right status code').to.equal(403);
			expect(res._isJSON(), 'JSON response').to.be.true;
			expect(res._isUTF8(), 'UTF-8 encoding').to.be.true;
			expect(JSON.parse(res._getData()).message, 'Correct respnse body').to.equal('Only the creator of a group can add members.');
		});
	});
});
