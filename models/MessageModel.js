const databaseConnection = require('./DatabaseConnection');

const Message = {

	async getMessagesOfActivity(activityId, userId) {
		return databaseConnection.queryp('SELECT * FROM Message INNER JOIN (Activity INNER JOIN participates ON participates.Activity_Id = Activity.Activity_Id) ON Message.Activity_Id = Activity.Activity_Id  WHERE Activity.Activity_Id = ? AND participates.User_Id = ?', [activityId, userId]);
	},

	async createMessage(content, activityId, userId) {
		const date = new Date().toISOString().slice(0, 19).replace('T', ' ');

		return databaseConnection.queryp('INSERT INTO Message VALUES (?,?,?,?,?)', [undefined, date, content, activityId, userId]);
	},

	async deleteMessage(messageId, userId) {
		return databaseConnection.queryp('DELETE FROM Message WHERE Message_Id = ? AND User_Id = ?', [messageId, userId]);
	},

	async deleteMessageAdmin(messageId) {
		return databaseConnection.queryp('DELETE FROM Message WHERE Message_Id = ?', [messageId]);
	},

	async updateMessage(messageId, content, userId) {
		return databaseConnection.queryp('UPDATE Message SET Messagecontent=? WHERE Message_Id=? AND User_Id=?', [content, messageId, userId]);
	},

	async updateMessageAdmin(messageId, content) {
		return databaseConnection.queryp('UPDATE Message SET Messagecontent=? WHERE Message_Id=?', [content, messageId]);
	},

};


module.exports = Message;
