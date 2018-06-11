
const express = require('express');
const mailer = require('express-mailer');
const config = require('../../config');


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

router.post('/', (req, res) => {
	app.mailer.send('notification', {
		to: req.body.email, // REQUIRED. Can be a comma delimited string just like a normal email field.
		subject: req.body.subject,
		event: req.body.event,
		time: req.body.time,
		action: req.body.action,
		user: req.body.user,
	}, (err) => {
		if (err) {
			// handle error
			res.status(400).json({
				message: 'There was an error. Email couldnt be sent',
			});
			return;
		}
		res.status(200).json({
			message: 'Email sent.',
		});
	});
});

router.post('/joinevent', (req, res) => {
	app.mailer.send('joinEvent', {
		to: req.body.email, // REQUIRED. Can be a comma delimited string just like a normal email field.
		subject: `Invitation to ${req.body.event}`,
		event: req.body.event,
		time: req.body.time,
		action: 'Invitation',
	}, (err) => {
		if (err) {
			// handle error
			res.status(400).json({
				message: 'There was an error. Email couldnt be sent',
			});
			return;
		}
		res.status(200).json({
			message: 'Email sent.',
		});
	});
});

router.post('/joingroup', (req, res) => {
	app.mailer.send('joinGroup', {
		to: req.body.email, // REQUIRED. Can be a comma delimited string just like a normal email field.
		subject: req.body.subject,
		group: req.body.group,
		time: req.body.time,
		action: 'invites',
		user: req.body.user,
	}, (err) => {
		if (err) {
			// handle error
			res.status(400).json({
				message: 'There was an error. Email couldnt be sent',
			});
			return;
		}
		res.status(200).json({
			message: 'Email sent.',
		});
	});
});

module.exports = router;
