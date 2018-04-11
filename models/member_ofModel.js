const databaseConnection = require('../DatabaseConnection')

var Member = {

  getAllMember: function(callback) {
    return databaseConnection.query("Select * From member_of", callback);
  },

  getMemberById: function(id, callback) {
    return databaseConnection.query("Select * from member_of where Team_Id=?", [id], callback);
  },

  addMember: function(member, callback) {
    return databaseConnection.query("Insert into member_of values(?,?)", [member.User_Id, member.Team_Id], callback);
  },

  deleteMemberAll: function(id, callback) {
    return databaseConnection.query("Delete From member_of where Team_Id=?", [id], callback);
  },

  deleteMemberSingle: function(userid, teamid, callback) {
    return databaseConnection.query("Delete From member_of where User_Id=? AND Team_Id=?", [userid, teamid], callback);
  },

  updateMember: function(userID, teamId, member, callback) {
    return databaseConnection.query("Update member_of set User_Id=? where User_Id=? And Team_Id=?", [member.User_Id, UserId, teamId, id], callback);
  }
};


module.exports = Member;