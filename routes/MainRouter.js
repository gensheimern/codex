const express = require('express');
const router = express.Router();

const teamRouter = require('./TeamRouter');
const userRouter = require('./UserRouter');
const messageRouter = require('./MessageRouter');
const activityRouter = require('./ActivityRouter');
const subscribedRouter = require('./subscribedRouter');
const subscriberRouter = require('./subscriberRouter');
const participatesRouter = require('./participatesRouter');
const memberRouter = require('./memberRouter');

router.use('/team', teamRouter);
router.use('/user', userRouter);
router.use('/message',  messageRouter);
router.use('/activity', activityRouter);
router.use('/subscribed', subscribedRouter);
router.use('/subscriber', subscriberRouter)
router.use('/participates',participatesRouter);
router.use('/member', memberRouter);


module.exports = router;