const router = require('express').Router();

const teamRouter =			require('./team/TeamRouter');
const memberRouter =		require('./team/memberRouter');
const subscribedRouter = 	require('./user/subscribedRouter');
const subscriberRouter = 	require('./user/SubscriberRouter');
const notificationRouter =	require('./user/NotificationRouter');
const orgaMngtRouter =		require('./user/OrganizationRouter');
const userRouter = 			require('./user/UserRouter');
const participatesRouter = 	require('./activity/participatesRouter');
const messageRouter = 		require('./activity/MessageRouter');
const activityRouter = 		require('./activity/ActivityRouter');
const partOfRouter =		require('./organization/PartOfRouter');
const organizationRouter =	require('./organization/OrganizationRouter');
const email = require('./mailservice/mailservice');

router.use('/sendmail', email);

// Team routes
router.use('/team', memberRouter);
router.use('/team', teamRouter);

// User routes
router.use('/user', subscribedRouter);
router.use('/user', subscriberRouter);
router.use('/user', notificationRouter);
router.use('/user', orgaMngtRouter);
router.use('/user', userRouter);

// Event routes
router.use('/activity', participatesRouter);
router.use('/activity', messageRouter);
router.use('/activity', activityRouter);

// Organization routes
router.use('/organization', partOfRouter);
router.use('/organization', organizationRouter);


// Default if route not found
router.use('*', (req, res) => {
	res.status(404).json({
		message: 'Invalid api route.',
	});
});


module.exports = router;
