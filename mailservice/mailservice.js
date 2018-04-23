
 const express = require('express');
 const app = express();
 mailer = require('express-mailer');
 var router = express.Router();
 var jwt = require('jsonwebtoken');

 app.set('views', __dirname + '/views');
 app.set('view engine', 'jade');

mailer.extend(app, {
  from: 'support@codex-team.de',
  host: '159.65.115.221', // hostname
  secureConnection: true, // use SSL
  port: 465, // port for secure SMTP
  transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
  auth: {
    user: 'support@codex-team.de',
    pass: 'teamcodex123'
  }
});

router.get('/', function (req, res, next) {
  app.mailer.send('email', {
    to: 'info@initiumit.de', // REQUIRED. This can be a comma delimited string just like a normal email to field.
    subject: 'Test Email', // REQUIRED.
    otherProperty: 'Other Property' // All additional properties are also passed to the template as local variables.
  }, function (err) {
    if (err) {
      // handle error
      console.log(err);
      res.send('There was an error sending the email');
      return;
    }
    res.send('Email Sent');
  });
});



module.exports = router;
