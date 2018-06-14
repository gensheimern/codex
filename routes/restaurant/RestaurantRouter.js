const RestaurantController = require('./RestaurantController');
const router = require('express').Router();
const asyncMiddleware = require('../asyncMiddleware');
const myMiddleware = require('../../middleware/myMiddleware');
const UploadController = require('../upload/UploadController');


router.get('/', asyncMiddleware(RestaurantController.getAllRestaurants));

router.get('/:RestaurantId', myMiddleware, asyncMiddleware(RestaurantController.getRestaurantById));

router.post('/', asyncMiddleware(RestaurantController.addRestaurant));

router.delete('/:RestaurantId', myMiddleware, asyncMiddleware(RestaurantController.deleteRestaurant));

router.put('/:RestaurantId', myMiddleware, asyncMiddleware(RestaurantController.updateRestaurant));


module.exports = router;
