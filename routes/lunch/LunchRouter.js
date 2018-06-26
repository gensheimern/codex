const router = require('express').Router();
const LunchController = require('./LunchController');
const asyncMiddleware = require('../asyncMiddleware');


router.get('/', asyncMiddleware(LunchController.getAllLunch));

router.get('/joined', asyncMiddleware(LunchController.getJoinedLunch));

router.get('/:lunchId', asyncMiddleware(LunchController.getLunchById));

router.post('/', asyncMiddleware(LunchController.createLunch));

router.delete('/:lunchId', asyncMiddleware(LunchController.deleteLunch));

router.put('/:lunchId', asyncMiddleware(LunchController.updateLunch));


module.exports = router;
