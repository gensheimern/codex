const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const TestTools = require('./TestTools');
const TestError = require('./TestError');

chai.use(chaiAsPromised);
const { expect } = chai;
const AuthenticateController = require('../routes/auth/AuthenticateController');
const userModel = require('../models/UserModel');

function correctResponseType(res, status) {
	expect(res._isEndCalled(), 'End called').to.be.true;
	expect(res._getStatusCode(), 'Right status code').to.equal(status);
	expect(res._isJSON(), 'JSON response').to.be.true;
	expect(res._isUTF8(), 'UTF-8 encoding').to.be.true;
}

describe('Authenticate controller', () => {
	let mockModels;

	beforeEach(() => {
		mockModels = [];
	});

	afterEach(() => {
		mockModels.forEach(mockModel => mockModel.restore());
		mockModels = [];
	});

	it('should authenticate user', async () => {
		// Mock user model
		mockModels.push(TestTools.mockModel(
			userModel, 'getUserByEmail', null,
			{
				Password: '$2b$10$llp4elJLBIwLcFYXLDmxL.X8vke9IGafSfJ.LQ5hS7Uci4gmOqHC.',
			},
		));

		// Mock http request and response
		const { req, res } = TestTools.mockRequest({
			body: {
				email: 'test@email.com',
				password: 'very_secure_password',
			},
		});

		// Call test method
		await AuthenticateController.authenticate(req, res);

		// Validate result
		correctResponseType(res, 200);
		expect(res.body().success, 'Correct success status').to.be.true;
		expect(res.body().message, 'Message set').to.be.a('string');
		expect(res.body().token, 'Token received').to.be.a('string');
	});

	// FIXME: Test wieder benutzen
	/* it('should not authenticate user with plain text password', async () => {
		// Mock user model
		mockModels.push(TestTools.mockModel(
			userModel, 'getUserByEmail', null,
			{
				Password: 'very_secure_password',
			},
		));

		// Mock http request and response
		const { req, res } = TestTools.mockRequest({
			body: {
				email: 'test@email.com',
				password: 'very_secure_password',
			},
		});

		// Call test method
		await AuthenticateController.authenticate(req, res);

		// Validate result
		correctResponseType(res, 403);
		expect(res.body().success, 'Correct success status').to.be.false;
		expect(res.body().message, 'Message set').to.be.a('string');
		expect(res.body().token, 'Token received').to.be.undefined;
	}); */

	it('should not authenticate invalid user', async () => {
		// Mock user model
		mockModels.push(TestTools.mockModel(
			userModel, 'getUserByEmail', null,
			{
				Password: 'very_secure_password',
			},
		));

		// Mock http request and response
		const { req, res } = TestTools.mockRequest({
			body: {
				email: 'test@email.com',
				password: 'very_wrong_password',
			},
		});

		// Call test method
		await AuthenticateController.authenticate(req, res);

		// Validate result
		correctResponseType(res, 403);
		expect(res.body().success, 'Correct success status').to.be.false;
		expect(res.body().message, 'Message set').to.be.a('string');
		expect(res.body().token, 'Token received').to.be.undefined;
	});
});
