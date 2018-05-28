const ParticipatesModel = require('../models/participatesModel');
const ActivityModel = require('../models/ActivityModel');
const transforms = require('./transforms');

const ParticipatesController = {

	async getParticipates(req, res) {
		const { userId } = req.token;
		const { activityId } = req.params;

		try {
			const isParticipant = ParticipatesModel.isParticipant(userId, activityId);
			const isPrivatePromise = ActivityModel.isPrivate(activityId);
			const member = await ParticipatesModel.getMemberOfActivity(activityId);
			const isPrivate = await isPrivatePromise;

			if (!await isParticipant && isPrivate) {
				res.status(404).json({
					message: 'Invalid activity id.',
				});
				return;
			}

			res.json(member.map(transforms.transformUser));
		} catch (error) {
			res.sendStatus(500);
		}
	},

	async addParticipation(req, res) {
		const { userId } = req.token;
		const { activityId } = req.params;
		let { participantId } = req.params;

		if (!participantId) participantId = userId;

		try {
			const isHost = ActivityModel.isHost(userId, activityId);
			const isPrivate = ActivityModel.isPrivate(activityId);
			const isParticipant = ParticipatesModel.isParticipant(participantId, activityId);

			if (!(Number(userId) === Number(participantId) && !await isPrivate) && !await isHost) {
				res.status(404).json({
					message: 'Activity not found.',
				});
				return;
			}

			if (await isParticipant) {
				res.json({
					message: 'Already joined.',
				});
				return;
			}

			const result = await ParticipatesModel.addParticipant(activityId, participantId);

			if (result.affectedRows === 1) {
				res.json({
					message: 'Participation successful.',
				});
			} else {
				res.status(404).json({
					message: 'Participation not possible.',
				});
			}
		} catch (error) {
			res.sendStatus(500);
		}
	},

	async deleteParticipation(req, res) {
		const { userId } = req.token;
		const { activityId } = req.params;
		let { participantId } = req.params;

		if (!participantId) participantId = userId;

		try {
			const isHost = ActivityModel.isHost(userId, activityId);

			if ((Number(userId) !== Number(participantId)) && !await isHost) {
				res.status(404).json({
					message: 'Activity not found.',
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
		} catch (error) {
			res.sendStatus(500);
		}
	},

};

module.exports = ParticipatesController;
