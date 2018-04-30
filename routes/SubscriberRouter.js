const express = require('express');
const router = express.Router();
const SubscribeController = require('./SubscribeController');


router.get('/', SubscribeController.getSubscriber);


module.exports = router;