const databaseConnection = require('./DatabaseConnection');
const liveMessages = require('../LiveMessages');

const MemberModel = require('./MemberModel');
const ParticipatesModel = require('./participatesModel');

const NotificationModel = {

	async getAllNotifications(userId) {
		return databaseConnection.queryp('SELECT Notification.*, User.* FROM Notification INNER JOIN User ON Notification.User_Id = User.User_Id WHERE User.User_Id = ? ORDER BY Time DESC', [userId]);
	},

	async getNotification(notificationId) {
		return databaseConnection.querypFirst('SELECT * FROM Notification WHERE Notification_Id = ?', [notificationId]);
	},

	async addNotification(userId, type, title, message, targetId) {
		liveMessages.getLiveMessage().publish('notification', {
			type,
			title,
			message,
		}, userId);

		return databaseConnection.queryp('INSERT INTO Notification (Type, Title, Message, Time, Target_Id, User_Id) VALUES (?, ?, ?, CURRENT_TIMESTAMP(), ?, ?)', [type, title, message, targetId, userId]);
	},

	async deleteNotification(notificationId) {
		return databaseConnection.queryp('DELETE FROM Notification WHERE Notification_Id = ?', [notificationId]);
	},

	async notificationsSeen(userId) {
		return databaseConnection.queryp('UPDATE Notification SET Seen=1 WHERE User_Id = ?', [userId]);
	},

	async notifyTeam(teamId, type, title, message, targetId, exceptId) {
		const members = await MemberModel.getMemberOfTeam(teamId);

		members.forEach(async (member) => {
			if (member.User_Id !== exceptId) {
				NotificationModel.addNotification(member.User_Id, type, title, message, targetId)
					.catch(() => {});
			}
		});
	},

	async notifyEvent(activityId, type, title, message, targetId, exceptId) {
		const participants = await ParticipatesModel.getMemberOfActivity(activityId);

		participants.forEach(async (participant) => {
			if (participant.User_Id !== exceptId) {
				NotificationModel.addNotification(participant.User_Id, type, title, message, targetId)
					.catch(() => {});
			}
		});
	},

};

module.exports = NotificationModel;
