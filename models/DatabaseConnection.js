const mysql = require('mysql');
const config = require('../config');

const dbConnection = mysql.createPool({
	connectionLimit: 100,
	host: config.DB_HOST,
	user: config.DB_USER,
	password: config.DB_PASS,
	database: config.DB_NAME,
});

dbConnection.queryp = (...args) => new Promise((resolve, reject) => {
	dbConnection.query(...args, (err, res) => {
		if (err) reject(err);
		else resolve(res);
	});
});

module.exports = dbConnection;
