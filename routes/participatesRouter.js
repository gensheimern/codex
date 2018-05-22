const router = require('express').Router();
const participatesController = require('./participatesController');
const { asyncMiddleware } = require('./errorHandler');


router.get('/:activityId/participants', asyncMiddleware(participatesController.getParticipates));

router.post('/:activityId/participants/:participantId?', asyncMiddleware(participatesController.addParticipation));

router.delete('/:activityId/participants/:participantId?', asyncMiddleware(participatesController.deleteParticipation));


module.exports = router;
