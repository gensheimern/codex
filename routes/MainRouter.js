const router = require('express').Router();

const teamRouter = require('./TeamRouter');
const userRouter = require('./UserRouter');
const messageRouter = require('./MessageRouter');
const activityRouter = require('./ActivityRouter');
const subscribedRouter = require('./subscribedRouter');
const subscriberRouter = require('./SubscriberRouter');
const participatesRouter = require('./participatesRouter');
const memberRouter = require('./memberRouter');

/* router.use('/team', teamRouter);
router.use('/user', userRouter);
router.use('/message',  messageRouter);
router.use('/activity', activityRouter);
router.use('/subscribed', subscribedRouter);
router.use('/subscriber', subscriberRouter)
router.use('/participates',participatesRouter);
router.use('/member', memberRouter); */

router.use('/team/:teamId/member', memberRouter);
router.use('/team', teamRouter);

router.use('/user/:userId/subscribed', subscribedRouter);
router.use('/user/:userId/subscriber', subscriberRouter);
router.use('/user', userRouter);

router.use('/activity/:activityId/participants', participatesRouter);
router.use('/activity/:activityId/message', messageRouter);
router.use('/activity', activityRouter);


module.exports = router;