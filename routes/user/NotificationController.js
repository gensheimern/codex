const NotificationModel = require('../../models/NotificationModel');
const transforms = require('../transforms');

const NotificationController = {

	async getNotifications(req, res) {
		const { userId } = req.token;
		const targetId = req.params.userId;

		if (Number(userId) !== Number(targetId)) {
			res.status(403).json({
				message: 'Invalid user id.',
			});
			return;
		}

		const notifications = await NotificationModel.getAllNotifications(targetId);

		await NotificationModel.notificationsSeen(targetId);

		res.json(notifications.map(transforms().transformNotification));
	},

	async deleteNotification(req, res) {
		const { userId } = req.token;
		const targetId = req.params.userId;
		const { notificationId } = req.params;

		if (Number(userId) !== Number(targetId)) {
			res.status(403).json({
				message: 'Invalid user id.',
			});
			return;
		}

		const result = await NotificationModel.deleteNotification(notificationId);

		if (result.affectedRows === 0) {
			res.status(404).json({
				success: false,
				message: 'Invalid notification id.',
			});
		} else {
			res.json({
				success: true,
				message: 'Successfully deleted.',
			});
		}
	},

	async decideNotification(req, res) {
		const { userId } = req.token;
		const targetId = req.params.userId;
		// const { notificationId } = req.params;
		const { accepted } = req.body;

		if (typeof accepted !== 'boolean') {
			res.status(400).json({
				success: false,
				message: 'Invalid decision.',
			});
			return;
		}

		if (Number(userId) !== Number(targetId)) {
			res.status(403).json({
				success: false,
				message: 'Invalid user id.',
			});
			return;
		}

		// TODO: Save decision,
		// TODO: Save Placeholder with decision

		res.json({
			success: true,
			message: 'Decision saved',
		});
	},

};

module.exports = NotificationController;
