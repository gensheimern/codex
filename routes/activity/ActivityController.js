const ActivityModel = require('../../models/ActivityModel');
const ParticipatesModel = require('../../models/participatesModel');
const NotificationModel = require('../../models/NotificationModel');
const transforms = require('../transforms');
const { validActivity } = require('./activityValidation');

const ActivityController = {

	async getAllActivities(req, res) {
		const { userId } = req.token;

		const activities = await ActivityModel.getAllActivities(userId);
		res.json(activities.map(transforms(userId).transformActivity));
	},

	async getJoinedActivities(req, res) {
		const { userId } = req.token;

		const activities = await ActivityModel.getJoinedActivities(userId);
		res.json(activities.map(transforms(userId).transformActivity));
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
			res.json(transforms(userId).transformActivity(activity));
		}
	},

	async createActivity(req, res) {
		const { userId } = req.token;
		const activity = req.body;

		if (!validActivity(activity)) {
			res.status(400).json({
				message: 'Invalid event information.',
			});
			return;
		}

		const result = await ActivityModel.createActivity(activity, userId);
		await ParticipatesModel.addParticipant(result.insertId, userId, true);

		res.status(201).json({
			activityId: result.insertId,
		});
	},

	async deleteActivity(req, res) {
		const { userId } = req.token;
		const { activityId } = req.params;

		// TODO: Check if user is admin of activity
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

		if (!validActivity(newActivity)) {
			res.status(400).json({
				message: 'Invalid event information.',
			});
			return;
		}

		// TODO: Check if user is admin of activity
		const isHost = await ActivityModel.isHost(userId, activityId);

		if (!isHost) {
			res.status(403).json({
				success: false,
				message: 'Activity not found.',
			});
			return;
		}

		const result = await ActivityModel.updateActivity(activityId, newActivity);

		NotificationModel.notifyEvent(activityId, 'notification', 'Event updated', `The event ${newActivity.name} changed.`, activityId, null);

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
