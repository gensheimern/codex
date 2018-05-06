const router = require('express').Router();
const participatesController = require('./participatesController');


router.get('/', participatesController.getParticipates);

router.post('/:participantId', participatesController.addParticipation);

router.delete('/:participantId', participatesController.deleteParticipation);


module.exports = router;
