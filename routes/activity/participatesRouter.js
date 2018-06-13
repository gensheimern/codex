const router = require('express').Router();
const participatesController = require('./participatesController');
const asyncMiddleware = require('../asyncMiddleware');
const myMiddleware = require('../../middleware/myMiddleware');


router.get('/:activityId/participants', asyncMiddleware(participatesController.getParticipates));

router.post('/:activityId/participants/:userId?', myMiddleware, asyncMiddleware(participatesController.addParticipation));

router.post('/:activityId/participants/?', myMiddleware, asyncMiddleware(participatesController.addParticipationArray));


router.delete('/:activityId/participants/:userId?', myMiddleware, asyncMiddleware(participatesController.deleteParticipation));


module.exports = router;
