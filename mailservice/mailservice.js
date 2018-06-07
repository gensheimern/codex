
const express = require('express');
const mailer = require('express-mailer');
const config = require('../config');


const app = express();
const router = express.Router();

app.set('views', `${__dirname}/views`);
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

router.get('/', (req, res) => {
	app.mailer.send('email', {
		to: 'info@initiumit.de', // REQUIRED. This can be a comma delimited string just like a normal email to field.
		subject: 'Test Email', // REQUIRED.
		otherProperty: 'Other Property', // All additional properties are also passed to the template as local variables.
	}, (err) => {
		if (err) {
			// handle error
			res.send('There was an error sending the email');
			return;
		}
		res.send('Email Sent');
	});
});


module.exports = router;
