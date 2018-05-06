const mysql = require('mysql');
const config = require('../config');

const dbConnection = mysql.createPool({
	connectionLimit: 100,
	host: config.DB_HOST,
	user: config.DB_USER,
	password: config.DB_PASS,
	database: config.DB_NAME,
});


const databaseConnection = {

	query(...args) {
		return dbConnection.query(...args);
	},

	queryp(...args) {
		return new Promise((resolve, reject) => {
			dbConnection.query(...args, (err, res) => {
				if (err) reject(err);
				else resolve(res);
			});
		});
	},

	querypFirst(...args) {
		return new Promise((resolve, reject) => {
			dbConnection.query(...args, (err, res) => {
				if (err) reject(err);
				else if (res.length === 0) resolve(null);
				else resolve(res[0]);
			});
		});
	},

	querypBool(...args) {
		return new Promise((resolve, reject) => {
			dbConnection.query(...args, (err, res) => {
				if (err) reject(err);
				else resolve(res.length >= 0);
			});
		});
	},

	getConnection(...args) {
		return dbConnection.getConnection(...args);
	},

	acquireConnection(...args) {
		return dbConnection.acquireConnection(...args);
	},

	releaseConnection(...args) {
		return dbConnection.releaseConnection(...args);
	},

	end(...args) {
		return dbConnection.end(...args);
	},

};

module.exports = databaseConnection;
