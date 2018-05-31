const NotificationModel = require('../../models/NotificationModel');
const MemberModel = require('../../models/MemberModel');
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
		const { notificationId } = req.params;
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

		const dbNotification = await NotificationModel.getNotification(notificationId);
		const notification = transforms().transformNotification(dbNotification);

		if (!notification || notification.user.id !== userId) {
			res.status(404).json({
				success: false,
				message: 'Notification not found.',
			});
		}

		if (notification.type === 'joinTeam') {
			if (accepted) {
				await MemberModel.acceptMember(notification.targetId, userId);
			} else {
				await MemberModel.declineMember(notification.targetId, userId);
			}

			await NotificationModel.addNotification(notification.user.id, 'notification', accepted ? 'Team invitation accepted.' : 'Team invitation declined', notification.message, notification.targetId);

			await NotificationModel.deleteNotification(notificationId);

			res.json({
				success: true,
				message: 'Decision saved.',
			});
		} else if (notification.type === 'joinEvent') {
			res.status(501).json({
				message: 'Not implemented.',
			});

			// TODO: Save decision,
			// TODO: Delete notification
			// TODO: Save Placeholder with decision
		} else {
			res.status(409).json({
				success: false,
				message: 'Notification cannot be accepted.',
			});
		}
	},
};

module.exports = NotificationController;
