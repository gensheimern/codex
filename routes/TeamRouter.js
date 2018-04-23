const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const TeamController = require('./TeamController');


router.get('/', TeamController.getAllTeams);

router.get('/:id', TeamController.getTeamById);

router.post('/', TeamController.addTeam);

router.delete('/:id', TeamController.deleteTeam);

router.put('/:id', TeamController.updateTeam);


module.exports = router;