const databaseConnection = require('./DatabaseConnection');

const Participates = {

	async getMemberOfActivity(activityId) {
		return databaseConnection.queryp(
			`SELECT User.*
			FROM User
				INNER JOIN participates
				ON User.User_Id = participates.User_Id
			WHERE participates.Activity_Id = ?
			AND participates.Accepted = 1`,
			[activityId],
		);
	},

	async getActivityOfTeam(teamId) {
		return databaseConnection.queryp(
			`SELECT User.*
			FROM User
				INNER JOIN participates
				ON User.User_Id = participates.User_Id
			WHERE participates.Activity_Id = ?
			AND participates.Accepted = 1`,
			[teamId],
		);
	},

	async addParticipant(activityId, userId, accepted) {
		const acceptedFlag = accepted ? 1 : 0;
		return databaseConnection.queryp('INSERT INTO participates (User_Id, Activity_Id, Accepted) VALUES (?, ?, ?)', [userId, activityId, acceptedFlag]);
	},

	async addTeam(activityId, teamId, accepted) {
		const acceptedFlag = accepted ? 1 : 0;
		return databaseConnection.queryp('INSERT INTO teamParticipates (Team_Id, Activity_Id, Accepted) VALUES (?, ?, ?)', [teamId, activityId, acceptedFlag]);
	},

	async addTeamToEvent(teamId, activityId) {
		return databaseConnection.queryp('INSERT INTO teamParticipates (Team_Id, Activity_Id ) VALUES (?, ?);', [teamId, activityId]);
	},

	async deleteParticipant(activityId, userId) {
		return databaseConnection.queryp('DELETE FROM participates WHERE User_Id = ? AND Activity_Id = ?', [userId, activityId]);
	},

	async isParticipant(userId, activityId) {
		return databaseConnection.querypBool('SELECT * FROM participates WHERE Activity_Id = ? AND User_Id = ? AND Accepted = 1', [activityId, userId]);
	},

	async acceptParticipation(userId, activityId) {
		return databaseConnection.queryp('UPDATE participates SET Accepted = 1 WHERE Activity_Id = ? AND User_Id = ?', [activityId, userId]);
	},

	async declineParticipation(userId, activityId) {
		return databaseConnection.queryp('DELETE FROM participates WHERE Activity_Id = ? AND User_Id = ? AND Accepted = 0', [activityId, userId]);
	},

};

module.exports = Participates;
