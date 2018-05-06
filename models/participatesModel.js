const databaseConnection = require('./DatabaseConnection');

const Participates = {

	async getMemberOfActivity(activityId, userId) {
		return databaseConnection.queryp(
			`SELECT Member.*
			FROM User AS Member
				INNER JOIN participates
				ON Member.User_Id = participates.User_Id
					INNER JOIN (User
						INNER JOIN participates AS participates2
						ON User.User_Id = participates2.User_Id)
					ON participates2.Activity_Id = participates.Activity_Id
			WHERE participates.Activity_Id = ?
			AND User.User_Id = ?`,
			[activityId, userId],
		);
	},

	async addParticipant(activityId, userId) {
		return databaseConnection.queryp('INSERT INTO participates (User_Id, Activity_Id) VAULES (?, ?)', [userId, activityId]);
	},

	async deleteParticipant(activityId, userId) {
		return databaseConnection.queryp('DELETE FROM participates WHERE User_Id = ? AND Activity_Id = ?', [userId, activityId]);
	},

	async isParticipant(userId, activityId) {
		return databaseConnection.querypBool('SELECT * FROM participates WHERE Activity_Id = ? AND User_Id = ?', [activityId, userId]);
	},

};

module.exports = Participates;
