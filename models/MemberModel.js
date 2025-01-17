const databaseConnection = require('./DatabaseConnection');

const Member = {

	/**
	 * Fetches the member of a specified team.
	 * @param {number} teamId The id of the team to get the members of.
	 * @returns {Promise<Array<User>>} The member of the team.
	 */
	async getMemberOfTeam(teamId) {
		return databaseConnection.queryp('SELECT User.* FROM User INNER JOIN member_of ON member_of.User_Id = User.User_Id WHERE member_of.Team_Id = ? AND member_of.Accepted = 1;', [teamId]);
	},

	/**
	 * Adds a new member to a team.
	 * @param {number} memberId The member to add to the team.
	 * @param {number} teamId The team to add the member to.
	 * @returns {Promise<OkPacket>} Result from database insert.
	 */
	async addMember(memberId, teamId, accepted) {
		const acceptedFlag = accepted ? 1 : 0;
		return databaseConnection.queryp('INSERT INTO member_of (User_Id, Team_Id, Accepted) VALUES (?, ?, ?)', [memberId, teamId, acceptedFlag]);
	},

	/**
	 * Deletes a member of a team.
	 * @param {number} teamId The team to delete the member from.
	 * @param {number} memberId The member to delete from the team.
	 * @returns {Promise<OkPacket>} Result from database delete.
	 */
	async deleteMember(teamId, memberId) {
		return databaseConnection.queryp('DELETE FROM member_of WHERE Team_Id = ? AND User_Id = ?;', [teamId, memberId]);
	},

	/**
	 * Checks if a user is a member of a team.
	 * @param {number} teamId The id of the team.
	 * @param {number} userId The user to check.
	 * @returns {Promise<boolean>} Returns if the user is a member of the team.
	 */
	async isMember(teamId, userId) {
		return databaseConnection.querypBool('SELECT member_of.User_Id FROM member_of INNER JOIN Team ON member_of.Team_Id = Team.Team_Id WHERE Team.Team_Id = ? AND member_of.User_Id = ? and member_of.Accepted = 1', [teamId, userId]);
	},

	/**
	 * Accepts the invitation in a team.
	 * @param {number} teamId The id of the team the user is joining.
	 * @param {number} userId The id of the user.
	 * @returns {Promise<OkPacket>} Result from the database.
	 */
	async acceptMember(teamId, userId) {
		return databaseConnection.queryp('UPDATE member_of SET Accepted = 1 WHERE Team_Id = ? AND User_Id = ?', [teamId, userId]);
	},

	/**
	 * Declines the invitation in a team.
	 * @param {number} teamId The id of the team the user is invited.
	 * @param {number} userId The id of the user.
	 * @returns {Promise<OkPacket>} Result from the database.
	 */
	async declineMember(teamId, userId) {
		return databaseConnection.queryp('DELETE FROM member_of WHERE Team_Id = ? AND User_Id = ? AND Accepted = 0', [teamId, userId]);
	},
};


module.exports = Member;
