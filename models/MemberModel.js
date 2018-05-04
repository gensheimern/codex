const databaseConnection = require('./DatabaseConnection');

const Member = {

	async getMemberOfTeam(teamID) {
		return databaseConnection.queryp('SELECT User.* FROM User INNER JOIN member_of ON member_of.User_Id = User.User_Id WHERE member_of.Team_Id = ?;', [teamID]);
	},

	async addMember(memberId, teamID) {
		return databaseConnection.queryp('INSERT INTO member_of VALUES (?,?)', [memberId, teamID]);
	},

	async deleteMember(teamID, memberID) {
		return databaseConnection.queryp('DELETE FROM member_of WHERE Team_Id = ? AND User_Id = ?;', [teamID, memberID]);
	},

	async isMember(teamID, userID) {
		return new Promise((resolve, reject) => {
			databaseConnection.query('SELECT member_of.User_Id FROM member_of INNER JOIN Team ON member_of.Team_Id = Team.Team_Id WHERE Team.Team_Id = ? AND member_of.User_Id = ?', [teamID, userID], (err, res) => {
				if (err) reject(err);
				else resolve(res.length !== 0);
			});
		});
	},
};


module.exports = Member;
