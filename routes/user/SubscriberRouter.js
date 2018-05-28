const SubscribeController = require('./SubscribeController');
const router = require('express').Router();
const asyncMiddleware = require('../asyncMiddleware');
const myMiddleware = require('../../middleware/myMiddleware');


router.get('/:userId/subscriber', myMiddleware, asyncMiddleware(SubscribeController.getSubscriber));


module.exports = router;
