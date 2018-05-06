const databaseConnection = require('./DatabaseConnection');

const Message = {

	/**
	 * Fetches all messages of an activity.
	 * @param {number} activityId Activity to fetch the messages for.
	 * @returns {Promise<Array<Message>>} Returns all messages of an activity.
	 */
	async getMessagesOfActivity(activityId) {
		return databaseConnection.queryp('SELECT Message.*, User.* FROM Message INNER JOIN User ON Message.User_Id = User.User_Id WHERE Activity.Activity_Id = ?', [activityId]);
	},

	/**
	 * Creates a new message.
	 * @param {object} content The information of the new message.
	 * @param {number} activityId The activity to add the message to.
	 * @param {number} userId The user creating the message.
	 * @returns {Promise<OkPacket>} The result of the database insertion.
	 */
	async createMessage(content, activityId, userId) {
		const date = new Date().toISOString().slice(0, 19).replace('T', ' ');

		return databaseConnection.queryp('INSERT INTO Message (Date, Messagecontent, Activity_Id, User_Id) VALUES (?,?,?,?)', [date, content, activityId, userId]);
	},

	/**
	 * Deletes an existing message.
	 * @param {number} messageId Id of the message to delete.
	 * @param {number} userId User deleting the message.
	 * @returns {Promise<OkPacket>} The result of the database deletion.
	 */
	async deleteMessage(messageId, userId) {
		return databaseConnection.queryp('DELETE FROM Message WHERE Message_Id = ? AND User_Id = ?', [messageId, userId]);
	},

	async deleteMessageAdmin(messageId) {
		return databaseConnection.queryp('DELETE FROM Message WHERE Message_Id = ?', [messageId]);
	},

	/**
	 * Updates the content of a message.
	 * @param {number} messageId The id of the message getting changed.
	 * @param {string} content New updated message content.
	 * @param {number} userId User updating the message.
	 * @returns {Promise<OkPacket>} The result of the database update.
	 */
	async updateMessage(messageId, content, userId) {
		return databaseConnection.queryp('UPDATE Message SET Messagecontent=? WHERE Message_Id=? AND User_Id=?', [content, messageId, userId]);
	},

	async updateMessageAdmin(messageId, content) {
		return databaseConnection.queryp('UPDATE Message SET Messagecontent=? WHERE Message_Id=?', [content, messageId]);
	},

};


module.exports = Message;
