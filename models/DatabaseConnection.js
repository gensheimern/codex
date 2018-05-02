const mysql = require('mysql');

const dbConnection = mysql.createPool({
  connectionLimit: 100,
  host: '159.65.115.221',
  user: 'root',
  password: 'teamcodex',
  database: 'lunch_planner',
});

dbConnection.queryp = function(...args) {
  return new Promise((resolve, reject) => {
    dbConnection.query(...args, (err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
};

module.exports = dbConnection;