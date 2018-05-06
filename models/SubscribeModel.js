const databaseConnection = require('./DatabaseConnection');

const Subscribe = {

	/**
	 * Fetches all subscribers of a user.
	 * @param {number} userId The user to fetch the subscribers of.
	 * @returns {Promise<Array<User>>} The subscribers of the user.
	 */
	async getSubscriber(userId) {
		return databaseConnection.queryp('SELECT User.* FROM subscribed INNER JOIN User ON User.User_Id = subscribed.Subscriber_Id WHERE Subscribed_Id = ?', [userId]);
	},

	/**
	 * Fetches all subscribed users of a user.
	 * @param {number} userId The user to fetch the subscribed users of.
	 * @returns {Promise<Array<User>>} The subscribed users of the user.
	 */
	async getSubscribed(userId) {
		return databaseConnection.queryp('SELECT User.* FROM subscribed INNER JOIN User ON User.User_Id = subscribed.Subscribed_Id WHERE Subscriber_Id=?', [userId]);
	},

	/**
	 * Adds a subscription.
	 * @param {number} subscribedId The user getting subscribed.
	 * @param {number} userId The subscribing user.
	 * @returns {Promise<DBResult>} Returns if the subscription was added.
	 */
	async addSubscription(subscribedId, userId) {
		return databaseConnection.queryp('INSERT INTO subscribed VALUES (?,?)', [userId, subscribedId]);
	},

	/**
	 * Ends a subscription.
	 * @param {number} subscribedId The user that was subscribed.
	 * @param {number} userId The subscribing user.
	 * @returns {Promise<DBResult>} Returns if the subscription was deleted.
	 */
	async deleteSubscription(subscribedId, userId) {
		return databaseConnection.queryp('DELETE FROM subscribed WHERE Subscribed_Id=? AND Subscriber_Id=?', [subscribedId, userId]);
	},

};


module.exports = Subscribe;
