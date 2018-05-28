const router = require('express').Router();
const ActivityController = require('./ActivityController');


router.get('/', ActivityController.getAllActivities);

router.get('/:activityId', ActivityController.getActivityById);

router.post('/', ActivityController.createActivity);

router.delete('/:activityId', ActivityController.deleteActivity);

router.put('/:activityId', ActivityController.updateActivity);


module.exports = router;
