const express = require('express');
const router = express.Router();
const SubscribeController = require('./SubscribeController');


router.get('/', SubscribeController.getSubscribed);

router.post('/:id', SubscribeController.createSubscription);

router.delete('/:id', SubscribeController.deleteSubscription);


module.exports = router;