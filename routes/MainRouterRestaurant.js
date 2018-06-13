const router = require('express').Router();
const restaurantRouter = require('./restaurant/RestaurantRouter');
const lunchRouter = require('./lunch/LunchRouter');


router.use('/lunch', lunchRouter);
router.use('/', restaurantRouter);


router.use('*', (req, res) => {
	res.status(404).json({
		message: 'Invalid api route.',
	});
});


module.exports = router;
