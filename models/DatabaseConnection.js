const mysql = require('mysql2');
const config = require('../config');

const pool = mysql.createPool({
	connectionLimit: 100,
	host: config.DB_HOST,
	user: config.DB_USER,
	password: config.DB_PASS,
	database: config.DB_NAME,
});


/**
 * Provides a promise wrapper for the mysql driver.
 * The querys are executed as prepared statements,
 * which prevents sql injections.
 */
const databaseConnection = {

	query(...args) {
		return pool.execute(...args);
	},

	queryp(...args) {
		return new Promise((resolve, reject) => {
			pool.execute(...args, (err, res) => {
				if (err) reject(err);
				else resolve(res);
			});
		});
	},

	querypFirst(...args) {
		return new Promise((resolve, reject) => {
			pool.execute(...args, (err, res) => {
				if (err) reject(err);
				else if (res.length === 0) resolve(null);
				else resolve(res[0]);
			});
		});
	},

	querypBool(...args) {
		return new Promise((resolve, reject) => {
			pool.execute(...args, (err, res) => {
				if (err) reject(err);
				else resolve(res.length >= 1);
			});
		});
	},

	getConnection(...args) {
		return pool.getConnection(...args);
	},

	acquireConnection(...args) {
		return pool.acquireConnection(...args);
	},

	releaseConnection(...args) {
		return pool.releaseConnection(...args);
	},

	end(...args) {
		return pool.end(...args);
	},

};

module.exports = databaseConnection;
