const Activity = require('../models/ActivityModel');
const jwt = require('jsonwebtoken');

ActivityController = {
	
	async getAllActivities(req, res) {
		const userId = req.token.User_Id;

		try {
			let activities = await Activity.getAllActivities(userId);

			res.json(activities);
		} catch (error) {
			res.sendStatus(500);
		}
	},

	async getActivityById(req, res) {
		const userId = req.token.User_Id;

		try {
			let result = await Activity.getActivityById(req.params.id, userId);

			if(result.length === 1) {
				res.json(result[0]);
			}
			else {
				res.statsus(404).json({
					message: "Activity not found"
				});
			}
		} catch (error) {
			res.sendStatus(500);
		}
	},

	async createActivity(req, res) {
		const userId = req.token.User_Id;
		const activity = req.body;

		try {
			let result = await Activity.createActivity(activity, userId);

			res.status(201).json({
				Activity_Id: result.insertId
			});
		} catch (error) {
			res.sendStatus(500);
		}
	},

	async deleteActivity(req, res) {
		const userId = req.token.User_Id;
		const activityId = req.params.id;

		try {
			// TODO Check if user is admin of activity
			let result = await Activity.deleteActivity(activityId, userId);

			if(result.affectedRows === 1) {
				res.json({
					success: true,
					message: "Activity successfully deleted."
				});
			}
			else {
				res.status(404).json({
					success: false,
					message: "Activity not found."
				});
			}
		} catch (error) {
			res.sendStatus(500);
		}
	},

	async updateActivity(req, res) {
		const userId = req.token.User_Id;
		const activityId = req.params.id;

		try {
			// TODO Check if user is admin of activity
			let result = await Activity.updateActivity(activityId, userId);

			if(result.affectedRows === 1) {
				res.json({
					success: true,
					message: "Activity successfully updated."
				});
			}
			else {
				res.status(404).json({
					success: false,
					message: "Activity not found."
				});
			}
		} catch (error) {
			res.sendStatus(500);
		}
	}

}

module.exports = ActivityController;