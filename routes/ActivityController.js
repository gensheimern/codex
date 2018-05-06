const ActivityModel = require('../models/ActivityModel');
const ParticipatesModel = require('../models/participatesModel');
const transforms = require('./transforms');

const ActivityController = {

	async getAllActivities(req, res) {
		const { userId } = req.token;

		try {
			const activities = await ActivityModel.getAllActivities(userId);

			res.json(activities.map(transforms.transformActivity));
		} catch (error) {
			res.sendStatus(500);
		}
	},

	async getActivityById(req, res) {
		const { userId } = req.token;
		const { activityId } = req.params;

		try {
			const activityPromise = ActivityModel.getActivityById(activityId);

			const isParticipant = await ParticipatesModel.isParticipant(userId, activityId);

			if (!isParticipant) {
				res.status(404).json({
					message: 'Activity not found.',
				});
				return;
			}

			const activity = await activityPromise;

			if (activity === null) {
				res.statsus(404).json({
					message: 'Activity not found',
				});
			} else {
				res.json(transforms.transformActivity(activity));
			}
		} catch (error) {
			res.sendStatus(500);
		}
	},

	async createActivity(req, res) {
		const { userId } = req.token;
		const activity = req.body;
		// TODO check body

		try {
			const result = await ActivityModel.createActivity(activity, userId);
			// TODO add participation of initiator

			res.status(201).json({
				activityId: result.insertId,
			});
		} catch (error) {
			res.sendStatus(500);
		}
	},

	async deleteActivity(req, res) {
		const { userId } = req.token;
		const { activityId } = req.params;

		try {
			// TODO Check if user is admin of activity
			const isHost = await ActivityModel.isHost(userId, activityId);

			if (!isHost) {
				res.status(403).json({
					success: false,
					message: 'Invalid activity id.',
				});
				return;
			}

			const result = await ActivityModel.deleteActivity(activityId, userId);

			if (result.affectedRows === 1) {
				res.json({
					success: true,
					message: 'Activity successfully deleted.',
				});
			} else {
				res.status(404).json({
					success: false,
					message: 'Activity not found.',
				});
			}
		} catch (error) {
			res.sendStatus(500);
		}
	},

	async updateActivity(req, res) {
		const { userId } = req.token;
		const { activityId } = req.params;

		try {
			// TODO Check if user is admin of activity
			const isHost = await ActivityModel.isHost(userId, activityId);

			if (!isHost) {
				res.status(403).json({
					success: false,
					message: 'Activity not found.',
				});
				return;
			}

			const result = await ActivityModel.updateActivity(activityId, userId);

			if (result.affectedRows === 1) {
				res.json({
					success: true,
					message: 'Activity successfully updated.',
				});
			} else {
				res.status(404).json({
					success: false,
					message: 'Activity not found.',
				});
			}
		} catch (error) {
			res.sendStatus(500);
		}
	},

};

module.exports = ActivityController;
