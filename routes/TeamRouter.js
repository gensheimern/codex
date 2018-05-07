const TeamController = require('./TeamController');
const router = require('express').Router();


router.get('/', TeamController.getAllTeams);

router.get('/:teamId', TeamController.getTeamById);

router.post('/', TeamController.addTeam);

router.delete('/:teamId', TeamController.deleteTeam);

router.put('/:teamId', TeamController.updateTeam);


module.exports = router;
