const ActivityModel = require('../../models/ActivityModel');
const ParticipatesModel = require('../../models/participatesModel');
const NotificationModel = require('../../models/NotificationModel');
const UserModel = require('../../models/UserModel');
const transforms = require('../transforms');
const { validActivity } = require('./activityValidation');
const reminder = require('../../reminders');

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

		const activity = await ActivityModel.getActivityById(activityId);
		const userOrganization = await UserModel.getOrganization(userId);

		const isParticipant = await ParticipatesModel.isParticipant(userId, activityId);
		const isPrivate = await ActivityModel.isPrivate(activityId);

		if (!isParticipant && isPrivate) {
			res.status(403).json({
				message: 'Permission denied.',
			});
			return;
		}

		if (!isPrivate && activity.Organization !== userOrganization) {
			res.status(403).json({
				message: 'Permission denied.',
			});
			return;
		}

		if (activity === null) {
			res.status(404).json({
				message: 'Activity not found',
			});
		} else {
			res.json(transforms(userId).transformActivity(activity));
		}
	},

	async getActivityOfTeam(req, res) {
		const { userId } = req.token;
		const { teamId } = req.params;

		const activity = await ActivityModel.getActivityOfTeam(teamId);

		if (activity === null) {
			res.status(404).json({
				message: 'Activity not found',
			});
		} else {
			res.json(activity.map(transforms(userId).transformActivity));
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

		const organizationId = await UserModel.getOrganization(userId);

		const result = await ActivityModel.createActivity(activity, userId, organizationId);

		// Add invited participants
		let participantsAdded = 0;
		const { participants } = req.body;

		if (participants instanceof Array) {
			const { maxParticipants } = activity;

			if (participants.length >= maxParticipants && maxParticipants !== 0) {
				res.status(400).json({
					message: 'Too many participants.',
				});
			}

			participants.forEach(async (participantId) => {
				participantsAdded += 1;
				try {
					await ParticipatesModel.addParticipant(result.insertId, participantId, false);

					const user = await UserModel.getUserById(userId);

					await NotificationModel.addNotification(participantId, 'joinEvent', 'Event invitation', `${user.Firstname} ${user.Name} invited you to join the event '${activity.name}'.`, result.insertId);
				} catch (err) {
					participantsAdded -= 1;
				}
			});
		}

		// Add host
		await ParticipatesModel.addParticipant(result.insertId, userId, true);

		reminder.scheduleReminder(result.insertId);

		res.status(201).json({
			activityId: result.insertId,
			addedParticipants: participantsAdded,
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
