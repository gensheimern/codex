let testdb = require('../testDatabaseConnection');
var User = require('../models/UserModel');

//Require the dev-dependencies


describe('Access to DB', function() {
  describe('#fail', function() {
    it('should return -1 because wrong credentials', function(done) {
      testdb.query('Select * From User');
      done();
    });
  })
});