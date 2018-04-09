const databaseConnection = require('../DatabaseConnection')

var Activity = {

  getAllActivitys: function(callback) {
    return databaseConnection.query("Select * From Activity", callback);
  },

  getActivityById: function(id, callback) {
    return databaseConnection.query("Select * from Activity where Activity_Id=?", [id], callback);
  },

  addActivity: function(activity, callback) {
    return databaseConnection.query("Insert into Activity values(?,?,?,?,?,?,?)", [activity.Activity_Id, activity.Description, activity.Activityname, activity.User_Id, activity.Place, activity.Time, activity.Eventtag], callback);
  },

  deleteActivity: function(id, callback) {
    return databaseConnection.query("Delete From Activity where Activity_Id=?", [id], calback);
  },

  updateActivity: function(id, activity, callback) {
    return databaseConnection.query("Update Activity set Description=?, Activityname=?, User_Id=?, Place=?, Time=?, Eventtag=? where Gruppen_Id=?", [activity.Description, activity.Activityname, activity.User_Id, activity.Place, activity.Time, activity.Eventtag, id], callback);
  }
};

module.exports = Activity;