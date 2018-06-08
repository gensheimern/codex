const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const TestTools = require('./TestTools');
const TestError = require('./TestError');

chai.use(chaiAsPromised);
const { expect } = chai;
const ParticipatesController = require('../routes/activity/participatesController');
const ParticipatesModel = require('../models/participatesModel');
const ActivityModel = require('../models/ActivityModel');
const NotificationModel = require('../models/NotificationModel');
const UserModel = require('../models/UserModel');

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
			mockModels.push(TestTools.mockModel(ActivityModel, 'isHost', null, false));
			mockModels.push(TestTools.mockModel(ActivityModel, 'isPrivate', null, false));
			mockModels.push(TestTools.mockModel(ParticipatesModel, 'isParticipant', null, false));
			mockModels.push(TestTools.mockModel(ActivityModel, 'isFull', null, false));
			mockModels.push(TestTools.mockModel(ParticipatesModel, 'addParticipant', null, TestTools.dbInsertSuccess));
			mockModels.push(TestTools.mockModel(ActivityModel, 'getActivityById', null, {
				Activityname: 'Test name',
			}));
			mockModels.push(TestTools.mockModel(NotificationModel, 'addNotification', null, null));
			mockModels.push(TestTools.mockModel(NotificationModel, 'notifyEvent', null, null));
			mockModels.push(TestTools.mockModel(UserModel, 'getUserById', null, { Firstname: '', Name: '' }));

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				params: {
					activityId: 8,
					userId: 5,
				},
			});

			// Call test method
			await ParticipatesController.addParticipation(req, res);

			// Validate result
			correctResponseType(res, 201);
			expect(res.body().message, 'Message set').to.be.a('string');
		});

		it('should add a participation to private activity if user is host', async () => {
			// Mock user model
			mockModels.push(TestTools.mockModel(ActivityModel, 'isHost', null, true));
			mockModels.push(TestTools.mockModel(ActivityModel, 'isPrivate', null, true));
			mockModels.push(TestTools.mockModel(ParticipatesModel, 'isParticipant', null, false));
			mockModels.push(TestTools.mockModel(ActivityModel, 'isFull', null, false));
			mockModels.push(TestTools.mockModel(ParticipatesModel, 'addParticipant', null, TestTools.dbInsertSuccess));
			mockModels.push(TestTools.mockModel(ActivityModel, 'getActivityById', null, {
				Activityname: 'Test name',
			}));
			mockModels.push(TestTools.mockModel(NotificationModel, 'addNotification', null, null));
			mockModels.push(TestTools.mockModel(NotificationModel, 'notifyEvent', null, null));
			mockModels.push(TestTools.mockModel(UserModel, 'getUserById', null, { Firstname: '', Name: '' }));

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				params: {
					activityId: 8,
					userId: 5,
				},
			});

			// Call test method
			await ParticipatesController.addParticipation(req, res);

			// Validate result
			correctResponseType(res, 201);
			expect(res.body().message, 'Message set').to.be.a('string');
		});

		it('should add a participation if no user id is specified', async () => {
			// Mock user model
			mockModels.push(TestTools.mockModel(ActivityModel, 'isHost', null, false));
			mockModels.push(TestTools.mockModel(ActivityModel, 'isPrivate', null, false));
			mockModels.push(TestTools.mockModel(ParticipatesModel, 'isParticipant', null, false));
			mockModels.push(TestTools.mockModel(ActivityModel, 'isFull', null, false));
			mockModels.push(TestTools.mockModel(ParticipatesModel, 'addParticipant', null, TestTools.dbInsertSuccess));
			mockModels.push(TestTools.mockModel(ActivityModel, 'getActivityById', null, {
				Activityname: 'Test name',
			}));
			mockModels.push(TestTools.mockModel(NotificationModel, 'addNotification', null, null));
			mockModels.push(TestTools.mockModel(NotificationModel, 'notifyEvent', null, null));
			mockModels.push(TestTools.mockModel(UserModel, 'getUserById', null, { Firstname: '', Name: '' }));

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				params: {
					activityId: 8,
				},
			});

			// Call test method
			await ParticipatesController.addParticipation(req, res);

			// Validate result
			correctResponseType(res, 201);
			expect(res.body().message, 'Message set').to.be.a('string');
		});

		it('should send message if already participating', async () => {
			// Mock user model
			mockModels.push(TestTools.mockModel(ActivityModel, 'isHost', null, false));
			mockModels.push(TestTools.mockModel(ActivityModel, 'isPrivate', null, false));
			mockModels.push(TestTools.mockModel(ParticipatesModel, 'isParticipant', null, true));
			mockModels.push(TestTools.mockModel(ActivityModel, 'isFull', null, false));
			mockModels.push(TestTools.mockNotCalled(ParticipatesModel, 'addParticipant'));
			mockModels.push(TestTools.mockModel(ActivityModel, 'getActivityById', null, {
				Activityname: 'Test name',
			}));
			mockModels.push(TestTools.mockModel(NotificationModel, 'addNotification', null, null));
			mockModels.push(TestTools.mockModel(NotificationModel, 'notifyEvent', null, null));
			mockModels.push(TestTools.mockModel(UserModel, 'getUserById', null, { Firstname: '', Name: '' }));

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				params: {
					activityId: 8,
					userId: 5,
				},
			});

			// Call test method
			await ParticipatesController.addParticipation(req, res);

			// Validate result
			correctResponseType(res, 200);
			expect(res.body().message, 'Message set').to.be.a('string');
		});

		it('should send error if activity is private and user is not host', async () => {
			// Mock user model
			mockModels.push(TestTools.mockModel(ActivityModel, 'isHost', null, false));
			mockModels.push(TestTools.mockModel(ActivityModel, 'isPrivate', null, true));
			mockModels.push(TestTools.mockModel(ParticipatesModel, 'isParticipant', null, false));
			mockModels.push(TestTools.mockModel(ActivityModel, 'isFull', null, false));
			mockModels.push(TestTools.mockNotCalled(ParticipatesModel, 'addParticipant', null, TestTools.dbInsertSuccess));
			mockModels.push(TestTools.mockModel(ActivityModel, 'getActivityById', null, {
				Activityname: 'Test name',
			}));
			mockModels.push(TestTools.mockModel(NotificationModel, 'addNotification', null, null));
			mockModels.push(TestTools.mockModel(NotificationModel, 'notifyEvent', null, null));
			mockModels.push(TestTools.mockModel(UserModel, 'getUserById', null, { Firstname: '', Name: '' }));

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				params: {
					activityId: 8,
					userId: 5,
				},
			});

			// Call test method
			await ParticipatesController.addParticipation(req, res);

			// Validate result
			correctResponseType(res, 403);
			expect(res.body().message, 'Message set').to.be.a('string');
		});

		it('should send error if user is not participant or host', async () => {
			// Mock user model
			mockModels.push(TestTools.mockModel(ActivityModel, 'isHost', null, false));
			mockModels.push(TestTools.mockModel(ActivityModel, 'isPrivate', null, false));
			mockModels.push(TestTools.mockModel(ParticipatesModel, 'isParticipant', null, false));
			mockModels.push(TestTools.mockModel(ActivityModel, 'isFull', null, false));
			mockModels.push(TestTools.mockNotCalled(ParticipatesModel, 'addParticipant', null, TestTools.dbInsertSuccess));
			mockModels.push(TestTools.mockModel(ActivityModel, 'getActivityById', null, {
				Activityname: 'Test name',
			}));
			mockModels.push(TestTools.mockModel(NotificationModel, 'addNotification', null, null));
			mockModels.push(TestTools.mockModel(NotificationModel, 'notifyEvent', null, null));
			mockModels.push(TestTools.mockModel(UserModel, 'getUserById', null, { Firstname: '', Name: '' }));

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				params: {
					activityId: 8,
					userId: 6,
				},
			});

			// Call test method
			await ParticipatesController.addParticipation(req, res);

			// Validate result
			correctResponseType(res, 403);
			expect(res.body().message, 'Message set').to.be.a('string');
		});

		it('should send error if activity is full', async () => {
			// Mock user model
			mockModels.push(TestTools.mockModel(ActivityModel, 'isHost', null, false));
			mockModels.push(TestTools.mockModel(ActivityModel, 'isPrivate', null, false));
			mockModels.push(TestTools.mockModel(ParticipatesModel, 'isParticipant', null, false));
			mockModels.push(TestTools.mockModel(ActivityModel, 'isFull', null, true));
			mockModels.push(TestTools.mockNotCalled(ParticipatesModel, 'addParticipant'));
			mockModels.push(TestTools.mockModel(ActivityModel, 'getActivityById', null, {
				Activityname: 'Test name',
			}));
			mockModels.push(TestTools.mockModel(NotificationModel, 'addNotification', null, null));
			mockModels.push(TestTools.mockModel(NotificationModel, 'notifyEvent', null, null));
			mockModels.push(TestTools.mockModel(UserModel, 'getUserById', null, { Firstname: '', Name: '' }));

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				params: {
					activityId: 8,
					userId: 5,
				},
			});

			// Call test method
			await ParticipatesController.addParticipation(req, res);

			// Validate result
			correctResponseType(res, 409);
			expect(res.body().message, 'Message set').to.be.a('string');
		});

		it('should send error if participating is not possible', async () => {
			// Mock user model
			mockModels.push(TestTools.mockModel(ActivityModel, 'isHost', null, false));
			mockModels.push(TestTools.mockModel(ActivityModel, 'isPrivate', null, false));
			mockModels.push(TestTools.mockModel(ParticipatesModel, 'isParticipant', null, false));
			mockModels.push(TestTools.mockModel(ActivityModel, 'isFull', null, false));
			mockModels.push(TestTools.mockModel(ParticipatesModel, 'addParticipant', null, TestTools.dbInsertFailed));
			mockModels.push(TestTools.mockModel(ActivityModel, 'getActivityById', null, {
				Activityname: 'Test name',
			}));
			mockModels.push(TestTools.mockModel(NotificationModel, 'addNotification', null, null));
			mockModels.push(TestTools.mockModel(NotificationModel, 'notifyEvent', null, null));
			mockModels.push(TestTools.mockModel(UserModel, 'getUserById', null, { Firstname: '', Name: '' }));

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				params: {
					activityId: 8,
					userId: 5,
				},
			});

			// Call test method
			await ParticipatesController.addParticipation(req, res);

			// Validate result
			correctResponseType(res, 400);
			expect(res.body().message, 'Message set').to.be.a('string');
		});

		it('should send error if database not available', async () => {
			// Mock user model
			mockModels.push(TestTools.mockModel(ActivityModel, 'isHost', new TestError('Test error'), null));
			mockModels.push(TestTools.mockModel(ActivityModel, 'isPrivate', new TestError('Test error'), null));
			mockModels.push(TestTools.mockModel(ParticipatesModel, 'isParticipant', new TestError('Test error'), null));
			mockModels.push(TestTools.mockModel(ActivityModel, 'isFull', new TestError('Test error'), null));
			mockModels.push(TestTools.mockModel(ParticipatesModel, 'addParticipant', new TestError('Test error'), null));
			mockModels.push(TestTools.mockModel(ActivityModel, 'getActivityById', new TestError('Test error'), null));
			mockModels.push(TestTools.mockModel(NotificationModel, 'addNotification', new TestError('Test error'), null));
			mockModels.push(TestTools.mockModel(NotificationModel, 'notifyEvent', new TestError('Test error'), null));
			mockModels.push(TestTools.mockModel(UserModel, 'getUserById', new TestError('Test error'), null));

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				params: {
					activityId: 8,
					userId: 5,
				},
			});

			// Call test method
			const result = ParticipatesController.addParticipation(req, res);

			// Validate result
			expect(result, 'Correct error thrown').to.eventually.be.rejectedWith(TestError);
		});
	});

	describe('delete a participation', () => {
		it('should delete a participation of user', async () => {
			// Mock user model
			mockModels.push(TestTools.mockModel(ActivityModel, 'isHost', null, false));
			mockModels.push(TestTools.mockModel(ParticipatesModel, 'deleteParticipant', null, TestTools.dbDeleteSuccess));
			mockModels.push(TestTools.mockModel(ActivityModel, 'getActivityById', null, {
				Activityname: 'Test name',
			}));
			mockModels.push(TestTools.mockModel(NotificationModel, 'notifyEvent', null, null));
			mockModels.push(TestTools.mockModel(UserModel, 'getUserById', null, { Firstname: '', Name: '' }));

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				params: {
					activityId: 8,
				},
			});

			// Call test method
			await ParticipatesController.deleteParticipation(req, res);

			// Validate result
			correctResponseType(res, 200);
			expect(res.body().message, 'Message set').to.be.a('string');
		});

		it('should delete a participation of other user if host', async () => {
			// Mock user model
			mockModels.push(TestTools.mockModel(ActivityModel, 'isHost', null, true));
			mockModels.push(TestTools.mockModel(ParticipatesModel, 'deleteParticipant', null, TestTools.dbDeleteSuccess));
			mockModels.push(TestTools.mockModel(ActivityModel, 'getActivityById', null, {
				Activityname: 'Test name',
			}));
			mockModels.push(TestTools.mockModel(NotificationModel, 'notifyEvent', null, null));
			mockModels.push(TestTools.mockModel(UserModel, 'getUserById', null, { Firstname: '', Name: '' }));

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				params: {
					activityId: 8,
					userId: 6,
				},
			});

			// Call test method
			await ParticipatesController.deleteParticipation(req, res);

			// Validate result
			correctResponseType(res, 200);
			expect(res.body().message, 'Message set').to.be.a('string');
		});

		it('should send error if user has no permission', async () => {
			// Mock user model
			mockModels.push(TestTools.mockModel(ActivityModel, 'isHost', null, false));
			mockModels.push(TestTools.mockModel(ParticipatesModel, 'deleteParticipant', null, TestTools.dbDeleteSuccess));
			mockModels.push(TestTools.mockModel(ActivityModel, 'getActivityById', null, {
				Activityname: 'Test name',
			}));
			mockModels.push(TestTools.mockModel(NotificationModel, 'notifyEvent', null, null));
			mockModels.push(TestTools.mockModel(UserModel, 'getUserById', null, { Firstname: '', Name: '' }));

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				params: {
					activityId: 8,
					userId: 6,
				},
			});

			// Call test method
			await ParticipatesController.deleteParticipation(req, res);

			// Validate result
			correctResponseType(res, 403);
			expect(res.body().message, 'Message set').to.be.a('string');
		});

		it('should send error if no participation found', async () => {
			// Mock user model
			mockModels.push(TestTools.mockModel(ActivityModel, 'isHost', null, true));
			mockModels.push(TestTools.mockModel(ParticipatesModel, 'deleteParticipant', null, TestTools.dbDeleteFailed));
			mockModels.push(TestTools.mockModel(ActivityModel, 'getActivityById', null, {
				Activityname: 'Test name',
			}));
			mockModels.push(TestTools.mockModel(NotificationModel, 'notifyEvent', null, null));
			mockModels.push(TestTools.mockModel(UserModel, 'getUserById', null, { Firstname: '', Name: '' }));

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				params: {
					activityId: 8,
					userId: 5,
				},
			});

			// Call test method
			await ParticipatesController.deleteParticipation(req, res);

			// Validate result
			correctResponseType(res, 404);
			expect(res.body().message, 'Message set').to.be.a('string');
		});
	});
});
