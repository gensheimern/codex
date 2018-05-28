const databaseConnection = require('./DatabaseConnection');

const Participates = {

	async getMemberOfActivity(activityId) {
		return databaseConnection.queryp(
			`SELECT User.*
			FROM User
				INNER JOIN participates
				ON User.User_Id = participates.User_Id
			WHERE participates.Activity_Id = ?`,
			[activityId],
		);
	},

	async addParticipant(activityId, userId) {
		return databaseConnection.queryp('INSERT INTO participates (User_Id, Activity_Id) VALUES (?, ?)', [userId, activityId]);
	},

	async deleteParticipant(activityId, userId) {
		return databaseConnection.queryp('DELETE FROM participates WHERE User_Id = ? AND Activity_Id = ?', [userId, activityId]);
	},

	async isParticipant(userId, activityId) {
		return databaseConnection.querypBool('SELECT * FROM participates WHERE Activity_Id = ? AND User_Id = ?', [activityId, userId]);
	},

};

module.exports = Participates;
