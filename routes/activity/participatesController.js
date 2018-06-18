const ParticipatesModel = require('../../models/participatesModel');
const ActivityModel = require('../../models/ActivityModel');
const NotificationModel = require('../../models/NotificationModel');
const UserModel = require('../../models/UserModel');
const transforms = require('../transforms');
const LiveSync = require('../LiveSync');

const ParticipatesController = {

	async getParticipates(req, res) {
		const { userId } = req.token;
		const { activityId } = req.params;

		// TODO: Performance optimisation
		const isPrivatePromise = await ActivityModel.isPrivate(activityId);
		const isParticipantPromise = await ParticipatesModel.isParticipant(userId, activityId);
		const member = await ParticipatesModel.getMemberOfActivity(activityId, userId);
		const isPrivate = await isPrivatePromise;
		const isParticipant = await isParticipantPromise;

		if (isPrivate && !isParticipant) {
			res.status(404).json({
				message: 'Activity not found.',
			});
			return;
		}

		res.json(member.map(transforms(userId).transformUser));
	},

	async addParticipation(req, res) {
		const { userId } = req.token;
		const { activityId } = req.params;
		const participantId = req.params.userId || userId;

		// TODO: Performance optimization
		const isHost = await ActivityModel.isHost(userId, activityId);
		const isPrivate = await ActivityModel.isPrivate(activityId);
		const isParticipant = await ParticipatesModel.isParticipant(participantId, activityId);

		const activityFull = await ActivityModel.isFull(activityId);

		if (isParticipant && (Number(userId) === Number(participantId) || isHost)) {
			res.json({
				message: 'Already joined.',
			});
			return;
		}

		if ((isPrivate && !isHost)
		|| (Number(userId) !== Number(participantId) && !isHost)) {
			res.status(403).json({
				message: 'Permission denied.',
			});
			return;
		}

		const activity = await ActivityModel.getActivityById(activityId);
		const ActivityOrganization = activity.Organization;
		const UserOrganization = await UserModel.getOrganization(userId);

		if (!isPrivate && !isHost && ActivityOrganization !== UserOrganization) {
			res.status(403).json({
				message: 'Permission denied',
			});
			return;
		}

		if (activityFull) {
			res.status(409).json({
				message: 'Activity has reached member limit.',
			});
			return;
		}

		const result = await ParticipatesModel.addParticipant(
			activityId,
			participantId,
			Number(userId) === Number(participantId),
		);

		LiveSync.personalChanged(userId);
		LiveSync.participantsChanged(activityId);

		if (userId !== participantId) {
			await NotificationModel.addNotification(participantId, 'joinEvent', 'Event invitation', `You are invited to join the event '${activity.Activityname}'.`, activityId);
		}

		const user = await UserModel.getUserById(userId);
		NotificationModel.notifyEvent(activityId, 'notification', `New participant '${user.Firstname} ${user.Name}'`, `'${user.Firstname} ${user.Name}' joined your event '${activity.Activityname}'.`, activityId, participantId)
			.catch(() => {});

		if (result.affectedRows === 1) {
			res.status(201).json({
				message: 'Participation successful added.',
			});
		} else {
			res.status(400).json({
				message: 'Participation not possible.',
			});
		}
	},

	async deleteParticipation(req, res) {
		const { userId } = req.token;
		const { activityId } = req.params;
		const participantId = req.params.userId || userId;

		const isHost = await ActivityModel.isHost(userId, activityId);

		if ((Number(userId) !== Number(participantId)) && !isHost) {
			res.status(403).json({
				message: 'Permission denied.',
			});
			return;
		}

		const result = await ParticipatesModel.deleteParticipant(activityId, participantId);

		LiveSync.personalChanged(userId);
		LiveSync.participantsChanged(activityId);

		if (result.affectedRows !== 1) {
			res.status(404).json({
				message: 'Participation deletion not possible.',
			});
			return;
		}

		const activity = await ActivityModel.getActivityById(activityId);
		const user = await UserModel.getUserById(userId);
		NotificationModel.notifyEvent(activityId, 'notification', `'${user.Firstname} ${user.Name}' left`, `'${user.Firstname} ${user.Name}' left your event '${activity.Activityname}'.`, activityId, null)
			.catch(() => {});

		res.json({
			message: 'Participation successfully ended.',
		});
	},

};

module.exports = ParticipatesController;
