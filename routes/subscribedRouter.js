const SubscribeController = require('./SubscribeController');
const router = require('express').Router();
const { asyncMiddleware } = require('./errorHandler');


router.get('/:userId/subscribed', asyncMiddleware(SubscribeController.getSubscribed));

router.post('/:userId/subscribed/:subscribedId', asyncMiddleware(SubscribeController.createSubscription));

router.delete('/:userId/subscribed/:subscribedId', asyncMiddleware(SubscribeController.deleteSubscription));


module.exports = router;
