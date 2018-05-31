const databaseConnection = require('./DatabaseConnection');
const liveMessage = require('../LiveMessages').getLiveMessage();

const Notification = {

	async getAllNotifications(userId) {
		return databaseConnection.queryp('SELECT * FROM Notification WHERE User_Id = ?', [userId]);
	},

	async getNotification(notificationId) {
		return databaseConnection.querypFirst('SELECT * FROM Notification WHERE Notification_Id = ?', [notificationId]);
	},

	async addNotification(userId, type, title, message) {
		liveMessage.publish('notification', {
			type,
			title,
			message,
		}, userId);

		return databaseConnection.queryp('INSERT INTO Notification (Type, Title, Message, Time, User_Id) VALUES (?, ?, ?, ?, ?)', [type, title, message, Date.now(), userId]);
	},

	async deleteNotification(notificationId) {
		return databaseConnection.queryp('DELETE FROM Notification WHERE Notification_Id = ?', [notificationId]);
	},

	async notificationsSeen(userId) {
		return databaseConnection.queryp('UPDATE Notification SET Seen=1 WHERE User_Id = ?', [userId]);
	},

};

module.exports = Notification;
