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

describe('Team Router', () => {
	// describe('GET all teams', () => {
	// 	it('should send the data of all users', (done) => {
	// 		let mockDB = sinon.mock(dbConn);
	//
	// 		let expectation = mockDB.expects('query')
	// 		.withArgs("Select * From Team")
	// 		.callsArgWith(1, null, [{
	// 			Team_Id: 1,
	// 			Teamname: "Musterteam",
	// 			Teammanager: 1
	// 		},{
	// 			Team_Id: 2,
	// 			Teamname: "Musterteam2",
	// 			Teammanager: 3
	// 		}]);
	//
	// 		request(app)
	// 			.get('/team')
	// 			.set('Accept', 'application/json')
	// 			.set('x-access-token', validToken)
	// 			.expect(200)
	// 			.end((err, res) => {
	// 				mockDB.verify();
	// 				mockDB.restore();
	//
	// 				if(err) assert.fail();
	//
	// 				assert.isFalse(res.forbidden);
	// 				assert.deepEqual(res.body, [{
	// 					Team_Id: 1,
	// 					Teamname: "Musterteam",
	// 					Teammanager: 1
	// 				},{
	// 					Team_Id: 2,
	// 					Teamname: "Musterteam2",
	// 					Teammanager: 3
	// 				}]);
	//
	// 				done();
	// 			});
	// 	});
	// });

	// describe('GET team by id', () => {
	// 	it('should send the data of one team when the id is valid', (done) => {
	// 		let mockDB = sinon.mock(dbConn);
	//
	// 		let expectation = mockDB.expects('query')
	// 		.withArgs("Select * from Team where Team_Id=?", ["5"])
	// 		.callsArgWith(2, null, [{
	// 			Team_Id: 5,
	// 			Teamname: "Musterteam",
	// 			Teammanager: 8
	// 		}]);
	//
	// 		request(app)
	// 			.get('/team/5')
	// 			.set('Accept', 'application/json')
	// 			.set('x-access-token', validToken)
	// 			.expect(200)
	// 			.end((err, res) => {
	// 				mockDB.verify();
	// 				mockDB.restore();
	//
	// 				if(err) assert.fail();
	//
	// 				assert.isFalse(res.forbidden);
	// 				assert.deepEqual(res.body, {
	// 					Team_Id: 5,
	// 					Teamname: "Musterteam",
	// 					Teammanager: 8
	// 				});
	//
	// 				done();
	// 			});
	// 	});

	// 	it('should send "Not found" when the id is invalid', (done) => {
	// 		let mockDB = sinon.mock(dbConn);
	//
	// 		let expectation = mockDB.expects('query')
	// 		.withArgs("Select * from Team where Team_Id=?", ["5"])
	// 		.callsArgWith(2, null, []);
	//
	// 		request(app)
	// 			.get('/team/5')
	// 			.set('Accept', 'application/json')
	// 			.set('x-access-token', validToken)
	// 			.expect(404)
	// 			.end((err, res) => {
	// 				mockDB.verify();
	// 				mockDB.restore();
	//
	// 				if(err) assert.fail();
	//
	// 				assert.isFalse(res.forbidden);
	//
	// 				done();
	// 			});
	// 	});
	// });

	describe('POST a new team', () => {
		it('should create a new team', (done) => {
			let mockDB = sinon.mock(dbConn);

			let expectation = mockDB.expects('query')
			.withArgs("Insert into Team values(?,?,?)", [undefined, "Mustername", 1])
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
				.post('/team')
				.set('Accept', 'application/json')
				.set('x-access-token', validToken)
				.send({
					Teamname: "Mustername"
				})
				.expect(201)
				.end((err, res) => {
					mockDB.verify();
					mockDB.restore();

					if(err) assert.fail();

					assert.isFalse(res.forbidden);
					assert.deepEqual(res.body, {
						Team_Id: 5,
						Teamname: "Mustername",
						Teammanager: 1
					});

					done();
				});
		});
	});

	describe('PUT update team', () => {
		it('should update a team when the id is valid', (done) => {
			let mockDB = sinon.mock(dbConn);

			let expectation = mockDB.expects('query')
			.withArgs("Update Team set Teamname=?, Teammanager=? where Team_Id=?", ["Testname", 1, "5"])
			.callsArgWith(2, null, {
				fieldCount: 0,
				affectedRows: 1,
				insertId: 5,
				serverStatus: 2,
				warningCount: 0,
				message: '',
				protocol41: true,
				changedRows: 1
			});

			request(app)
				.put('/team/5')
				.set('Accept', 'application/json')
				.set('x-access-token', validToken)
				.send({
					Teamname: "Testname",
					Teammanager: 1
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

		it('should send "Not found" when team id is invalid', (done) => {
			let mockDB = sinon.mock(dbConn);

			let expectation = mockDB.expects('query')
			.withArgs("Update Team set Teamname=?, Teammanager=? where Team_Id=?", ["Testname", 1, "5"])
			.callsArgWith(2, null, {
				fieldCount: 0,
				affectedRows: 0,
				insertId: 0,
				serverStatus: 2,
				warningCount: 0,
				message: "(Rows matched: 1  Changed: 1  Warnings: 0",
				protocol41: true,
				changedRows: 0
			});

			request(app)
				.put('/team/5')
				.set('Accept', 'application/json')
				.set('X-Access-Token', validToken)
				.send({
					Teamname: "Testname",
					Teammanager: 1
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

	describe('DELETE team', () => {
		it('should delete an existing team', (done) => {
			let mockDB = sinon.mock(dbConn);

			let expectation = mockDB.expects('query')
			.withArgs("Delete From Team where Team_Id=?", ["5"])
			.callsArgWith(2, null, {
				fieldCount: 0,
				affectedRows: 1,
				insertId: 0,
				serverStatus: 2,
				warningCount: 0,
				message: "(Rows matched: 1  Changed: 1  Warnings: 0",
				protocol41: true,
				changedRows: 1
			});

			request(app)
				.delete('/team/5')
				.set('Accept', 'application/json')
				.set('X-Access-Token', validToken)
				.expect(200)
				.end((err, res) => {
					mockDB.verify();
					mockDB.restore();

					if(err) assert.fail();

					assert.isFalse(res.forbidden);
					assert.deepEqual(res.body, {});

					done();
				});
		});

		it('should send "Not found" when user id is invalid', (done) => {
			let mockDB = sinon.mock(dbConn);

			let expectation = mockDB.expects('query')
			.withArgs("Delete From Team where Team_Id=?", ["5"])
			.callsArgWith(2, null, {
				fieldCount: 0,
				affectedRows: 0,
				insertId: 0,
				serverStatus: 2,
				warningCount: 0,
				message: "(Rows matched: 0  Changed: 0  Warnings: 0",
				protocol41: true,
				changedRows: 0
			});

			request(app)
				.delete('/team/5')
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
});