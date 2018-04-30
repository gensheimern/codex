const express = require('express');
const router = express.Router();
const ActivityController = require('./ActivityController');


router.get('/', ActivityController.getAllActivities);

router.get('/:id', ActivityController.getActivityById);

router.post('/', ActivityController.createActivity);

router.delete('/:id', ActivityController.deleteActivity);

router.put('/:id', ActivityController.updateActivity);


module.exports = router;