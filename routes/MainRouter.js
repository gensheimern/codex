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

router.use('/team', memberRouter);
router.use('/team', teamRouter);

router.use('/user', subscribedRouter);
router.use('/user', subscriberRouter);
router.use('/user', userRouter);

router.use('/activity', participatesRouter);
router.use('/activity', messageRouter);
router.use('/activity', activityRouter);

router.use('*', (req, res) => {
	res.status(404).json({
		message: 'Invalid path.',
	});
});


module.exports = router;
