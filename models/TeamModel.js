const databaseConnection = require('./DatabaseConnection');

const Team = {

	/**
	 * Returns a list of all teams the user is a member of.
	 * @param {number} userID ID of the user.
	 * @returns {Promise<Array<User>>} The result fetched from the database.
	 */
	async getAllTeams(userID) {
		return databaseConnection.queryp(`SELECT User1.Firstname, User1.Name, Team.Team_Id, Team.Teamname
			FROM Team, User AS User1, User AS User2, member_of
			WHERE User1.User_Id = Team.Teammanager
			  AND User2.User_Id = member_of.User_Id
			  AND Team.Team_Id = member_of.Team_Id
			  AND User2.User_Id = ?`, [userID]);
	},

	/**
	 * Returns information about a team defined by an id if the user is a member of the team.
	 * @param {number} teamID ID of the team.
	 * @param {number} userID Id of the user.
	 * @returns {Promise<Array<User>>} The result fetched from the database.
	 */
	async getTeamById(teamID, userID) {
		return databaseConnection.queryp(
			`SELECT User.Firstname, User.Name, Team.Team_Id, Team.Teamname
			FROM Team, User, member_of
			WHERE Team.Team_Id = member_of.Team_Id
			  AND User.User_Id = member_of.User_Id
			  AND Team.Team_Id = ?
			  AND User.User_Id = ?;`,
			[teamID, userID],
		);
	},

	/**
	 * Creates a new team.
	 * @param {string} teamName Name of the team.
	 * @param {number} userID ID of the user creating a team.
	 * @returns {Promise<Array<User>>} The result fetched from the database.
	 */
	async addTeam(teamName, userID) {
		return databaseConnection.queryp('INSERT INTO Team (Teamname, Teammanager) VALUES (?, ?);', [teamName, userID]);
	},

	/**
	 * Deletes a team if the user is the team manager.
	 * @param {number} teamID The id of the team to delete.
	 * @param {number} userID The id of the user deleting the team.
	 * @returns {Promise<Array<User>>} The result fetched from the database.
	 */
	async deleteTeam(teamID, userID) {
		return databaseConnection.queryp('DELETE FROM Team WHERE Team_Id = ? AND Teammanager = ?', [teamID, userID]);

		/* `DELETE FROM Team
			WHERE Team_Id IN
				(SELECT Team_Id FROM
					(SELECT member_of.Team_Id
					FROM User
					INNER JOIN
						(Team INNER JOIN member_of
						ON Team.Team_Id = member_of.Team_Id)
					ON (User.User_Id = member_of.User_Id)
				WHERE User.User_Id = ?
				AND Team.Team_Id = ?)
				AS temp);`, */
	},

	/**
	 * Updates the name of a team if the user is the team manager.
	 * @param {number} teamID ID of the team.
	 * @param {string} teamName New name of the team.
	 * @param {number} userID The id of the user changing the team.
	 * @returns {Promise<Array<User>>} The result fetched from the database.
	 */
	async updateTeam(teamID, teamName, userID) {
		return databaseConnection.query('UPDATE Team SET Teamname=? WHERE Team_Id = ? AND Teammanager = ?', [teamName, teamID, userID]);
	},

	async getTeammanager(teamID) {
		return databaseConnection.queryp('SELECT Teammanager FROM Team WHERE Team_Id = ?', [teamID]);
	},

};

module.exports = Team;
