
const express = require('express');
const mailer = require('express-mailer');
const config = require('../config');

const app = express();

app.set('views', `${__dirname}/mailservice/views`);
app.set('view engine', 'jade');

mailer.extend(app, {
	from: 'support@codex-team.de',
	host: config.MAIL_HOST, // hostname
	secureConnection: true, // use SSL
	port: 465, // port for secure SMTP
	transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
	auth: {
		user: config.MAIL_USER,
		pass: config.MAIL_PASS,
	},
});

const mail = {
	async sendReminderMail(to, subject, eventName, eventTime, eventUrl) {
		return new Promise((resolve, reject) => {
			app.mailer.send('reminder', {
				to,
				subject,
				eventName,
				eventTime,
				eventUrl,
			}, (err) => {
				if (err) {
					reject(err);
					return;
				}
				resolve('E-Mail reminder sent');
			});
		});
	},
};

module.exports = mail;
