const databaseConnection = require('../DatabaseConnection');
const encryptPassword = require('../routes/auth/CryptPassword');

var User = {

  getAllUser: function(callback) {
    return databaseConnection.query("Select * From User", callback);
  },

  getUserById: function(id, callback) {
    return databaseConnection.query("Select * from User where User_Id=?", [id], callback);
  },

  getUserByEmail: function(id, callback) {
    return databaseConnection.query("Select * from User where Email=?", [id], callback);
  },

  addUser: function(user, callback) {
    return databaseConnection.query("Insert into User values(?,?,?,?,?)", [user.User_Id, user.Firstname, user.Name, user.Email, encryptPassword(user.Password)], callback);
  },

  deleteUser: function(id, callback) {
    return databaseConnection.query("Delete From User where User_Id=?", [id], callback);
  },

  updateUser: function(id, user, callback) {
    return databaseConnection.query("Update User set Firstname=?, Name=?, Email=?, Password=? where User_Id=?", [user.Firstname, user.Name, user.Email, user.Password, id], callback);
  }
};


module.exports = User;