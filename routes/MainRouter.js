const router = require('express').Router();

const teamRouter =			require('./team/TeamRouter');
const memberRouter =		require('./team/memberRouter');
const subscribedRouter = 	require('./user/subscribedRouter');
const subscriberRouter = 	require('./user/SubscriberRouter');
const notificationRouter =	require('./user/NotificationRouter');
const userRouter = 			require('./user/UserRouter');
//const restaurantRouter = 			require('./restaurant/RestaurantRouter');

const participatesRouter = 	require('./activity/participatesRouter');
const messageRouter = 		require('./activity/MessageRouter');
const activityRouter = 		require('./activity/ActivityRouter');
const email = require('./mailservice/mailservice');

router.use('/sendmail', email);

router.use('/team', memberRouter);
router.use('/team', teamRouter);

router.use('/user', subscribedRouter);
router.use('/user', subscriberRouter);
router.use('/user', notificationRouter);
router.use('/user', userRouter);

//router.use('/restaurant', restaurantRouter);


router.use('/activity', participatesRouter);
router.use('/activity', messageRouter);
router.use('/activity', activityRouter);


router.use('*', (req, res) => {
	res.status(404).json({
		message: 'Invalid api route.',
	});
});


module.exports = router;
