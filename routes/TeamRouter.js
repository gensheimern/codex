var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var Team = require('../models/TeamModel');

router.get('/:id?', function(req, res, next) {

	if (req.params.id) {
		Team.getTeamById(req.params.id, function(err, rows) {
			if (err) {
				res.sendStatus(500);
			} else {
				if(rows.length === 0) {
					res.sendStatus(404);
				}
				else {
					res.json(rows[0]);
				}
			}
		});
	} else {
		Team.getAllTeam(function(err, rows) {
			if (err) {
				res.sendStatus(500);
			} else {
				res.json(rows);
			}

		});
	}
});

router.post('/', function(req, res, next) {

	var token = req.headers['x-access-token'];
	var decoded = jwt.decode(token, 'secret');

	Team.addTeam(req.body, decoded.User_Id, function(err, count) {

		if (err) {
			res.sendStatus(500);
		} else {
			res.status(201).json({
				Team_Id: count.insertId,
				Teamname: req.body.Teamname,
				Teammanager: decoded.User_Id
			});
		}
	});
});


router.delete('/:id', function(req, res, next) {

	Team.deleteTeam(req.params.id, function(err, count) {
		if (err) {
			res.sendStatus(500);
		} else {
			if(count.affectedRows === 0) {
				res.sendStatus(404);
			}
			else {
				res.sendStatus(200);
			}
		}
	});
});

router.put('/:id', function(req, res, next) {

	Team.updateTeam(req.params.id, req.body, function(err, rows) {

		if (err) {
			res.sendStatus(500);
		} else {
			if(rows.affectedRows === 0) {
				res.sendStatus(404);
			}
			else {
				res.sendStatus(200);
			}
		}
	});
});

module.exports = router;