const Message = require('../../models/MessageModel');
const ParticipatesModel = require('../../models/participatesModel');
const ActivityModel = require('../../models/ActivityModel');
const transforms = require('../transforms');
const { validMessage } = require('./messageValidation');
const LiveSync = require('../LiveSync');

const MessageController = {

	async getMessagesOfActivity(req, res) {
		const { userId } = req.token;
		const { activityId } = req.params;

		const messagesPromise = Message.getMessagesOfActivity(activityId);
		const isParticipant = await ParticipatesModel.isParticipant(userId, activityId);
		const isPrivate = await ActivityModel.isPrivate(activityId);

		if (!isParticipant && isPrivate) {
			res.status(404).json({
				message: 'Activity not found.',
			});
			return;
		}

		const messages = await messagesPromise;

		res.json(messages.map(transforms(userId).transformMessage));
	},

	async createMessage(req, res) {
		const { userId } = req.token;
		const { activityId } = req.params;
		const { content } = req.body;

		if (!validMessage(content)) {
			res.status(400).json({
				message: 'Invalid message content.',
			});
			return;
		}

		const isPrivate = await ActivityModel.isPrivate(activityId);
		const isParticipant = await ParticipatesModel.isParticipant(userId, activityId);

		if (!isParticipant && isPrivate) {
			res.status(404).json({
				message: 'Activity not found.',
			});
			return;
		}

		const result = await Message.createMessage(content, activityId, userId);

		LiveSync.messageChanged(activityId);

		res.status(201).json({
			messageId: result.insertId,
		});
	},

	async deleteMessage(req, res) {
		const { userId } = req.token;
		const { messageId } = req.params;

		const message = await Message.getMessageById(messageId);

		if (userId !== message.User_Id) {
			res.status(403).json({
				success: false,
				message: 'You can only delete your own messages.',
			});
			return;
		}

		// TODO check for admin
		const result = await Message.deleteMessage(messageId, userId);

		LiveSync.messageChanged(message.Activity_Id);

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

		if (!validMessage(content)) {
			res.status(400).json({
				message: 'Invalid message content.',
			});
			return;
		}

		const message = await Message.getMessageById(messageId);

		if (userId !== message.User_Id) {
			res.status(403).json({
				success: false,
				message: 'You can only delete your own messages.',
			});
			return;
		}

		const result = await Message.updateMessage(messageId, content, userId);

		LiveSync.messageChanged(message.Activity_Id);

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
