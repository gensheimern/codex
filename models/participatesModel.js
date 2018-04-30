const databaseConnection = require('./DatabaseConnection')

const Participates = {

	async getMemberOfActivity(activityId, userId) {
		return databaseConnection.queryp(`SELECT Member.* FROM User AS Member
			INNER JOIN participates ON Member.User_Id = participates.User_Id
			INNER JOIN (User INNER JOIN participates AS participates2 ON User.User_Id = participates2.User_Id) ON participates2.Activity_Id = participates.Activity_Id
			WHERE participates.Activity_Id = ? AND User.User_Id = ?`, [activityId, userId]);
	},

	/*async addParticipates(participates) {
		return databaseConnection.queryp("INSERT INTO participates VALUES (?,?)", [participates.User_Id, participates.Activity_Id]);
	},

	async deleteParticipatesAll(id) {
		return databaseConnection.queryp("DELETE FROM participates WHERE Activity_Id=?", [id]);
	},

	async deleteParticipatesSingle(userid, activityid) {
		return databaseConnection.queryp("DELETE FROM participates WHERE User_Id=? AND Activity_Id=?", [userid, activityid]);
	},

	async updateParticipates(id, participates) {
		return databaseConnection.queryp("UPDATE participates SET User_Id=? WHERE User_Id=? AND Activity_Id=?", [id, participates.User_Id, participates.Activity_Id]);
	}*/
};


module.exports = Participates;