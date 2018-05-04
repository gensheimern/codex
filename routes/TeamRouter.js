const TeamController = require('./TeamController');
const router = require('express').Router();


router.get('/', TeamController.getAllTeams);

router.get('/:id', TeamController.getTeamById);

router.post('/', TeamController.addTeam);

router.delete('/:id', TeamController.deleteTeam);

router.put('/:id', TeamController.updateTeam);


module.exports = router;
