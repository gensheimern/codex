const Message = require('../models/MessageModel');
const ParticipatesModel = require('../models/participatesModel');
const ActivityModel = require('../models/ActivityModel');
const transforms = require('./transforms');

const MessageController = {

	async getMessagesOfActivity(req, res) {
		const { userId } = req.token;
		const { activityId } = req.params;

		try {
			const isPrivatePromise = ActivityModel.isPrivate(activityId);
			const messagesPromise = Message.getMessagesOfActivity(activityId);
			const isParticipant = await ParticipatesModel.isParticipant(userId, activityId);
			const isPrivate = await isPrivatePromise;

			if (!isParticipant && isPrivate) {
				res.status(404).json({
					message: 'Activity not found.',
				});
				return;
			}

			const messages = await messagesPromise;

			res.json(messages.map(transforms.transformMessage));
		} catch (error) {
			res.sendStatus(500);
		}
	},

	async createMessage(req, res) {
		const { userId } = req.token;
		const { activityId } = req.params;
		const { content } = req.body;
		// TODO Check body

		try {
			const isPrivatePromise = ActivityModel.isPrivate(activityId);
			const isParticipant = await ParticipatesModel.isParticipant(userId, activityId);
			const isPrivate = await isPrivatePromise;

			if (!isParticipant && isPrivate) {
				res.status(404).json({
					message: 'Activity not found.',
				});
				return;
			}

			const result = await Message.createMessage(content, activityId, userId);

			res.status(201).json({
				messageId: result.insertId,
			});
		} catch (error) {
			res.sendStatus(500);
		}
	},

	async deleteMessage(req, res) {
		const { userId } = req.token;
		const { messageId } = req.params;

		try {
			// TODO check for admin
			const result = await Message.deleteMessage(messageId, userId);

			if (result.affectedRows === 1) {
				res.json({
					success: true,
					message: 'Message successfully deleted.',
				});
			} else {
				res.status(404).json({
					success: false,
					message: 'Message not found.',
				});
			}
		} catch (error) {
			res.sendStatus(500);
		}
	},

	async updateMessage(req, res) {
		const { userId } = req.token;
		const { messageId } = req.params;
		const content = `${req.body.content} (Changed)`;
		// TODO Check Message content

		try {
			// TODO check for admin
			const result = await Message.updateMessage(messageId, content, userId);

			if (result.affectedRows === 1) {
				res.json({
					success: true,
					message: 'Message successfully updated.',
				});
			} else {
				res.status(404).json({
					success: false,
					message: 'Message not found.',
				});
			}
		} catch (error) {
			res.sendStatus(500);
		}
	},

};

module.exports = MessageController;
