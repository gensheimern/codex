const chai = require('chai');
const assert = chai.assert;
const request = require('supertest');
const sinon = require('sinon');
const jwt = require('jsonwebtoken');
const encryptPassword = require('../routes/auth/CryptPassword');

const dbConn = require('../DatabaseConnection');
const app = require('../app');

const validToken = jwt.sign({
	User_Id: 1,
	Firstname: "Peter",
	Name: "Pan",
	Email: "peter.pan@gmx.de",
	iat: Math.floor(Date.now() / 1000),
	exp: Math.floor(Date.now() / 1000) + (60 * 60)
}, 'secret');

describe('User Router', () => {
	describe('GET all users', () => {
		it('should send the data of all users', (done) => {
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
					mockDB.verify();
					mockDB.restore();

					if(err) assert.fail();

					assert.isFalse(res.forbidden);
					assert.deepEqual(res.body, [{
						Firstname: "Max",
						Name: "Mustermann",
						Email: "valid@email.com"
					},{
						Firstname: "Max2",
						Name: "Mustermann2",
						Email: "valid2@email.com"
					}]);

					done();
				});
		});
	});

	describe('GET user by id', () => {
		it('should send the data of one user when the id is valid', (done) => {
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
				.set('X-Access-Token', validToken)
				.expect(200)
				.end((err, res) => {
					mockDB.verify();
					mockDB.restore();

					if(err) assert.fail();

					assert.isFalse(res.forbidden);
					assert.deepEqual(res.body, [{
						User_Id: 5,
						Firstname: "Max",
						Name: "Mustermann",
						Email: "valid@email.com",
						Password: "very_secure_password"
					}]);

					done();
				});
		});

		it('should send "Not found" when the id is invalid', (done) => {
			let mockDB = sinon.mock(dbConn);

			let expectation = mockDB.expects('query')
			.withArgs("Select * from User where User_Id=?", ["6"])
			.callsArgWith(2, null, []);

			request(app)
				.get('/user/6')
				.set('Accept', 'application/json')
				.set('X-Access-Token', validToken)
				.expect(404)
				.end((err, res) => {
					mockDB.verify();
					mockDB.restore();

					if(err) assert.fail();

					assert.isFalse(res.forbidden);

					done();
				});
		});
	});

	describe('POST new user', () => {
		it('should create a new user', (done) => {
			let mockDB = sinon.mock(dbConn);

			let expectation = mockDB.expects('query')
			.withArgs("Insert into User values(?,?,?,?,?)", [undefined, "Peter", "Pan", "peter.pan@gmx.de", encryptPassword("very_secure_password")])
			.callsArgWith(2, null, {
				fieldCount: 0,
				affectedRows: 1,
				insertId: 5,
				serverStatus: 2,
				warningCount: 0,
				message: '',
				protocol41: true,
				changedRows: 0
			});

			request(app)
				.post('/user')
				.set('Accept', 'application/json')
				.set('X-Access-Token', validToken)
				.send({
					Firstname: "Peter",
					Name: "Pan",
					Email: "peter.pan@gmx.de",
					Password: "very_secure_password"
				})
				.expect(200)
				.end((err, res) => {
					mockDB.verify();
					mockDB.restore();

					if(err) assert.fail();

					assert.isFalse(res.forbidden);
					assert.deepEqual(res.body, {
						User_Id: 5,
						Firstname: "Peter",
						Name: "Pan",
						Email: "peter.pan@gmx.de"
					});

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
					mockDB.verify();
					mockDB.restore();

					if(err) assert.fail();

					assert.isFalse(res.forbidden);

					done();
				});
		});

		it('should send "Not found" when user id is invalid', (done) => {
			let mockDB = sinon.mock(dbConn);

			let expectation = mockDB.expects('query')
			.withArgs("Update User set Firstname=?, Name=?, Email=?, Password=? where User_Id=?", ["peter", "pan", "peter.pan@gmx.de", "peterpan", "5"])
			.callsArgWith(2, null, {
				"fieldCount": 0,
				"affectedRows": 0,
				"insertId": 0,
				"serverStatus": 2,
				"warningCount": 0,
				"message": "(Rows matched: 1  Changed: 1  Warnings: 0",
				"protocol41": true,
				"changedRows": 0
			});

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
				.expect(404)
				.end((err, res) => {
					mockDB.verify();
					mockDB.restore();

					if(err) assert.fail();

					assert.isFalse(res.forbidden);

					done();
				});
		});
	});

	describe('DELETE user', () => {
		it('should delete an existing user', (done) => {
			let mockDB = sinon.mock(dbConn);

			let expectation = mockDB.expects('query')
			.withArgs("Delete From User where User_Id=?", ["5"])
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
				.delete('/user/5')
				.set('Accept', 'application/json')
				.set('X-Access-Token', validToken)
				.expect(200)
				.end((err, res) => {
					mockDB.verify();
					mockDB.restore();

					if(err) assert.fail();

					assert.isFalse(res.forbidden);

					done();
				});
		});

		it('should send "Not found" when user id is invalid', (done) => {
			let mockDB = sinon.mock(dbConn);

			let expectation = mockDB.expects('query')
			.withArgs("Delete From User where User_Id=?", ["5"])
			.callsArgWith(2, null, {
				"fieldCount": 0,
				"affectedRows": 0,
				"insertId": 0,
				"serverStatus": 2,
				"warningCount": 0,
				"message": "(Rows matched: 0  Changed: 0  Warnings: 0",
				"protocol41": true,
				"changedRows": 0
			});

			request(app)
				.delete('/user/5')
				.set('Accept', 'application/json')
				.set('X-Access-Token', validToken)
				.expect(404)
				.end((err, res) => {console.log(err);
					mockDB.verify();
					mockDB.restore();

					if(err) assert.fail();

					assert.isFalse(res.forbidden);

					done();
				});
		});
	});
});