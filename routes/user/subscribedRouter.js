const SubscribeController = require('./SubscribeController');
const router = require('express').Router();
const asyncMiddleware = require('../asyncMiddleware');
const myMiddleware = require('../../middleware/myMiddleware');


router.get('/:userId/subscribed', myMiddleware, asyncMiddleware(SubscribeController.getSubscribed));

router.post('/:userId/subscribed/:subscribedId', myMiddleware, asyncMiddleware(SubscribeController.createSubscription));

router.delete('/:userId/subscribed/:subscribedId', myMiddleware, asyncMiddleware(SubscribeController.deleteSubscription));


module.exports = router;
