const router = require('express').Router();
const ActivityController = require('./ActivityController');
const asyncMiddleware = require('../asyncMiddleware');


router.get('/', asyncMiddleware(ActivityController.getAllActivities));

router.get('/joined', asyncMiddleware(ActivityController.getJoinedActivities));

router.get('/:activityId', asyncMiddleware(ActivityController.getActivityById));

router.get('/teamid/:teamId', asyncMiddleware(ActivityController.getActivityOfTeam));

router.post('/', asyncMiddleware(ActivityController.createActivity));

router.delete('/:activityId', asyncMiddleware(ActivityController.deleteActivity));

router.put('/:activityId', asyncMiddleware(ActivityController.updateActivity));


module.exports = router;
