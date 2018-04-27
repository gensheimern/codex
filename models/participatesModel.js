const databaseConnection = require('../DatabaseConnection')

var Participates = {

  getAllParticipates: function(callback) {
    return databaseConnection.query("Select * From participates", callback);
  },

  getParticipatesById: function(id, callback) {
    return databaseConnection.query("SELECT * FROM participates inner join User on participates.User_Id = User.User_Id WHERE participates.Activity_Id=?", [id], callback);
  },

  addParticipates: function(participates, callback) {
    return databaseConnection.query("Insert into participates values(?,?)", [participates.User_Id, participates.Activity_Id], callback);
  },

  deleteParticipatesAll: function(id, callback) {
    return databaseConnection.query("Delete From participates where Activity_Id=?", [id], callback);
  },

  deleteParticipatesSingle: function(userid, activityid, callback) {
    return databaseConnection.query("Delete From participates where User_Id=? AND Activity_Id=?", [userid, activityid], callback);
  },

  updateParticipates: function(id, participates, callback) {
    return databaseConnection.query("Update participates set User_Id=? where User_Id=? AND Activity_Id=?", [id, participates.User_Id, participates.Activity_Id], callback);
  }
};


module.exports = Participates;
