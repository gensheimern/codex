require('dotenv').config();
const dotenv = require('dotenv');
const fs = require('fs');

const envLocal = dotenv.parse(fs.readFileSync('.env.local'));

const config = {
	PORT: envLocal.PORT || process.env.PORT,
	DB_HOST: envLocal.DB_HOST || process.env.DB_HOST,
	DB_USER: envLocal.DB_USER || process.env.DB_USER,
	DB_PASS: envLocal.DB_PASS || process.env.DB_PASS,
	DB_NAME: envLocal.DB_NAME || process.env.DB_NAME,
	JWT_SECRET: envLocal.JWT_SECRET || process.env.JWT_SECRET,
	MAIL_HOST: envLocal.MAIL_HOST || process.env.MAIL_HOST,
	MAIL_USER: envLocal.MAIL_USER || process.env.MAIL_USER,
	MAIL_PASS: envLocal.MAIL_PASS || process.env.MAIL_PASS,
};

module.exports = config;
