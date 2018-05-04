const chai = require('chai');
const TestTools = require('./TestTools');

const { expect } = chai;
const userController = require('../routes/UserController');
const userModel = require('../models/UserModel');

describe('User controller', () => {
	describe('GET all users', () => {
		it('should send the data of all users', async () => {
			// Mock user model
			const mockModel = TestTools.mockModel(
				userModel, 'getAllUsers', null,
				[{
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
				],
			);

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				method: 'GET',
				baseUrl: '/user',
			});

			// Call test method
			await userController.getAllUsers(req, res);

			// Check result with expected values
			mockModel.restore();

			expect(res._isEndCalled(), 'End called').to.be.true;
			expect(res._getStatusCode(), 'Right status code').to.equal(200);
			expect(res._isJSON(), 'JSON response').to.be.true;
			expect(res._isUTF8(), 'UTF-8 encoding').to.be.true;
			expect(JSON.parse(res._getData()), 'Correct response body').to.deep.equal([{
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
			}]);
		});
	});

	describe('GET one user by id', () => {
		it('should send the data of one users when the id is valid', async () => {
			// Mock user model
			const mockModel = TestTools.mockModel(userModel, 'getUserById', null, [{
				User_Id: 5,
				Firstname: 'Max',
				Name: 'Mustermann',
				Email: 'valid@email.com',
				Image: '/image.png',
			}]);

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				method: 'GET',
				baseUrl: '/user',
				params: {
					id: '5',
				},
			});

			// Call test method
			await userController.getUserById(req, res);

			// Check result with expected values
			mockModel.restore();

			expect(res._isEndCalled(), 'End called').to.be.true;
			expect(res._getStatusCode(), 'Right status code').to.equal(200);
			expect(res._isJSON(), 'JSON response').to.be.true;
			expect(res._isUTF8(), 'UTF-8 encoding').to.be.true;
			expect(JSON.parse(res._getData()), 'Correct response body').to.deep.equal({
				id: 5,
				firstName: 'Max',
				name: 'Mustermann',
				email: 'valid@email.com',
				image: '/image.png',
			});
		});

		it('should send "not found" when the id is invalid', async () => {
			// Mock model
			const mockModel = TestTools.mockModel(userModel, 'getUserById', null, []);

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				method: 'GET',
				baseUrl: '/user',
				params: {
					id: '5',
				},
			});

			// Call test method
			await userController.getUserById(req, res);

			// Check result with expected values
			mockModel.restore();

			expect(res._isEndCalled(), 'End called').to.be.true;
			expect(res._getStatusCode(), 'Right status code').to.equal(404);
			expect(res._isJSON(), 'JSON response').to.be.true;
			expect(res._isUTF8(), 'UTF-8 encoding').to.be.true;
			expect(JSON.parse(res._getData()), 'Correct response body').to.deep.equal({
				message: 'Invalid user id.',
			});
		});

		it('should send "not found" when no id is passed', async () => {
			const mockModel = TestTools.mockModel(userModel, 'getUserById', null, []);
			// TODO let mockModel = TestTools.mockNotCalled(userModel, 'getUserById');

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				method: 'GET',
				baseUrl: '/user',
				params: {},
			});

			// Call test method
			await userController.getUserById(req, res);

			// Check result with expected values
			mockModel.restore();

			expect(res._isEndCalled(), 'End called').to.be.true;
			expect(res._getStatusCode(), 'Right status code').to.equal(404);
			expect(res._isJSON(), 'JSON response').to.be.true;
			expect(res._isUTF8(), 'UTF-8 encoding').to.be.true;
			expect(JSON.parse(res._getData()), 'Correct response body').to.deep.equal({
				message: 'Invalid user id.',
			});
		});
	});

	describe('POST a new user', () => {
		it('should create a new user', async () => {
			const mockModel = TestTools.mockModel(userModel, 'addUser', null, TestTools.dbInsertSuccess);

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				method: 'POST',
				baseUrl: '/user',
				body: {
					firstName: 'Max',
					name: 'Mustermann',
					email: 'valid@email.com',
					password: 'very_secure_password',
					image: '/image.png',
				},
			});

			// Call test method
			await userController.addUser(req, res);

			// Check result with expected values
			mockModel.restore();

			expect(res._isEndCalled(), 'End called').to.be.true;
			expect(res._getStatusCode(), 'Right status code').to.equal(201);
			expect(res._isJSON(), 'JSON response').to.be.true;
			expect(res._isUTF8(), 'UTF-8 encoding').to.be.true;
			expect(JSON.parse(res._getData()), 'Correct response body').to.deep.equal({
				User_Id: 10,
			});
		});
	});

	describe('PUT update user', () => {
		it('should update an existing user', async () => {
			const mockModel = TestTools.mockModel(userModel, 'updateUser', null, TestTools.dbUpdateSuccess);
			const mockModel2 = TestTools.mockModel(userModel, 'getUserById', null, {
				firstName: 'Maxneu',
				name: 'Mustermannneu',
				email: 'neue@email.com',
				password: 'very_new_password',
				image: '/image.png',
			});

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				method: 'PUT',
				baseUrl: '/user',
				params: {
					id: '5',
				},
				body: {
					firstName: 'Maxneu',
					name: 'Mustermannneu',
					email: 'neue@email.com',
					password: 'very_new_password',
					image: '/new_image.png',
				},
			});

			// Call test method
			await userController.updateUser(req, res);

			// Check result with expected values
			mockModel.restore();
			mockModel2.restore();

			expect(res._isEndCalled(), 'End called').to.be.true;
			expect(res._getStatusCode(), 'Right status code').to.equal(200);
			expect(res._isJSON(), 'JSON response').to.be.true;
			expect(res._isUTF8(), 'UTF-8 encoding').to.be.true;
			const body = JSON.parse(res._getData());
			expect(body.success, 'Update successful').to.be.true;
			expect(body, 'Correct response body').to.deep.equal({
				success: true,
				message: 'User successfully updated.',
			});
		});

		it('should not update user data of other user', async () => {
			const mockModel = TestTools.mockNotCalled(userModel, 'updateUser');

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				method: 'PUT',
				baseUrl: '/user',
				params: {
					id: '6',
				},
				body: {
					firstName: 'Maxneu',
					name: 'Mustermannneu',
					email: 'neue@email.com',
					password: 'very_new_password',
				},
			});

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
				message: 'Invalid user id.',
			});
		});

		it('should not update user data without id', async () => {
			const mockModel = TestTools.mockNotCalled(userModel, 'updateUser');

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				method: 'PUT',
				baseUrl: '/user',
				body: {
					firstName: 'Maxneu',
					name: 'Mustermannneu',
					email: 'neue@email.com',
					password: 'very_new_password',
				},
			});

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
				message: 'Invalid user id.',
			});
		});
	});

	describe('DELETE user', () => {
		it('should delete an existing user', async () => {
			const mockModel = TestTools.mockModel(userModel, 'deleteUser', null, TestTools.dbDeleteSuccess);

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				method: 'DELETE',
				baseUrl: '/user',
				params: {
					id: '5',
				},
			});

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
				message: 'User deleted.',
			});
		});

		it('should not delete other user', async () => {
			const mockModel = TestTools.mockNotCalled(userModel, 'deleteUser');

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				method: 'DELETE',
				baseUrl: '/user',
				params: {
					id: '6',
				},
			});

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
				message: 'Invalid user id.',
			});
		});

		it('should send delete user without id', async () => {
			const mockModel = TestTools.mockNotCalled(userModel, 'deleteUser');

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				method: 'DELETE',
				baseUrl: '/user',
			});

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
				message: 'Invalid user id.',
			});
		});
	});
});
