const databaseConnection = require('./DatabaseConnection')

const Activity = {

	async getAllActivities(userId) {
		return databaseConnection.queryp("SELECT * FROM Activity WHERE Private=0 UNION SELECT Activity.* FROM Activity INNER JOIN participates ON Activity.Activity_Id = participates.Activity_Id WHERE participates.User_Id=?", [userId]);
	},

	async getActivityById(activityId, userId) {
		return databaseConnection.queryp("SELECT * FROM Activity INNER JOIN participates ON Activity.Activity_Id = participates.Activity_Id WHERE Activity.Activity_Id=? AND participates.User_Id = ?", [activityId, userId]);
	},

	async createActivity(activity, userId) {
		return databaseConnection.queryp("INSERT INTO Activity VALUES (?,?,?,?,?,?,?)", [undefined, activity.Description, activity.Activityname, activity.Place, activity.Time, activity.Eventtag, userId]);
	},

	async deleteActivity(activityId, userId) {
		return databaseConnection.queryp("DELETE FROM Activity WHERE Activity_Id=?", [id]);
	},

	async updateActivity(activityId, activity, userId) {
		return databaseConnection.queryp("UPDATE Activity SET Description=?, Activityname=?, Place=?, Time=?, Eventtag=? WHERE Activity_Id=?", [activity.Description, activity.Activityname, activity.Place, activity.Time, activity.Eventtag, activityId]);
	}
};

module.exports = Activity;