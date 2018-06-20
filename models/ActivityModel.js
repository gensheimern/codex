const databaseConnection = require('./DatabaseConnection');
const UserModel = require('./UserModel');

const Activity = {

	/**
	 * Fetches all activities visible for the user.
	 * @param {number} userId The id of the user fetching the activities.
	 * @returns {Promise<Array<Activity>>} The activities visible for the user.
	 */
	async getAllActivities(userId) {
		const organization = await UserModel.getOrganization(userId);

		if (organization === null) {
			return databaseConnection.queryp(
				`SELECT Activity.*, User.*
				FROM Activity
					INNER JOIN User
					ON Activity.Host = User.User_Id
				WHERE Private = 0
				AND Organization IS NULL
				UNION
				SELECT Activity.*, User.*
				FROM Activity
					INNER JOIN User
					ON Activity.Host = User.User_Id
						INNER JOIN participates
						ON Activity.Activity_Id = participates.Activity_Id
				WHERE Private = 1
				AND participates.User_Id = ?`,
				[organization, userId],
			);
		}

		return databaseConnection.queryp(
			`SELECT Activity.*, User.*
			FROM Activity
				INNER JOIN User
				ON Activity.Host = User.User_Id
			WHERE Private = 0
			AND Organization = ?
			UNION
			SELECT Activity.*, User.*
			FROM Activity
				INNER JOIN User
				ON Activity.Host = User.User_Id
					INNER JOIN participates
					ON Activity.Activity_Id = participates.Activity_Id
			WHERE Private = 1
			AND participates.User_Id = ?`,
			[organization, userId],
		);
	},

	async getAllActivitiesWithoutChecks() {
		return databaseConnection.queryp('SELECT Activity.*, User.* FROM Activity INNER JOIN User ON Activity.Host = User.User_Id');
	},

	async getJoinedActivities(userId) {
		return databaseConnection.queryp(
			`SELECT Activity.*, User.*
			FROM Activity
				INNER JOIN User
				ON Activity.Host = User.User_Id
					INNER JOIN participates
					ON Activity.Activity_Id = participates.Activity_Id
			WHERE participates.User_Id = ?
				AND Activity.Time > CURRENT_TIMESTAMP()
			ORDER BY Activity.Time`,
			[userId],
		);
	},

	async getActivityOfTeam(teamId) {
		return databaseConnection.queryp(
			`SELECT Activity.*, teamParticipates.*
			FROM Activity
				INNER JOIN teamParticipates
				ON Activity.Activity_Id = teamParticipates.Activity_Id
				WHERE teamParticipates.Team_Id = ?
				AND Activity.Time > CURRENT_TIMESTAMP()
			ORDER BY Activity.Time`,
			[teamId],
		);
	},

	/**
	 * Fetches specific information of an activity.
	 * @param {number} activityId The activity to get the information of.
	 * @returns {Promise<Activity>} Specific information about the activity.
	 */
	async getActivityById(activityId) {
		return databaseConnection.querypFirst('SELECT Activity.*, User.* FROM Activity INNER JOIN User ON Activity.Host = User.User_Id WHERE Activity.Activity_Id = ?', [activityId]);
	},

	/**
	 * Creates a new activity.
	 * @param {object} activity The data of the activity to create.
	 * @param {number} userId The user creating the activity (host).
	 */
	async createActivity(activity, userId, organizationId) {
		const eventTag = activity.event ? 1 : 0;
		const privateTag = activity.private ? 1 : 0;
		if (organizationId === null) {
			return databaseConnection.queryp('INSERT INTO Activity (Description, Activityname, Place, Time, Eventtag, Private, Host, Banner, MaxParticipants, Organization) VALUES (?,?,?,?,?,?,?,?, ?, NULL)', [activity.description, activity.name, activity.place, activity.time, eventTag, privateTag, userId, activity.banner, activity.maxParticipants]);
		}

		return databaseConnection.queryp('INSERT INTO Activity (Description, Activityname, Place, Time, Eventtag, Private, Host, Banner, MaxParticipants, Organization) VALUES (?,?,?,?,?,?,?,?,?,?)', [activity.description, activity.name, activity.place, activity.time, eventTag, privateTag, userId, activity.banner, activity.maxParticipants, organizationId]);
	},

	/**
	 * Deletes an activity.
	 * @param {number} activityId The activity to delete.
	 * @returns {Promise<OkPacket>} Result of the database deletion.
	 */
	async deleteActivity(activityId) {
		return databaseConnection.queryp('DELETE FROM Activity WHERE Activity_Id=?', [activityId]);
	},

	/**
	 * Updates the information about an activity.
	 * @param {number} activityId The activity to update.
	 * @param {object} activity The new updated data of the activity.
	 */
	async updateActivity(activityId, activity) {
		const eventTag = activity.event ? 1 : 0;
		const privateTag = activity.private ? 1 : 0;

		return databaseConnection.queryp('UPDATE Activity SET Description=?, Activityname=?, Place=?, Time=?, Eventtag=?, Private=?, Banner=?, MaxParticipants=? WHERE Activity_Id=?', [activity.description, activity.name, activity.place, activity.time, eventTag, privateTag, activity.banner, activity.maxParticipants, activityId]);
	},

	/**
	 * Checks if the user is the host of the activity.
	 * @param {number} userId The user to check.
	 * @param {number} activityId The activity to check the host for.
	 * @returns {Promise<boolean>} Returns if the user is the host of the activity.
	 */
	async isHost(userId, activityId) {
		return databaseConnection.querypBool('SELECT Activity_Id FROM Activity WHERE Activity_Id = ? AND Host = ?', [activityId, userId]);
	},

	/**
	 * Checks if the activity with id activityId is private.
	 * @param {number} activityId Activity to check.
	 * @returns {Promise<boolean>} Returns if the activity is private.
	 */
	async isPrivate(activityId) {
		return databaseConnection.querypBool('SELECT Activity_Id FROM Activity WHERE Activity_Id = ? AND Private = 1', [activityId]);
	},

	/**
	 * Checks if the activity with id activityId is full (max participants joined).
	 * @param {number} activityId Activity to check
	 * @returns {Promise<boolean>} Returns if the activity is full.
	 */
	async isFull(activityId) {
		return databaseConnection.querypBool(
			`SELECT Activity_Id from Activity WHERE Activity_Id = ? AND MaxParticipants <= (
				SELECT COUNT(*) FROM participates WHERE Activity_Id = ?
			) AND MaxParticipants > 0;`,
			[activityId, activityId],
		);
	},

};

module.exports = Activity;
