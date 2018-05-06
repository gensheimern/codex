const SubscribeController = require('./SubscribeController');
const router = require('express').Router();


router.get('/:userId/subscriber', SubscribeController.getSubscriber);


module.exports = router;
