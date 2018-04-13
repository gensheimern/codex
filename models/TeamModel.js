const databaseConnection = require('../DatabaseConnection');

var Team = {

  getAllTeam: function(callback) {
    return databaseConnection.query("Select * From Team", callback);
  },

  getTeamById: function(id, callback) {
    return databaseConnection.query("Select * from Team where Team_Id=?", [id], callback);
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