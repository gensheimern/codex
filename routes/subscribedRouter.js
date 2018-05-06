const SubscribeController = require('./SubscribeController');
const router = require('express').Router();


router.get('/', SubscribeController.getSubscribed);

router.post('/:subscribedId', SubscribeController.createSubscription);

router.delete('/:subscribedId', SubscribeController.deleteSubscription);


module.exports = router;
