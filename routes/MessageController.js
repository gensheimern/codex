const Message = require('../models/MessageModel');
const ParticipatesModel = require('../models/participatesModel');
const transforms = require('./transforms');

const MessageController = {

	async getMessagesOfActivity(req, res) {
		const { userId } = req.token;
		const { activityId } = req.params;

		const messagesPromise = Message.getMessagesOfActivity(activityId);
		const isParticipant = await ParticipatesModel.isParticipant(userId, activityId);

		if (!isParticipant) {
			res.status(404).json({
				message: 'Activity not found.',
			});
			return;
		}

		const messages = await messagesPromise;

		res.json(messages.map(transforms.transformMessage));
	},

	async createMessage(req, res) {
		const { userId } = req.token;
		const { activityId } = req.params;
		const { content } = req.body;
		// TODO Check body

		const isParticipant = await ParticipatesModel.isParticipant(userId, activityId);

		if (!isParticipant) {
			res.status(404).json({
				message: 'Activity not found.',
			});
			return;
		}

		const result = await Message.createMessage(content, activityId, userId);

		res.status(201).json({
			messageId: result.insertId,
		});
	},

	async deleteMessage(req, res) {
		const { userId } = req.token;
		const { messageId } = req.params;

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
	},

	async updateMessage(req, res) {
		const { userId } = req.token;
		const { messageId } = req.params;
		const content = `${req.body.content} (Changed)`;
		// TODO Check Message content

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
	},

};

module.exports = MessageController;
