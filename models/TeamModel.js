const databaseConnection = require('./DatabaseConnection');

const Team = {

	getAllTeam: function(callback) {
		return databaseConnection.query("Select * From Team", callback);
	},

	getTeamById: function(id, callback) {
		return databaseConnection.query("SELECT User.Firstname, User.Name, Team.Team_Id, Team.Teamname FROM Team INNER JOIN User ON User.User_Id = Team.Teammanager WHERE Team_Id=?", [id], callback);
	},

	addTeam: function(team, userid, callback) {
		return databaseConnection.query("Insert into Team values(?,?,?)", [team.Team_Id, team.Teamname, userid], callback);
	},

	deleteTeam: function(id, callback) {
		return databaseConnection.query("Delete From Team where Team_Id=?", [id], callback);
	},

	updateTeam: function(id, team, callback) {
		return databaseConnection.query("Update Team set Teamname=?, Teammanager=? where Team_Id=?", [team.Teamname, team.Teammanager, id], callback);
	}
};

module.exports = Team;
