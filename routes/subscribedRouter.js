const SubscribeController = require('./SubscribeController');
const router = require('express').Router();


router.get('/:userId/subscribed', SubscribeController.getSubscribed);

router.post('/:userId/subscribed/:subscribedId', SubscribeController.createSubscription);

router.delete('/:userId/subscribed/:subscribedId', SubscribeController.deleteSubscription);


module.exports = router;
