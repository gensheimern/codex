const databaseConnection = require('./DatabaseConnection')

const Message = {

  getAllMessages: function(callback) {
    return databaseConnection.query("Select * From Message", callback);
  },

  getMessageById: function(id, callback) {
    return databaseConnection.query("Select * from Message where Message_Id=?", [id], callback);
  },

  getMessageByActivity: function(id, callback) {
    return databaseConnection.query("Select * from Message where Activity_Id=?", [id], callback);
  },

  addMessage: function(message, callback) {
    return databaseConnection.query("Insert into Message values(?,?,?,?,?)", [message.Message_Id, message.Date, message.Messagecontent, message.Activity_Id, message.User_Id], callback);
  },

  deleteMessageById: function(id, callback) {
    return databaseConnection.query("Delete From Message where Message_Id=?", [id], callback);
  },

  deleteMessageByActivity: function(id, callback) {
    return databaseConnection.query("Delete From Message where Activity_Id=?", [id], callback);
  },


  updateMessage: function(id, message, callback) {
    return databaseConnection.query("Update Message set Date=?, Messagecontent=?,Activity_Id=?, User_Id=?  where Message_Id=?", [message.Date, message.Messagecontent, message.Activity_Id, message.User_Id, id], callback);
  }
};


module.exports = Message;