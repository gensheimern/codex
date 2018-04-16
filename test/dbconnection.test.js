let testdb = require('../DatabaseConnection');

describe('Database connection', function() {
	it('should connect to the db without an error', function(done) {
		testdb.query('Select * From User', err => done(err));
	})
});