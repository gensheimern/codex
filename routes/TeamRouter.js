const TeamController = require('./TeamController');
const router = require('express').Router();
const { asyncMiddleware } = require('./errorHandler');


router.get('/', asyncMiddleware(TeamController.getAllTeams));

router.get('/:teamId', asyncMiddleware(TeamController.getTeamById));

router.post('/', asyncMiddleware(TeamController.addTeam));

router.delete('/:teamId', asyncMiddleware(TeamController.deleteTeam));

router.put('/:teamId', asyncMiddleware(TeamController.updateTeam));


module.exports = router;
