const SubscribeController = require('./SubscribeController');
const router = require('express').Router();
const { asyncMiddleware } = require('./errorHandler');


router.get('/:userId/subscriber', asyncMiddleware(SubscribeController.getSubscriber));


module.exports = router;
