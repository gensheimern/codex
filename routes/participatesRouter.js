const router = require('express').Router();
const participatesController = require('./participatesController');


router.get('/:id', participatesController.getParticipates);

router.post('/', participatesController.addParticipation);

router.delete('/', participatesController.deleteParticipation);


module.exports = router;
