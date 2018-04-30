const databaseConnection = require('./DatabaseConnection')

const Subscribe = {

	async getSubscriber(userId) {
		return databaseConnection.queryp("SELECT User.* FROM subscribed INNER JOIN User ON User.User_Id = subscribed.Subscriber_Id WHERE Subscribed_Id = ?", [userId]);
	},

	async getSubscribed(userId) {
		return databaseConnection.queryp("SELECT User.* FROM subscribed INNER JOIN User ON User.User_Id = subscribed.Subscribed_Id WHERE Subscriber_Id=?", [userId]);
	},

	async addSubscription(subscribedId, userId) {
		return databaseConnection.queryp("INSERT INTO subscribed VALUES (?,?)", [userId, subscribedId]);
	},

	async deleteSubscription(subscribedId, userId) {
		return databaseConnection.queryp("DELETE FROM subscribed WHERE Subscribed_Id=? Subscriber_Id=?", [subscribedId, userId]);
	}

};


module.exports = Subscribe;