const ParticipatesModel = require('../../models/participatesModel');
const ActivityModel = require('../../models/ActivityModel');
const transforms = require('../transforms');

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

		res.json(member.map(transforms.transformUser));
	},

	async addParticipation(req, res) {
		const { userId } = req.token;
		const { activityId } = req.params;
		let participantId = req.params.userId;

		if (!participantId) participantId = userId;

		// TODO: Performance optimization
		const isHost = await ActivityModel.isHost(userId, activityId);
		const isPrivate = await ActivityModel.isPrivate(activityId);
		const isParticipant = await ParticipatesModel.isParticipant(participantId, activityId);

		const activityFull = await ActivityModel.isFull(activityId);

		if (isParticipant) {
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

		if (activityFull) {
			res.status(409).json({
				message: 'Activity has reached member limit.',
			});
			return;
		}

		const result = await ParticipatesModel.addParticipant(activityId, participantId);

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
		let participantId = req.params.userId;

		if (!participantId) participantId = userId;

		const isHost = ActivityModel.isHost(userId, activityId);

		if ((Number(userId) !== Number(participantId)) && !await isHost) {
			res.status(403).json({
				message: 'Permission denied.',
			});
			return;
		}

		const result = await ParticipatesModel.deleteParticipant(activityId, participantId);

		if (result.affectedRows === 1) {
			res.json({
				message: 'Participation successfully ended.',
			});
		} else {
			res.status(404).json({
				message: 'Participation deletion not possible.',
			});
		}
	},

};

module.exports = ParticipatesController;