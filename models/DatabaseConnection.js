const mysql = require('mysql');

const dbConnection = mysql.createPool({
  connectionLimit: 100,
  host: '159.65.115.221',
  user: 'root',
  password: 'teamcodex',
  database: 'lunch_planner',
});

module.exports = dbConnection;