var mysql = require('mysql');
var dbConnection = mysql.createPool({
  connectionLimit: 100,
  host: '159.65.115.221',
  user: 'root',
  password: 'teamcodex',
  database: 'lunch_planner',
});

module.exports = dbConnection;