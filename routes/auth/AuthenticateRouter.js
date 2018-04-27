const express = require('express');
const router = express.Router();
const AuthenticateController = require('./AuthenticateController');

/*
API to signup users and also to authenticate them. In the authenticate API
we will create a token for a successful login and send it to the client.
*/
router.post('/', AuthenticateController.authenticate);

module.exports = router;