const chai = require('chai');
const assert = chai.assert;
const request = require('supertest');
const sinon = require('sinon');

const dbConn = require('../DatabaseConnection');
const app = require('../app');

describe('Test user authorization', () => {
	it('should deny access with invalid credentials', (done) => {
		let mockDB = sinon.mock(dbConn);

		let expectation = mockDB.expects('query')
			.withArgs("Select * from User where Email=?", ['invalid@email.com'])
			.callsArgWith(2, null, []);

		request(app)
			.post('/authenticate')
			.set('Accept', 'application/json')
			.send({
				"Email": "invalid@email.com",
				"Password": "false"
			})
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

	it('should grant access with valid credentials', (done) => {
		let mockDB = sinon.mock(dbConn);

		let expectation = mockDB.expects('query')
			.withArgs("Select * from User where Email=?", ['valid@email.com'])
			.callsArgWith(2, null, [{
				Firstname: "Max",
				Name: "Mustermann",
				Email: "valid@email.com",
				Password: "very_secure_password"
			}]);

		request(app)
			.post('/authenticate')
			.set('Accept', 'application/json')
			.send({
				"Email": "valid@email.com",
				"Password": "very_secure_password"
			})
			.expect(200)
			.end((err, res) => {
				if(err) assert.fail();
				assert.equal(res.body.success, true);
				assert.isString(res.body.token);
				assert.isFalse(res.forbidden);

				mockDB.verify();
				mockDB.restore();

				done();
			});
	});
});