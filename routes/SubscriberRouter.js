const SubscribeController = require('./SubscribeController');
const router = require('express').Router();


router.get('/', SubscribeController.getSubscriber);


module.exports = router;
