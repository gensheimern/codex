const databaseConnection = require('./DatabaseConnection')

const Activity = {

  getAllActivities: function(callback) {
    return databaseConnection.query("SELECT *, User.Firstname, User.Name, User.Image FROM Activity inner join User on Activity.Host = User.User_Id", callback);
  },

  getActivityById: function(id, callback) {
    return databaseConnection.query("Select * from Activity where Activity_Id=?", [id], callback);
  },

  addActivity: function(activity, userid, callback) {
    return databaseConnection.query("Insert into Activity values(?,?,?,?,?,?,?,?,?,?)", [activity.Activity_Id, activity.Description, activity.Activityname, activity.Place, activity.Time, activity.Eventtag, activity.Private, userid, activity.Banner, activity.MaxParticipants], callback);
  },

  deleteActivity: function(id, callback) {
    return databaseConnection.query("Delete From Activity where Activity_Id=?", [id], callback);
  },

  updateActivity: function(id, activity, callback) {
    return databaseConnection.query("Update Activity set Description=?, Activityname=?, Place=?, Time=?, Eventtag=?, Host=? where Gruppen_Id=?", [activity.Description, activity.Activityname, activity.Place, activity.Time, activity.Eventtag, activity.Host, id], callback);
  }
};

module.exports = Activity;
