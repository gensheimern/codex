const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const TestTools = require('./TestTools');
const TestError = require('./TestError');
const { dbTestData, testData } = require('./testData');

chai.use(chaiAsPromised);
const { expect } = chai;
const userController = require('../routes/user/UserController');
const userModel = require('../models/UserModel');

function correctResponseType(res, status) {
	expect(res._isEndCalled(), 'End called').to.be.true;
	expect(res._getStatusCode(), 'Right status code').to.equal(status);
	expect(res._isJSON(), 'JSON response').to.be.true;
	expect(res._isUTF8(), 'UTF-8 encoding').to.be.true;
}

describe('User controller', () => {
	let mockModels;

	beforeEach(() => {
		mockModels = [];
	});

	afterEach(() => {
		mockModels.forEach(mockModel => mockModel.restore());
		mockModels = [];
	});


	describe('GET all users', () => {
		it('should send the data of all users', async () => {
			// Mock user model
			mockModels.push(TestTools.mockModel(
				userModel, 'getAllUsers', null,
				dbTestData.allUsers,
			));

			// Mock http request and response
			const { req, res } = TestTools.mockRequest();

			// Call test method
			await userController.getAllUsers(req, res);

			// Validate result
			correctResponseType(res, 200);
			expect(res.body(), 'Correct response body').to.deep.equal(testData.allUsers);
		});

		it('should throw error if db request fails', async () => {
			// Mock user model
			mockModels.push(TestTools.mockModel(userModel, 'getAllUsers', new TestError('Test error'), null));

			// Mock http request and response
			const { req, res } = TestTools.mockRequest();

			// Call test method
			const result = userController.getAllUsers(req, res);

			// Validate result
			expect(result, 'Correct error thrown.').to.eventually.be.rejectedWith(TestError);
		});
	});

	describe('GET one user by id', () => {
		it('should send the data of one users when the id is valid', async () => {
			// Mock user model
			mockModels.push(TestTools.mockModel(userModel, 'getUserById', null, dbTestData.userData));

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				params: {
					userId: '5',
				},
			});

			// Call test method
			await userController.getUserById(req, res);

			// Validate result
			correctResponseType(res, 200);
			expect(res.body(), 'Correct response body').to.deep.equal(testData.userData);
		});

		it('should send "not found" when the id is invalid', async () => {
			// Mock model
			mockModels.push(TestTools.mockModel(userModel, 'getUserById', null, null));

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				params: {
					userId: '5',
				},
			});

			// Call test method
			await userController.getUserById(req, res);

			// Validate result
			correctResponseType(res, 404);
			expect(res.body().message, 'Correct response body').to.be.a('string');
		});

		it('should send "not found" when no id is passed', async () => {
			mockModels.push(TestTools.mockModel(userModel, 'getUserById', null, null));

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				params: {},
			});

			// Call test method
			await userController.getUserById(req, res);

			// Validate result
			correctResponseType(res, 404);
			expect(res.body().message, 'Correct response body').to.be.a('string');
		});

		it('should send 500 if there is a database error', async () => {
			// Mock user model
			mockModels.push(TestTools.mockModel(userModel, 'getUserById', new TestError('Test error'), null));

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				params: {
					userId: '5',
				},
			});

			// Call test method
			const result = userController.getUserById(req, res);

			// Validate result
			expect(result, 'Correct error thrown.').to.eventually.be.rejectedWith(TestError);
		});
	});

	describe('POST a new user', () => {
		it('should create a new user', async () => {
			mockModels.push(TestTools.mockModel(userModel, 'addUser', null, TestTools.dbInsertSuccess));
			mockModels.push(TestTools.mockModel(userModel, 'getUserByEmail', null, false));

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				body: testData.postUserData,
			});

			// Call test method
			await userController.addUser(req, res);

			// Validate result
			correctResponseType(res, 201);
			expect(res.body().userId, 'Correct response body').to.equal(10);
		});

		it('should send bad request if not all attributes are set', async () => {
			mockModels.push(TestTools.mockNotCalled(userModel, 'addUser'));

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				body: {
					firstName: 'Max',
					name: 'Mustermann',
					password: 'very_secure_password',
					image: '/image.png',
				},
			});

			// Call test method
			await userController.addUser(req, res);

			// Validate result
			correctResponseType(res, 400);
			expect(res.body().message, 'Error message').to.be.a('string');
		});

		it('should send 500 if there is a database error', async () => {
			mockModels.push(TestTools.mockModel(userModel, 'addUser', new TestError('Test error'), null));
			mockModels.push(TestTools.mockModel(userModel, 'getUserByEmail', new TestError('Test error'), null));

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				body: {
					firstName: 'Max',
					name: 'Mustermann',
					email: 'valid@email.com',
					password: 'very_secure_password',
					image: '/image.png',
				},
			});

			// Call test method
			const result = userController.addUser(req, res);

			// Validate result
			expect(result, 'Correct error thrown.').to.eventually.be.rejectedWith(TestError);
		});
	});

	describe('PUT update user', () => {
		it('should update an existing user', async () => {
			mockModels.push(TestTools.mockModel(userModel, 'updateUser', null, TestTools.dbUpdateSuccess));
			mockModels.push(TestTools.mockModel(userModel, 'getUserById', null, {
				User_Id: 5,
				Firstname: 'Maxneu',
				Name: 'Mustermannneu',
				Email: 'neue@email.com',
				Password: 'very_new_password',
				Image: '/image.png',
			}));

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				params: {
					userId: '5',
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

			// Validate result
			correctResponseType(res, 200);
			expect(res.body().success, 'Update successful').to.be.true;
			expect(res.body().message, 'Message set').to.be.a('string');
		});

		it('should return an error if the user does not exist', async () => {
			mockModels.push(TestTools.mockModel(userModel, 'updateUser', null, TestTools.dbUpdateFailed));
			mockModels.push(TestTools.mockModel(userModel, 'getUserById', null, {
				User_Id: 5,
				Firstname: 'Maxneu',
				Name: 'Mustermannneu',
				Email: 'neue@email.com',
				Password: 'very_new_password',
				Image: '/image.png',
			}));

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				params: {
					userId: '5',
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

			// Validate result
			correctResponseType(res, 404);
			expect(res.body().success, 'Update successful').to.be.false;
			expect(res.body().message, 'Message set').to.be.a('string');
		});

		it('should not update user data of other user', async () => {
			mockModels.push(TestTools.mockNotCalled(userModel, 'updateUser'));

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				params: {
					userId: '6',
				},
				body: {
					firstName: 'Maxneu',
					name: 'Mustermannneu',
					email: 'neue@email.com',
					password: 'very_new_password',
					image: '/image.png',
				},
			});

			// Call test method
			await userController.updateUser(req, res);

			// Validate result
			correctResponseType(res, 403);
			expect(res.body().success, 'Correct success status').to.be.false;
			expect(res.body().message, 'Message set').to.be.a('string');
		});

		it('should not update user data without id', async () => {
			mockModels.push(TestTools.mockNotCalled(userModel, 'updateUser'));

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				body: testData.newUserData,
			});

			// Call test method
			await userController.updateUser(req, res);

			// Validate result
			correctResponseType(res, 403);
			expect(res.body().success, 'Correct success status').to.be.false;
			expect(res.body().message, 'Message set').to.be.a('string');
		});

		it('should send 500 if there is an db error', async () => {
			mockModels.push(TestTools.mockModel(userModel, 'updateUser', new TestError('Test error.'), null));
			mockModels.push(TestTools.mockModel(userModel, 'getUserById', new TestError('Test error'), null));

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				params: {
					userId: '5',
				},
				body: testData.newUserData,
			});

			// Call test method
			const result = userController.updateUser(req, res);

			// Validate result
			expect(result, 'Correct error thrown.').to.eventually.be.rejectedWith(TestError);
		});
	});

	describe('DELETE user', () => {
		it('should delete an existing user', async () => {
			mockModels.push(TestTools.mockModel(userModel, 'deleteUser', null, TestTools.dbDeleteSuccess));

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				params: {
					userId: '5',
				},
			});

			// Call test method
			await userController.deleteUser(req, res);

			// Validate result
			correctResponseType(res, 200);
			expect(res.body().success, 'Correct success state').to.be.true;
			expect(res.body().message, 'Message set').to.be.a('string');
		});

		it('should return error if user does not exist', async () => {
			mockModels.push(TestTools.mockModel(userModel, 'deleteUser', null, TestTools.dbDeleteFailed));

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				params: {
					userId: '5',
				},
			});

			// Call test method
			await userController.deleteUser(req, res);

			// Validate result
			correctResponseType(res, 404);
			expect(res.body().success, 'Correct success state').to.be.false;
			expect(res.body().message, 'Message set').to.be.a('string');
		});

		it('should not delete other user', async () => {
			mockModels.push(TestTools.mockNotCalled(userModel, 'deleteUser'));

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				params: {
					userId: '6',
				},
			});

			// Call test method
			await userController.deleteUser(req, res);

			// Validate result
			correctResponseType(res, 403);
			expect(res.body().success, 'Right success status').to.be.false;
			expect(res.body().message).to.be.a('string');
		});

		it('should send delete user without id', async () => {
			mockModels.push(TestTools.mockNotCalled(userModel, 'deleteUser'));

			// Mock http request and response
			const { req, res } = TestTools.mockRequest();

			// Call test method
			await userController.deleteUser(req, res);

			// Validate result
			correctResponseType(res, 403);
			expect(res.body().success, 'Correct success status').to.be.false;
			expect(res.body().message).to.be.a('string');
		});

		it('should send 500 if there is an db error', async () => {
			mockModels.push(TestTools.mockModel(userModel, 'deleteUser', new TestError('Test error'), null));

			// Mock http request and response
			const { req, res } = TestTools.mockRequest({
				params: {
					userId: '5',
				},
			});

			// Call test method
			const result = userController.deleteUser(req, res);

			// Validate result
			expect(result, 'Correct error thrown.').to.eventually.be.rejectedWith(TestError);
		});
	});
});
