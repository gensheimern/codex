const router = require('express').Router();
const AuthenticateController = require('./AuthenticateController');
const asyncMiddleware = require('../asyncMiddleware');

/*
API to signup users and also to authenticate them. In the authenticate API
we will create a token for a successful login and send it to the client.
*/
router.post('/', asyncMiddleware(AuthenticateController.authenticate));

module.exports = router;
