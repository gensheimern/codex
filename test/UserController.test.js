const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const TestTools = require('./TestTools');

const userController = require('../routes/UserController');
const userModel = require('../models/UserModel');
const encryptPassword = require('../routes/auth/CryptPassword');

describe('User controller', () => {
	describe('GET all users', () => {
		it('should send the data of all users', async () => {
			// Mock user model
			let mockModel = TestTools.mockModel(userModel, 'getAllUsers', null,
			[{
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

			// Mock http request and response
			let req = TestTools.mockRequest({
				method: 'GET',
				baseUrl: '/user'
			});
			let res = TestTools.mockResponse();

			// Call test method
			await userController.getAllUsers(req, res);

			// Check result with expected values
			userModel.getAllUsers.restore();

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
		it('should send the data of one users when the id is valid', async () => {
			// Mock user model
			let mockModel = TestTools.mockModel(userModel, 'getUserById', null, [{
				User_Id: 5,
				Firstname: "Max",
				Name: "Mustermann",
				Email: "valid@email.com"
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
			await userController.getUserById(req, res);

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

		it('should send "not found" when the id is invalid', async () => {
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
			await userController.getUserById(req, res);

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

		it('should send "not found" when no id is passed', async () => {
			let mockModel = TestTools.mockModel(userModel, 'getUserById', null, []);
			// TODO let mockModel = TestTools.mockNotCalled(userModel, 'getUserById');

			// Mock http request and response
			let req = TestTools.mockRequest({
				method: 'GET',
				baseUrl: '/user',
				params: {}
			});
			let res = TestTools.mockResponse();

			// Call test method
			await userController.getUserById(req, res);

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
		it('should create a new user', async () => {
			let mockModel = TestTools.mockModel(userModel, 'addUser', null, TestTools.dbInsertSuccess);

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
			await userController.addUser(req, res);

			// Check result with expected values
			mockModel.restore();

			expect(res._isEndCalled(), 'End called').to.be.true;
			expect(res._getStatusCode(), 'Right status code').to.equal(201);
			expect(res._isJSON(), 'JSON response').to.be.true;
			expect(res._isUTF8(), 'UTF-8 encoding').to.be.true;
			expect(JSON.parse(res._getData()), 'Correct response body').to.deep.equal({
				User_Id: 10
			});
		});
	});

	describe('PUT update user', () => {
		it('should update an existing user', async () => {
			let mockModel = TestTools.mockModel(userModel, 'updateUser', null, TestTools.dbUpdateSuccess);
			let mockModel2 = TestTools.mockModel(userModel, 'getUserByIdWithPw', null, {
				User_Id: 5,
				Firstname: "Maxneu",
				Name: "Mustermannneu",
				Email: "neue@email.com",
				Password: "very_new_password",
				Image: "/image.png"
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
					Password: "very_new_password",
					Image: "/new_image.png"
				}
			});
			let res = TestTools.mockResponse();

			// Call test method
			await userController.updateUser(req, res);

			// Check result with expected values
			mockModel.restore();

			expect(res._isEndCalled(), 'End called').to.be.true;
			expect(res._getStatusCode(), 'Right status code').to.equal(200);
			expect(res._isJSON(), 'JSON response').to.be.true;
			expect(res._isUTF8(), 'UTF-8 encoding').to.be.true;
			const body = JSON.parse(res._getData());
			expect(body.success, 'Update successful').to.be.true;
			expect(body, 'Correct response body').to.deep.equal({
				success: true,
				message: "User successfully updated."
			});
		});

		it('should not update user data of other user', async () => {
			let mockModel = TestTools.mockNotCalled(userModel, 'updateUser');

			// Mock http request and response
			let req = TestTools.mockRequest({
				method: 'PUT',
				baseUrl: '/user',
				params: {
					id: '6'
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
			await userController.updateUser(req, res);

			// Check result with expected values
			mockModel.restore();

			expect(res._isEndCalled(), 'End called').to.be.true;
			expect(res._getStatusCode(), 'Right status code').to.equal(403);
			expect(res._isJSON(), 'JSON response').to.be.true;
			expect(res._isUTF8(), 'UTF-8 encoding').to.be.true;
			expect(JSON.parse(res._getData()).success, 'Update successful').to.be.false;
			expect(JSON.parse(res._getData()), 'Correct response body').to.deep.equal({
				success: false,
				message: "Invalid user id."
			});
		});
		
		it('should not update user data without id', async () => {
			let mockModel = TestTools.mockNotCalled(userModel, 'updateUser');

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
			await userController.updateUser(req, res);

			// Check result with expected values
			mockModel.restore();

			expect(res._isEndCalled(), 'End called').to.be.true;
			expect(res._getStatusCode(), 'Right status code').to.equal(403);
			expect(res._isJSON(), 'JSON response').to.be.true;
			expect(res._isUTF8(), 'UTF-8 encoding').to.be.true;
			const body = JSON.parse(res._getData());
			expect(body.success, 'Right success status').to.be.false;
			expect(body, 'Correct response body').to.deep.equal({
				success: false,
				message: "Invalid user id."
			});
		});
	});

	describe('DELETE user', () => {
		it('should delete an existing user', async () => {
			let mockModel = TestTools.mockModel(userModel, 'deleteUser', null, TestTools.dbDeleteSuccess);

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
			await userController.deleteUser(req, res);

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

		it('should not delete other user', async () => {
			let mockModel = TestTools.mockNotCalled(userModel, 'deleteUser');

			// Mock http request and response
			let req = TestTools.mockRequest({
				method: 'DELETE',
				baseUrl: '/user',
				params: {
					id: '6'
				}
			});
			let res = TestTools.mockResponse();

			// Call test method
			await userController.deleteUser(req, res);

			// Check result with expected values
			mockModel.restore();

			expect(res._isEndCalled(), 'End called').to.be.true;
			expect(res._getStatusCode(), 'Right status code').to.equal(403);
			expect(res._isJSON(), 'JSON response').to.be.true;
			expect(res._isUTF8(), 'UTF-8 encoding').to.be.true;
			const body = JSON.parse(res._getData());
			expect(body.success, 'Right success status').to.be.false;
			expect(body, 'Correct response body').to.deep.equal({
				success: false,
				message: "Invalid user id."
			});
		});

		it('should send delete user without id', async () => {
			let mockModel = TestTools.mockNotCalled(userModel, 'deleteUser');

			// Mock http request and response
			let req = TestTools.mockRequest({
				method: 'DELETE',
				baseUrl: '/user'
			});
			let res = TestTools.mockResponse();

			// Call test method
			await userController.deleteUser(req, res);

			// Check result with expected values
			mockModel.restore();

			expect(res._isEndCalled(), 'End called').to.be.true;
			expect(res._getStatusCode(), 'Right status code').to.equal(403);
			expect(res._isJSON(), 'JSON response').to.be.true;
			expect(res._isUTF8(), 'UTF-8 encoding').to.be.true;
			expect(JSON.parse(res._getData()), 'Correct response body').to.deep.equal({
				success: false,
				message: "Invalid user id."
			});
		});
	});
});
