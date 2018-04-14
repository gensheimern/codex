var mysql = require('mysql');
var testdbConnection = mysql.createPool({
  connectionLimit: 100,
  host: '159.65.115.221',
  user: 'root',
  password: 'teamcodex',
  database: 'test_lunch_planner',



});
module.exports = testdbConnection;