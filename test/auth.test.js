const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const TestTools = require('./TestTools');
const userModel = require('../models/UserModel');

const authController = require('../routes/auth/AuthenticateController');

describe('User authorization', () => {
	it('should grant access with valid credentails', () => {
		let mockModel = TestTools.mockModel(userModel, 'getUserByEmail', null, [{
			User_Id: 5,
			Firstname: "Max",
			Name: "Mustermann",
			Email: "valid@email.com",
			Password: "very_secure_password"
		}]);

		// Mock http request and response
		let req = TestTools.mockRequest({
			method: 'POST',
			baseUrl: '/authenticate',
			body: {
				Email: "valid@email.com",
				Password: "very_secure_password"
			}
		});
		let res = TestTools.mockResponse();

		// Call test method
		authController.authenticate(req, res);

		// Check result with expected values
		mockModel.restore();

		expect(res._isEndCalled(), 'End called').to.be.true;
		expect(res._getStatusCode(), 'Right status code').to.equal(200);
		expect(res._isJSON(), 'JSON response').to.be.true;
		expect(res._isUTF8(), 'UTF-8 encoding').to.be.true;
		expect(JSON.parse(res._getData()).success, 'Correct response success').to.be.true,
		expect(JSON.parse(res._getData()).message, 'Correct response message').to.equal("Valid user credentials.");
		expect(JSON.parse(res._getData()).token, 'Return authorization token').to.not.be.undefined;
	});

	it('should deny access with invalid username', () => {
		let mockModel = TestTools.mockModel(userModel, 'getUserByEmail', null, []);

		// Mock http request and response
		let req = TestTools.mockRequest({
			method: 'POST',
			baseUrl: '/authenticate',
			body: {
				Email: "valid@email.com",
				Password: "very_secure_password"
			}
		});
		let res = TestTools.mockResponse();

		// Call test method
		authController.authenticate(req, res);

		// Check result with expected values
		mockModel.restore();

		expect(res._isEndCalled(), 'End called').to.be.true;
		expect(res._getStatusCode(), 'Right status code').to.equal(403);
		expect(res._isJSON(), 'JSON response').to.be.true;
		expect(res._isUTF8(), 'UTF-8 encoding').to.be.true;
		expect(JSON.parse(res._getData()).success, 'Correct response success').to.be.false,
		expect(JSON.parse(res._getData()).message, 'Correct response message').to.equal("Invalid user credentials.");
		expect(JSON.parse(res._getData()).token, 'Return authorization token').to.be.undefined;
	});

	it('should deny access with invalid username', () => {
		let mockModel = TestTools.mockModel(userModel, 'getUserByEmail', null, [{
			User_Id: 5,
			Firstname: "Max",
			Name: "Mustermann",
			Email: "valid@email.com",
			Password: "very_different_password"
		}]);

		// Mock http request and response
		let req = TestTools.mockRequest({
			method: 'POST',
			baseUrl: '/authenticate',
			body: {
				Email: "valid@email.com",
				Password: "very_secure_password"
			}
		});
		let res = TestTools.mockResponse();

		// Call test method
		authController.authenticate(req, res);

		// Check result with expected values
		mockModel.restore();

		expect(res._isEndCalled(), 'End called').to.be.true;
		expect(res._getStatusCode(), 'Right status code').to.equal(403);
		expect(res._isJSON(), 'JSON response').to.be.true;
		expect(res._isUTF8(), 'UTF-8 encoding').to.be.true;
		expect(JSON.parse(res._getData()).success, 'Correct response success').to.be.false,
		expect(JSON.parse(res._getData()).message, 'Correct response message').to.equal("Invalid user credentials.");
		expect(JSON.parse(res._getData()).token, 'Return authorization token').to.be.undefined;
	});
});