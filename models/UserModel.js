const databaseConnection = require('../DatabaseConnection')

var User = {

  getAllUser: function(callback) {
    return databaseConnection.query("Select * From User", callback);
  },

  getUserById: function(id, callback) {
    return databaseConnection.query("Select * from User where User_Id=?", [id], callback);
  },

  addUser: function(user, callback) {
    return databaseConnection.query("Insert into User values(?,?,?,?,?)", [user.User_Id, user.Vorname, user.Nachname, user.Email, user.Passwort], callback);
  },

  deleteUser: function(id, callback) {
    return databaseConnection.query("Delete From User where User_Id=?", [id], calback);
  },

  updateUser: function(id, user, callback) {
    return databaseConnection.query("Update User set Vorname=?, Nachname=?, Email=?, Passwort=? where User_Id=?", [user.Vorname, user.Nachname, user.Email, user.Passwort, id], callback);
  }
};


module.exports = User;