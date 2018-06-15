const databaseConnection = require('./DatabaseConnection');

const Team = {

	/**
	 * Returns a list of all teams the user is a member of.
	 * @param {number} userID ID of the user.
	 * @returns {Promise<Array<User>>} The result fetched from the database.
	 */
	async getAllTeams(userID) {
		return databaseConnection.queryp(`
			SELECT Manager.*, Team.*
			FROM Team
			INNER JOIN User AS Manager
				ON Manager.User_Id = Team.Teammanager
			INNER JOIN member_of
				ON member_of.Team_Id = Team.Team_Id
			WHERE member_of.User_Id = ?
				AND member_of.Accepted = 1`, [userID]);
	},
	// SELECT Manager.*, Team.*
	// 		FROM Team, User AS Manager, User AS Member, member_of
	// 		WHERE Manager.User_Id = Team.Teammanager
	// 		  AND Member.User_Id = member_of.User_Id
	// 		  AND Team.Team_Id = member_of.Team_Id
	// 		  AND Member.User_Id = ?

	/**
	 * Returns information about a team specified by an id.
	 * @param {number} teamId ID of the team.
	 * @returns {Promise<User>} The result fetched from the database.
	 */
	async getTeamById(teamId) {
		return databaseConnection.querypFirst(
			'SELECT User.*, Team.* FROM Team INNER JOIN User ON Team.Teammanager = User.User_Id WHERE Team.Team_Id = ?',
			[teamId],
		);
	},

	/**
	 * Creates a new team.
	 * @param {string} teamName Name of the team.
	 * @param {number} userId ID of the user creating a team.
	 * @returns {Promise<DBResult>} The result fetched from the database.
	 */
	async addTeam(teamName, description, teamIcon, userId) {
		return databaseConnection.queryp('INSERT INTO Team (Teamname, Description, Group_icon, Teammanager) VALUES (?, ?, ?, ?);', [teamName, description, teamIcon, userId]);
	},

	/**
	 * Deletes a team if the user is the team manager.
	 * @param {number} teamId The id of the team to delete.
	 * @param {number} userId The id of the user deleting the team.
	 * @returns {Promise<DBResult>} The result fetched from the database.
	 */
	async deleteTeam(teamId, userID) {
		return databaseConnection.queryp('DELETE FROM Team WHERE Team_Id = ? AND Teammanager = ?', [teamId, userID]);
	},

	/**
	 * Updates the name of a team if the user is the team manager.
	 * @param {number} teamId ID of the team.
	 * @param {string} newName New name of the team.
	 * @param {number} userId The id of the user changing the team.
	 * @returns {Promise<DBResult>} The result fetched from the database.
	 */
	async updateTeam(teamId, newName, userId) {
		return databaseConnection.query('UPDATE Team SET Teamname=? WHERE Team_Id = ? AND Teammanager = ?', [newName, teamId, userId]);
	},

	/**
	 * returns the team manager of the team with the id teamId.
	 * @param {number} teamId The id of the team.
	 * @returns {Promise<User>} The team manager of the team with id teamId.
	 */
	async getTeammanager(teamId) {
		return databaseConnection.querypFirst('SELECT Teammanager FROM Team WHERE Team_Id = ?', [teamId]);
	},

	/**
	 * Returns if the user is the manager of a team.
	 * @param {number} userId The user.
	 * @param {number} teamId The team.
	 * @returns {Promise<boolean>} Returns if the user is the manager of the team.
	 */
	async isTeammanager(userId, teamId) {
		return databaseConnection.querypBool('SELECT Team_Id FROM Team WHERE Team_Id = ? AND Teammanager = ?', [teamId, userId]);
	},

};

module.exports = Team;
