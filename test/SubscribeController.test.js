const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const TestTools = require('./TestTools');
// const TestError = require('./TestError');
const { testData, dbTestData } = require('./testData');

chai.use(chaiAsPromised);
const { expect } = chai;
const SubscribeController = require('../routes/user/SubscribeController');
const subscribeModel = require('../models/SubscribeModel');

function correctResponseType(res, status) {
	expect(res._isEndCalled(), 'End called').to.be.true;
	expect(res._getStatusCode(), 'Right status code').to.equal(status);
	expect(res._isJSON(), 'JSON response').to.be.true;
	expect(res._isUTF8(), 'UTF-8 encoding').to.be.true;
}

// TODO: Check for error thrown if db unavailable
describe('Subscribe controller', () => {
	let mockModels;

	beforeEach(() => {
		mockModels = [];
	});

	afterEach(() => {
		mockModels.forEach(mockModel => mockModel.restore());
		mockModels = [];
	});


	describe('GET all subscribers', () => {
		it('should send the data of all subscribers', async () => {
			// Mock user model
			mockModels.push(TestTools.mockModel(
				subscribeModel, 'getSubscriber', null,
				dbTestData.allUsers,
			));

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				params: {
					userId: 5,
				},
			});

			// Call test method
			await SubscribeController.getSubscriber(req, res);

			// Validate result
			correctResponseType(res, 200);
			expect(res.body(), 'Correct response body').to.deep.equal(testData.allUsers);
		});

		it('should not send subscribers of other user', async () => {
			// Mock user model
			mockModels.push(TestTools.mockNotCalled(subscribeModel, 'getSubscriber'));

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				params: {
					userId: 6,
				},
			});

			// Call test method
			await SubscribeController.getSubscriber(req, res);

			// Validate result
			correctResponseType(res, 403);
			expect(res.body().message, 'Correct response body').to.be.a('string');
		});
	});

	describe('GET all subscribed', () => {
		it('should send the data of all subscribed', async () => {
			// Mock user model
			mockModels.push(TestTools.mockModel(
				subscribeModel, 'getSubscribed', null,
				dbTestData.allUsers,
			));

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				params: {
					userId: 5,
				},
			});

			// Call test method
			await SubscribeController.getSubscribed(req, res);

			// Validate result
			correctResponseType(res, 200);
			expect(res.body(), 'Correct response body').to.deep.equal(testData.allUsers);
		});

		it('should not send subscribed of other user', async () => {
			// Mock user model
			mockModels.push(TestTools.mockNotCalled(subscribeModel, 'getSubscribed'));

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				params: {
					userId: 6,
				},
			});

			// Call test method
			await SubscribeController.getSubscribed(req, res);

			// Validate result
			correctResponseType(res, 403);
			expect(res.body().message, 'Correct response body').to.be.a('string');
		});
	});

	describe('POST a new subscription', () => {
		it('should create a new subscription', async () => {
			// Mock user model
			mockModels.push(TestTools.mockModel(
				subscribeModel, 'addSubscription', null,
				TestTools.dbInsertSuccess,
			));

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				params: {
					userId: 5,
					subscribedId: 6,
				},
			});

			// Call test method
			await SubscribeController.createSubscription(req, res);

			// Validate result
			correctResponseType(res, 201);
			expect(res.body().success, 'Correct response body').to.be.true;
			expect(res.body().message).to.be.a('string');
		});

		it('should not create a new subscription for other user', async () => {
			// Mock user model
			mockModels.push(TestTools.mockModel(
				subscribeModel, 'addSubscription', null,
				TestTools.dbInsertSuccess,
			));

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				params: {
					userId: 6,
					subscribedId: 7,
				},
			});

			// Call test method
			await SubscribeController.createSubscription(req, res);

			// Validate result
			correctResponseType(res, 403);
			expect(res.body().message).to.be.a('string');
		});
	});

	describe('DELETE a subscription', () => {
		it('should delete a subscription', async () => {
			// Mock user model
			mockModels.push(TestTools.mockModel(
				subscribeModel, 'deleteSubscription', null,
				TestTools.dbDeleteSuccess,
			));

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				params: {
					userId: 5,
					subscribedId: 6,
				},
			});

			// Call test method
			await SubscribeController.deleteSubscription(req, res);

			// Validate result
			correctResponseType(res, 200);
			expect(res.body().success, 'Correct response body').to.be.true;
			expect(res.body().message).to.be.a('string');
		});

		it('should not delete a subscription for other user', async () => {
			// Mock user model
			mockModels.push(TestTools.mockNotCalled(subscribeModel, 'deleteSubscription'));

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				params: {
					userId: 6,
					subscribedId: 7,
				},
			});

			// Call test method
			await SubscribeController.deleteSubscription(req, res);

			// Validate result
			correctResponseType(res, 403);
			expect(res.body().success, 'Correct response body').to.be.false;
			expect(res.body().message).to.be.a('string');
		});

		it('should send 404 if subscription does not exist', async () => {
			// Mock user model
			mockModels.push(TestTools.mockModel(
				subscribeModel, 'deleteSubscription', null,
				TestTools.dbDeleteFailed,
			));

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				params: {
					userId: 5,
					subscribedId: 6,
				},
			});

			// Call test method
			await SubscribeController.deleteSubscription(req, res);

			// Validate result
			correctResponseType(res, 404);
			expect(res.body().success, 'Correct response body').to.be.false;
			expect(res.body().message).to.be.a('string');
		});
	});
});
