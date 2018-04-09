const databaseConnection = require('../DatabaseConnection')

var Group = {

  getAllGroups: function(callback) {
    return databaseConnection.query("Select * From Gruppen", callback);
  },

  getGroupById: function(id, callback) {
    return databaseConnection.query("Select * from Gruppen where Gruppen_Id=?", [id], callback);
  },

  addGroup: function(group, callback) {
    return databaseConnection.query("Insert into Gruppen values(?,?,?)", [group.Gruppen_Id, group.Gruppenname, group.Gruppenleiter], callback);
  },

  deleteGroup: function(id, callback) {
    return databaseConnection.query("Delete From Gruppen where Gruppen_Id=?", [id], calback);
  },

  updateGroup: function(id, group, callback) {
    return databaseConnection.query("Update Gruppen set Gruppenname=?, Gruppenleiter=? where Gruppen_Id=?", [Gruppen.Gruppenname, Gruppen.Gruppenleiter, id], callback);
  }
};

module.exports = Group;