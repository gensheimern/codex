const router = require('express').Router();
const participatesController = require('./participatesController');


router.get('/:activityId/participants', participatesController.getParticipates);

router.post('/:activityId/participants/:participantId?', participatesController.addParticipation);

router.delete('/:activityId/participants/:participantId?', participatesController.deleteParticipation);


module.exports = router;
