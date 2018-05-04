const SubscribeController = require('./SubscribeController');
const router = require('express').Router();


router.get('/', SubscribeController.getSubscribed);

router.post('/:id', SubscribeController.createSubscription);

router.delete('/:id', SubscribeController.deleteSubscription);


module.exports = router;
