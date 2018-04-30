const Message = require('../models/MessageModel');

const MessageController = {
	
	async getMessagesOfActivity(req, res) {
		const userId = req.token.User_Id;
		const activityId = req.params.id

		try {
			let messages = await Message.getMessagesOfActivity(activityId, userId);

			res.json(messages);
		} catch (error) {
			res.sendStatus(500);
		}
	},

	async createMessage(req, res) {
		const userId = req.token.User_Id;
		const content = req.body.MessageContent;
		const activityId = req.body.Activity_Id;
		// TODO Check body
		
		try {
			// TODO Check if user is in activity
			let result = await Message.createMessage(content, activityId, userId);

			res.status(201).json({
				Message_Id: result.insertId
			});
		} catch (error) {
			res.sendStatus(500);
		}
	},

	async deleteMessage(req, res) {
		const userId = req.token.User_Id;
		const messageId = req.params.id;
		const isAdmin = req.token.admin;

		try {
			let result;
			if(admin)
				result = await Message.deleteMessageAdmin(messageId);
			else
				result = await Message.deleteMessage(messageId, userId);

			if(result.affectedRows === 1) {
				res.json({
					success: true,
					message: "Message successfully deleted."
				});
			}
			else {
				res.status(404).json({
					success: false,
					message: "Message not found."
				});
			}
		} catch (error) {
			res.sendStatus(500);
		}
	},

	async updateMessage(req, res) {
		const userId = req.token.User_Id;
		const messageId = req.params.id;
		const isAdmin = req.token.admin;
		const content = req.body.Messagecontent + " (Changed)";
		// TODO Check Message content

		try {
			let result;
			if(admin)
				result = await Message.updateMessageAdmin(messageId, content);
			else
				result = await Message.updateMessage(messageId, content, userId);

			if(result.affectedRows === 1) {
				res.json({
					success: true,
					message: "Message successfully updated."
				});
			}
			else {
				res.status(404).json({
					success: false,
					message: "Message not found."
				});
			}
		} catch (error) {
			res.sendStatus(500);
		}
	}

}

module.exports = MessageController;
