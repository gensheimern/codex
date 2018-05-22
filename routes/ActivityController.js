const ActivityModel = require('../models/ActivityModel');
const ParticipatesModel = require('../models/participatesModel');
const transforms = require('./transforms');

const ActivityController = {

	async getAllActivities(req, res) {
		const { userId } = req.token;

		const activities = await ActivityModel.getAllActivities(userId);
		res.json(activities.map(transforms.transformActivity));
	},

	async getActivityById(req, res) {
		const { userId } = req.token;
		const { activityId } = req.params;

		const activityPromise = ActivityModel.getActivityById(activityId);

		const isParticipant = await ParticipatesModel.isParticipant(userId, activityId);
		const isPrivate = await ActivityModel.isPrivate(activityId);

		if (!isParticipant && isPrivate) {
			res.status(403).json({
				message: 'Permission denied.',
			});
			return;
		}

		const activity = await activityPromise;

		if (activity === null) {
			res.status(404).json({
				message: 'Activity not found',
			});
		} else {
			res.json(transforms.transformActivity(activity));
		}
	},

	async createActivity(req, res) {
		const { userId } = req.token;
		const activity = req.body;
		// TODO check body
		// TODO: 2018-04-20 12:34:18 as time

		const result = await ActivityModel.createActivity(activity, userId);
		await ParticipatesModel.addParticipant(result.insertId, userId);

		res.status(201).json({
			activityId: result.insertId,
		});
	},

	async deleteActivity(req, res) {
		const { userId } = req.token;
		const { activityId } = req.params;

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
	},

	async updateActivity(req, res) {
		const { userId } = req.token;
		const { activityId } = req.params;
		const newActivity = req.body;
		// TODO: Check body

		// TODO Check if user is admin of activity
		const isHost = await ActivityModel.isHost(userId, activityId);

		if (!isHost) {
			res.status(403).json({
				success: false,
				message: 'Activity not found.',
			});
			return;
		}

		const result = await ActivityModel.updateActivity(activityId, newActivity);

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
	},

};

module.exports = ActivityController;
