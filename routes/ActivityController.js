const Activity = require('../models/ActivityModel');
const jwt = require('jsonwebtoken');

ActivityController = {
	
	getAllActivities(req, res) {
		Activity.getAllActivities(function(err, rows) {
			if (err) return res.json(err);
			
			res.json(rows);
		});
	},

	getActivityById(req, res, next) {
		Activity.getActivityById(req.params.id, function(err, rows) {
			if (err) return res.json(err);

			count.affectedRows === 0 ? res.sendStatus(404) : res.json(rows[0]);
		});
	},

	addActivity(req, res) {

		var token = req.headers['x-access-token'];
		var decoded = jwt.decode(token, 'secret');
	
		Activity.addActivity(req.body, decoded.User_Id, function(err, count) {
			if (err) return res.json(err);

			res.status(201).json({
				Activity_Id: count.insertId
			});
		});
	},

	deleteActivity(req, res) {
		Activity.deleteActivity(req.params.id, function(err, count) {
			if (err) return res.json(err);

			count.affectedRows === 0 ? res.sendStatus(404) : res.sendStatus(200);
		});
	},

	updateActivity(req, res) {
		Activity.updateActivity(req.params.id, function(err, count) {
			if (err) return res.json(err);

			count.affectedRows === 0 ? res.sendStatus(404) : res.sendStatus(200);
		});
	}

}

module.exports = ActivityController;