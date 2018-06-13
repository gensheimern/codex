const router = require('express').Router();
const restaurantRouter = require('./restaurant/RestaurantRouter');



router.use('/restaurant', restaurantRouter);


router.use('*', (req, res) => {
	res.status(404).json({
		message: 'Invalid api route.',
	});
});


module.exports = router;
