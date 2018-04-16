const chai = require('chai');
const assert = chai.assert;
const request = require('supertest');
const sinon = require('sinon');

const dbConn = require('../DatabaseConnection');
const app = require('../app');

const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJGaXJzdG5hbWUiOiJNYXgiLCJOYW1lIjoiTXVzdGVybWFubiIsIkVtYWlsIjoidmFsaWRAZW1haWwuY29tIiwiaWF0IjoxNTIzODk1NDg1LCJleHAiOjE1MjM5ODE5MTV9.N42QX5SUMVq-fqIF4RSKhGrmBAXugII62i0kzFeQMpA';

describe('User Router', () => {
	describe('GET all users', () => {
		it('shouldn\'t allow unauthorized access without token', (done) => {
			let mockDB = sinon.mock(dbConn);

			request(app)
				.get('/user')
				.set('Accept', 'application/json')
				.expect(403)
				.end((err, res) => {
					if(err) assert.fail();
					assert.equal(res.body.success, false);
					assert.isTrue(res.forbidden);

					mockDB.verify();
					mockDB.restore();

					done();
				});
		});

		it('shouldn\'t allow unauthorized access with wrong token', (done) => {
			let mockDB = sinon.mock(dbConn);

			request(app)
				.get('/user')
				.set('Accept', 'application/json')
				.set('X-Access-Token', 'invalid-token')
				.expect(403)
				.end((err, res) => {
					if(err) assert.fail();
					assert.equal(res.body.success, false);
					assert.isTrue(res.forbidden);

					mockDB.verify();
					mockDB.restore();

					done();
				});
		});

		it('should send the data of all users when authorized', (done) => {
			let mockDB = sinon.mock(dbConn);

			let expectation = mockDB.expects('query')
			.withArgs("Select * From User")
			.callsArgWith(1, null, [{
				Firstname: "Max",
				Name: "Mustermann",
				Email: "valid@email.com",
				Password: "very_secure_password"
			},{
				Firstname: "Max2",
				Name: "Mustermann2",
				Email: "valid2@email.com",
				Password: "very_secure_password2"
			}]);

			request(app)
				.get('/user')
				.set('Accept', 'application/json')
				.set('x-access-token', validToken)
				.expect(200)
				.end((err, res) => {
					if(err) assert.fail();
					assert.isFalse(res.forbidden);
					assert.deepEqual(res.body, [{
						Firstname: "Max",
						Name: "Mustermann",
						Email: "valid@email.com",
						Password: "very_secure_password"
					},{
						Firstname: "Max2",
						Name: "Mustermann2",
						Email: "valid2@email.com",
						Password: "very_secure_password2"
					}]);

					mockDB.verify();
					mockDB.restore();

					done();
				});
		});
	});

	describe('GET user by id', () => {
		it('shouldn\'t allow unauthorized access without token', (done) => {
			let mockDB = sinon.mock(dbConn);

			request(app)
				.get('/user/5')
				.set('Accept', 'application/json')
				.expect(403)
				.end((err, res) => {
					if(err) assert.fail();
					assert.equal(res.body.success, false);
					assert.isTrue(res.forbidden);

					mockDB.verify();
					mockDB.restore();

					done();
				});
		});

		it('shouldn\'t allow unauthorized access with wrong token', (done) => {
			let mockDB = sinon.mock(dbConn);

			request(app)
				.get('/user/5')
				.set('Accept', 'application/json')
				.set('X-Access-Token', 'invalid-token')
				.expect(403)
				.end((err, res) => {
					if(err) assert.fail();
					assert.equal(res.body.success, false);
					assert.isTrue(res.forbidden);

					mockDB.verify();
					mockDB.restore();

					done();
				});
		});

		it('should send the data of one user when authorized', (done) => {
			let mockDB = sinon.mock(dbConn);

			let expectation = mockDB.expects('query')
			.withArgs("Select * from User where User_Id=?", ["5"])
			.callsArgWith(2, null, [{
				User_Id: 5,
				Firstname: "Max",
				Name: "Mustermann",
				Email: "valid@email.com",
				Password: "very_secure_password"
			}]);

			request(app)
				.get('/user/5')
				.set('Accept', 'application/json')
				.set('x-access-token', validToken)
				.expect(200)
				.end((err, res) => {
					if(err) assert.fail();
					assert.isFalse(res.forbidden);
					assert.deepEqual(res.body, [{
						User_Id: 5,
						Firstname: "Max",
						Name: "Mustermann",
						Email: "valid@email.com",
						Password: "very_secure_password"
					}]);

					mockDB.verify();
					mockDB.restore();

					done();
				});
		});
	});

	describe('POST new user', () => {
		it('shouldn\'t allow unauthorized access without token', (done) => {
			let mockDB = sinon.mock(dbConn);

			request(app)
				.post('/user')
				.set('Accept', 'application/json')
				.expect(403)
				.end((err, res) => {
					if(err) assert.fail();
					assert.equal(res.body.success, false);
					assert.isTrue(res.forbidden);

					mockDB.verify();
					mockDB.restore();

					done();
				});
		});

		it('shouldn\'t allow unauthorized access with wrong token', (done) => {
			let mockDB = sinon.mock(dbConn);

			request(app)
				.get('/user/5')
				.set('Accept', 'application/json')
				.set('X-Access-Token', 'invalid-token')
				.expect(403)
				.end((err, res) => {
					if(err) assert.fail();
					assert.equal(res.body.success, false);
					assert.isTrue(res.forbidden);

					mockDB.verify();
					mockDB.restore();

					done();
				});
		});

		it('should send the data of one user when authorized', (done) => {
			let mockDB = sinon.mock(dbConn);

			let expectation = mockDB.expects('query')
			.withArgs("Select * from User where User_Id=?", ["5"])
			.callsArgWith(2, null, [{
				User_Id: 5,
				Firstname: "Max",
				Name: "Mustermann",
				Email: "valid@email.com",
				Password: "very_secure_password"
			}]);

			request(app)
				.get('/user/5')
				.set('Accept', 'application/json')
				.set('x-access-token', validToken)
				.expect(200)
				.end((err, res) => {
					if(err) assert.fail();
					assert.isFalse(res.forbidden);
					assert.deepEqual(res.body, [{
						User_Id: 5,
						Firstname: "Max",
						Name: "Mustermann",
						Email: "valid@email.com",
						Password: "very_secure_password"
					}]);

					mockDB.verify();
					mockDB.restore();

					done();
			});
		});
	});

	describe('PUT update user', () => {
		it('should update an existing user', (done) => {
			let mockDB = sinon.mock(dbConn);

			let expectation = mockDB.expects('query')
			.withArgs("Update User set Firstname=?, Name=?, Email=?, Password=? where User_Id=?", ["peter", "pan", "peter.pan@gmx.de", "peterpan", "5"])
			.callsArgWith(2, null, [{
				"fieldCount": 0,
				"affectedRows": 1,
				"insertId": 0,
				"serverStatus": 2,
				"warningCount": 0,
				"message": "(Rows matched: 1  Changed: 1  Warnings: 0",
				"protocol41": true,
				"changedRows": 1
			}]);

			request(app)
				.put('/user/5')
				.set('Accept', 'application/json')
				.set('X-Access-Token', validToken)
				.send({
					Firstname: "peter",
					Name: "pan",
					Email: "peter.pan@gmx.de",
					Password: "peterpan"
				})
				.expect(200)
				.end((err, res) => {
					if(err) assert.fail();
					assert.isFalse(res.forbidden);

					mockDB.verify();
					mockDB.restore();

					done();
				});
		});

		it('should send "Not found" when user id is invalid', (done) => {
			let mockDB = sinon.mock(dbConn);

			let expectation = mockDB.expects('query')
			.withArgs("Update User set Firstname=?, Name=?, Email=?, Password=? where User_Id=?", ["peter", "pan", "peter.pan@gmx.de", "peterpan", "5"])
			.callsArgWith(2, null, [{
				"fieldCount": 0,
				"affectedRows": 0,
				"insertId": 0,
				"serverStatus": 2,
				"warningCount": 0,
				"message": "(Rows matched: 1  Changed: 1  Warnings: 0",
				"protocol41": true,
				"changedRows": 0
			}]);

			request(app)
				.put('/user/5')
				.set('Accept', 'application/json')
				.set('X-Access-Token', validToken)
				.send({
					Firstname: "peter",
					Name: "pan",
					Email: "peter.pan@gmx.de",
					Password: "peterpan"
				})
				.expect(200)
				.end((err, res) => {
					if(err) assert.fail();
					assert.isFalse(res.forbidden);

					mockDB.verify();
					mockDB.restore();

					done();
				});
		});
	});

	describe('DELETE user', () => {
		//
	});
});