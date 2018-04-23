const Team = require('../models/TeamModel');

TeamController = {
	getAllTeams(req, res) {
		Team.getAllTeam(function(err, rows) {
			if (err) return res.sendStatus(500);
	
			res.json(rows);
		});
	},

	getTeamById(req, res) {
		Team.getTeamById(req.params.id, function(err, rows) {
			if (err) return res.sendStatus(500);
	
			if(rows.length === 0) {
				res.sendStatus(404);
			}
			else {
				res.json(rows[0]);
			}
		});
	},

	addTeam(req, res) {
		Team.addTeam(req.body, decoded.User_Id, function(err, count) {
			if (err) return res.sendStatus(500);

			res.status(201).json({
				Team_Id: count.insertId,
				Teamname: req.body.Teamname,
				Teammanager: decoded.User_Id
			});
		});
	},

	deleteTeam(req, res) {
		Team.deleteTeam(req.params.id, function(err, count) {
			if (err) return res.sendStatus(500);
			
			if(count.affectedRows === 0) {
				res.sendStatus(404);
			}
			else {
				res.sendStatus(200);
			}
		});
	},

	updateTeam(req, res) {
		Team.updateTeam(req.params.id, req.body, function(err, rows) {
			if (err) return res.sendStatus(500);
			
			if(rows.affectedRows === 0) {
				res.sendStatus(404);
			}
			else {
				res.sendStatus(200);
			}
		});
	}
}

module.exports = TeamController;