const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const TestTools = require('./TestTools');

const userController = require('../routes/UserController');
const userModel = require('../models/UserModel');
const encryptPassword = require('../routes/auth/CryptPassword');

describe('User controller', () => {
	describe('GET all users', () => {
		it('should send the data of all users', () => {
			// Mock user model
			let mockModel = TestTools.mockModel(userModel, 'getAllUser', null,
			[{
				User_Id: 1,
				Firstname: "Max",
				Name: "Mustermann",
				Email: "valid@email.com",
				Password: "very_secure_password"
			},{
				User_Id: 2,
				Firstname: "Max2",
				Name: "Mustermann2",
				Email: "valid2@email.com",
				Password: "very_secure_password2"
			}]);

			// Mock http request and response
			let req = TestTools.mockRequest({
				method: 'GET',
				baseUrl: '/user'
			});
			let res = TestTools.mockResponse();

			// Call test method
			userController.getAllUsers(req, res);

			// Check result with expected values
			userModel.getAllUser.restore();

			expect(res._isEndCalled(), 'End called').to.be.true;
			expect(res._getStatusCode(), 'Right status code').to.equal(200);
			expect(res._isJSON(), 'JSON response').to.be.true;
			expect(res._isUTF8(), 'UTF-8 encoding').to.be.true;
			expect(JSON.parse(res._getData()), 'Correct response body').to.deep.equal([{
				User_Id: 1,
				Firstname: "Max",
				Name: "Mustermann",
				Email: "valid@email.com"
			},{
				User_Id: 2,
				Firstname: "Max2",
				Name: "Mustermann2",
				Email: "valid2@email.com"
			}]);
		});
	});

	describe('GET one user by id', () => {
		it('should send the data of one users when the id is valid', () => {
			// Mock user model
			let mockModel = TestTools.mockModel(userModel, 'getUserById', null, [{
				User_Id: 5,
				Firstname: "Max",
				Name: "Mustermann",
				Email: "valid@email.com",
				Password: "very_secure_password"
			}]);

			// Mock http request and response
			let req = TestTools.mockRequest({
				method: 'GET',
				baseUrl: '/user',
				params: {
					id: '5'
				}
			});
			let res = TestTools.mockResponse();

			// Call test method
			userController.getUserById(req, res);

			// Check result with expected values
			mockModel.restore();

			expect(res._isEndCalled(), 'End called').to.be.true;
			expect(res._getStatusCode(), 'Right status code').to.equal(200);
			expect(res._isJSON(), 'JSON response').to.be.true;
			expect(res._isUTF8(), 'UTF-8 encoding').to.be.true;
			expect(JSON.parse(res._getData()), 'Correct response body').to.deep.equal({
				User_Id: 5,
				Firstname: "Max",
				Name: "Mustermann",
				Email: "valid@email.com"
			});
		});

		it('should send "not found" when the id is invalid', () => {
			// Mock model
			let mockModel = TestTools.mockModel(userModel, 'getUserById', null, []);

			// Mock http request and response
			let req = TestTools.mockRequest({
				method: 'GET',
				baseUrl: '/user',
				params: {
					id: '5'
				}
			});
			let res = TestTools.mockResponse();

			// Call test method
			userController.getUserById(req, res);

			// Check result with expected values
			mockModel.restore();

			expect(res._isEndCalled(), 'End called').to.be.true;
			expect(res._getStatusCode(), 'Right status code').to.equal(404);
			expect(res._isJSON(), 'JSON response').to.be.true;
			expect(res._isUTF8(), 'UTF-8 encoding').to.be.true;
			expect(JSON.parse(res._getData()), 'Correct response body').to.deep.equal({
				message: "Invalid user id."
			});
		});

		it('should send "not found" when no id is passed', () => {
			let mockModel = TestTools.mockModel(userModel, 'getUserById', null, []);

			// Mock http request and response
			let req = TestTools.mockRequest({
				method: 'GET',
				baseUrl: '/user',
				params: {}
			});
			let res = TestTools.mockResponse();

			// Call test method
			userController.getUserById(req, res);

			// Check result with expected values
			mockModel.restore();

			expect(res._isEndCalled(), 'End called').to.be.true;
			expect(res._getStatusCode(), 'Right status code').to.equal(404);
			expect(res._isJSON(), 'JSON response').to.be.true;
			expect(res._isUTF8(), 'UTF-8 encoding').to.be.true;
			expect(JSON.parse(res._getData()), 'Correct response body').to.deep.equal({
				message: "Invalid user id."
			});
		});
	});

	describe('POST a new user', () => {
		it('should create a new user', () => {
			let mockModel = TestTools.mockModel(userModel, 'addUser', null, {
				fieldCount: 0,
				affectedRows: 1,
				insertId: 5,
				serverStatus: 2,
				warningCount: 0,
				message: '',
				protocol41: true,
				changedRows: 0
			});

			// Mock http request and response
			let req = TestTools.mockRequest({
				method: 'POST',
				baseUrl: '/user',
				body: {
					Firstname: "Max",
					Name: "Mustermann",
					Email: "valid@email.com",
					Password: "very_secure_password"
				}
			});
			let res = TestTools.mockResponse();

			// Call test method
			userController.addUser(req, res);

			// Check result with expected values
			mockModel.restore();

			expect(res._isEndCalled(), 'End called').to.be.true;
			expect(res._getStatusCode(), 'Right status code').to.equal(201);
			expect(res._isJSON(), 'JSON response').to.be.true;
			expect(res._isUTF8(), 'UTF-8 encoding').to.be.true;
			expect(JSON.parse(res._getData()), 'Correct response body').to.deep.equal({
				User_Id: 5
			});
		});
	});

	describe('PUT update user', () => {
		it('should update an existing user', () => {
			let mockModel = TestTools.mockModel(userModel, 'updateUser', null, {
				fieldCount: 0,
				affectedRows: 1,
				insertId: 5,
				serverStatus: 2,
				warningCount: 0,
				message: '',
				protocol41: true,
				changedRows: 1
			});

			// Mock http request and response
			let req = TestTools.mockRequest({
				method: 'PUT',
				baseUrl: '/user',
				params: {
					id: '5'
				},
				body: {
					Firstname: "Maxneu",
					Name: "Mustermannneu",
					Email: "neue@email.com",
					Password: "very_new_password"
				}
			});
			let res = TestTools.mockResponse();

			// Call test method
			userController.updateUser(req, res);

			// Check result with expected values
			mockModel.restore();

			expect(res._isEndCalled(), 'End called').to.be.true;
			expect(res._getStatusCode(), 'Right status code').to.equal(200);
			expect(res._isJSON(), 'JSON response').to.be.true;
			expect(res._isUTF8(), 'UTF-8 encoding').to.be.true;
			expect(JSON.parse(res._getData()), 'Correct response body').to.deep.equal({
				success: true,
				message: "User updated."
			});
		});
		
		it('should send "Not found" when user id is invalid', () => {
			let mockModel = TestTools.mockModel(userModel, 'updateUser', null, {
				fieldCount: 0,
				affectedRows: 0,
				serverStatus: 2,
				warningCount: 0,
				message: '',
				protocol41: true,
				changedRows: 0
			});

			// Mock http request and response
			let req = TestTools.mockRequest({
				method: 'PUT',
				baseUrl: '/user',
				params: {
					id: '5'
				},
				body: {
					Firstname: "Maxneu",
					Name: "Mustermannneu",
					Email: "neue@email.com",
					Password: "very_new_password"
				}
			});
			let res = TestTools.mockResponse();

			// Call test method
			userController.updateUser(req, res);

			// Check result with expected values
			mockModel.restore();

			expect(res._isEndCalled(), 'End called').to.be.true;
			expect(res._getStatusCode(), 'Right status code').to.equal(404);
			expect(res._isJSON(), 'JSON response').to.be.true;
			expect(res._isUTF8(), 'UTF-8 encoding').to.be.true;
			expect(JSON.parse(res._getData()), 'Correct response body').to.deep.equal({
				success: false,
				message: "Invalid user id."
			});
		});
		
		it('should send "Not found" when no id is passed', () => {
			let mockModel = TestTools.mockModel(userModel, 'updateUser', null, {
				fieldCount: 0,
				affectedRows: 0,
				serverStatus: 2,
				warningCount: 0,
				message: '',
				protocol41: true,
				changedRows: 0
			});

			// Mock http request and response
			let req = TestTools.mockRequest({
				method: 'PUT',
				baseUrl: '/user',
				body: {
					Firstname: "Maxneu",
					Name: "Mustermannneu",
					Email: "neue@email.com",
					Password: "very_new_password"
				}
			});
			let res = TestTools.mockResponse();

			// Call test method
			userController.updateUser(req, res);

			// Check result with expected values
			mockModel.restore();

			expect(res._isEndCalled(), 'End called').to.be.true;
			expect(res._getStatusCode(), 'Right status code').to.equal(404);
			expect(res._isJSON(), 'JSON response').to.be.true;
			expect(res._isUTF8(), 'UTF-8 encoding').to.be.true;
			expect(JSON.parse(res._getData()), 'Correct response body').to.deep.equal({
				success: false,
				message: "Invalid user id."
			});
		});
	});

	describe('DELETE user', () => {
		it('should delete an existing user', () => {
			let mockModel = TestTools.mockModel(userModel, 'deleteUser', null, {
				fieldCount: 0,
				affectedRows: 1,
				insertId: 5,
				serverStatus: 2,
				warningCount: 0,
				message: '',
				protocol41: true,
				changedRows: 1
			});

			// Mock http request and response
			let req = TestTools.mockRequest({
				method: 'DELETE',
				baseUrl: '/user',
				params: {
					id: '5'
				}
			});
			let res = TestTools.mockResponse();

			// Call test method
			userController.deleteUser(req, res);

			// Check result with expected values
			mockModel.restore();

			expect(res._isEndCalled(), 'End called').to.be.true;
			expect(res._getStatusCode(), 'Right status code').to.equal(200);
			expect(res._isJSON(), 'JSON response').to.be.true;
			expect(res._isUTF8(), 'UTF-8 encoding').to.be.true;
			expect(JSON.parse(res._getData()), 'Correct response body').to.deep.equal({
				success: true,
				message: "User deleted."
			});
		});

		it('should send "Not found" when user id is invalid', () => {
			let mockModel = TestTools.mockModel(userModel, 'deleteUser', null, {
				fieldCount: 0,
				affectedRows: 0,
				insertId: 5,
				serverStatus: 2,
				warningCount: 0,
				message: '',
				protocol41: true,
				changedRows: 0
			});

			// Mock http request and response
			let req = TestTools.mockRequest({
				method: 'DELETE',
				baseUrl: '/user',
				params: {
					id: '5'
				}
			});
			let res = TestTools.mockResponse();

			// Call test method
			userController.deleteUser(req, res);

			// Check result with expected values
			mockModel.restore();

			expect(res._isEndCalled(), 'End called').to.be.true;
			expect(res._getStatusCode(), 'Right status code').to.equal(404);
			expect(res._isJSON(), 'JSON response').to.be.true;
			expect(res._isUTF8(), 'UTF-8 encoding').to.be.true;
			expect(JSON.parse(res._getData()), 'Correct response body').to.deep.equal({
				success: false,
				message: "Invalid user id."
			});
		});

		it('should send "Not found" when no id is passed', () => {
			let mockModel = TestTools.mockModel(userModel, 'deleteUser', null, {
				fieldCount: 0,
				affectedRows: 0,
				insertId: 5,
				serverStatus: 2,
				warningCount: 0,
				message: '',
				protocol41: true,
				changedRows: 0
			});

			// Mock http request and response
			let req = TestTools.mockRequest({
				method: 'DELETE',
				baseUrl: '/user'
			});
			let res = TestTools.mockResponse();

			// Call test method
			userController.deleteUser(req, res);

			// Check result with expected values
			mockModel.restore();

			expect(res._isEndCalled(), 'End called').to.be.true;
			expect(res._getStatusCode(), 'Right status code').to.equal(404);
			expect(res._isJSON(), 'JSON response').to.be.true;
			expect(res._isUTF8(), 'UTF-8 encoding').to.be.true;
			expect(JSON.parse(res._getData()), 'Correct response body').to.deep.equal({
				success: false,
				message: "Invalid user id."
			});
		});
	});
});
