const databaseConnection = require('./DatabaseConnection');

const LunchRestaurant = {

	/**
	 * Fetches all LunchRestaurants visible for the user.
	 * @param {number} userId The id of the user fetching the LunchRestaurants.
	 * @returns {Promise<Array<LunchRestaurant>>} The LunchRestaurants visible for the user.
	 */
	async getAllLunch() {
		return databaseConnection.queryp(`SELECT LunchRestaurant.*
			FROM LunchRestaurant`);
	},

	async getJoinedLunch(userId) {
		return databaseConnection.queryp(
			`SELECT LunchRestaurant.*, User.*
			FROM LunchRestaurant
				INNER JOIN User
				ON LunchRestaurant.Host = User.User_Id
					INNER JOIN participates
					ON LunchRestaurant.LunchRestaurant_Id = participates.LunchRestaurant_Id
			WHERE participates.User_Id = ?
				AND LunchRestaurant.Time > CURRENT_TIMESTAMP()
			ORDER BY LunchRestaurant.Time`,
			[userId],
		);
	},

	/**
	 * Fetches specific information of an lunchRestaurantId.
	 * @param {number} lunchRestaurantIdId The lunchRestaurantId to get the information of.
	 * @returns {Promise<LunchRestaurant>} Specific information about the lunchRestaurantId.
	 */
	async getLunchRestaurantById(lunchRestaurantIdId) {
		return databaseConnection.querypFirst('SELECT LunchRestaurant.*, User.* FROM LunchRestaurant INNER JOIN User ON LunchRestaurant.Host = User.User_Id WHERE LunchRestaurant.LunchRestaurant_Id = ?', [lunchRestaurantIdId]);
	},

	/**
	 * Creates a new lunchRestaurantId.
	 * @param {object} lunchRestaurantId The data of the lunchRestaurantId to create.
	 * @param {number} userId The user creating the lunchRestaurantId (host).
	 */
	async createLunchRestaurant(lunchRestaurantId, userId) {
		return databaseConnection.queryp('INSERT INTO LunchRestaurant (Host, Time, LunchImage, Lunchtext, Price) VALUES (?,?,?,?,?)', [userId, lunchRestaurantId.Time, lunchRestaurantId.LunchImage, lunchRestaurantId.LunchText, lunchRestaurantId.Price]);
	},

	/**
	 * Deletes an lunchRestaurantId.
	 * @param {number} lunchRestaurantIdId The lunchRestaurantId to delete.
	 * @returns {Promise<OkPacket>} Result of the database deletion.
	 */
	async deleteLunchRestaurant(lunchRestaurantIdId) {
		return databaseConnection.queryp('DELETE FROM LunchRestaurant WHERE LunchRestaurant_Id=?', [lunchRestaurantIdId]);
	},

	/**
	 * Updates the information about an lunchRestaurantId.
	 * @param {number} lunchRestaurantIdId The lunchRestaurantId to update.
	 * @param {object} lunchRestaurantId The new updated data of the lunchRestaurantId.
	 */
	async updateLunchRestaurant(lunchRestaurantIdId, lunchRestaurantId) {
		const eventTag = lunchRestaurantId.event ? 1 : 0;
		const privateTag = lunchRestaurantId.private ? 1 : 0;

		return databaseConnection.queryp('UPDATE LunchRestaurant SET Description=?, LunchRestaurantname=?, Place=?, Time=?, Eventtag=?, Private=?, Banner=?, MaxParticipants=? WHERE LunchRestaurant_Id=?', [lunchRestaurantId.description, lunchRestaurantId.name, lunchRestaurantId.place, lunchRestaurantId.time, eventTag, privateTag, lunchRestaurantId.banner, lunchRestaurantId.maxParticipants, lunchRestaurantIdId]);
	},

	/**
	 * Checks if the user is the host of the lunchRestaurantId.
	 * @param {number} userId The user to check.
	 * @param {number} lunchRestaurantIdId The lunchRestaurantId to check the host for.
	 * @returns {Promise<boolean>} Returns if the user is the host of the lunchRestaurantId.
	 */
	async isHost(userId, lunchRestaurantIdId) {
		return databaseConnection.querypBool('SELECT LunchRestaurant_Id FROM LunchRestaurant WHERE LunchRestaurant_Id = ? AND Host = ?', [lunchRestaurantIdId, userId]);
	},

	/**
	 * Checks if the lunchRestaurantId with id lunchRestaurantIdId is private.
	 * @param {number} lunchRestaurantIdId LunchRestaurant to check.
	 * @returns {Promise<boolean>} Returns if the lunchRestaurantId is private.
	 */
	async isPrivate(lunchRestaurantIdId) {
		return databaseConnection.querypBool('SELECT LunchRestaurant_Id FROM LunchRestaurant WHERE LunchRestaurant_Id = ? AND Private = 1', [lunchRestaurantIdId]);
	},

	/**
	 * Checks if the lunchRestaurantId with id lunchRestaurantIdId is full (max participants joined).
	 * @param {number} lunchRestaurantIdId LunchRestaurant to check
	 * @returns {Promise<boolean>} Returns if the lunchRestaurantId is full.
	 */
	async isFull(lunchRestaurantIdId) {
		return databaseConnection.querypBool(
			`SELECT LunchRestaurant_Id from LunchRestaurant WHERE LunchRestaurant_Id = ? AND MaxParticipants <= (
				SELECT COUNT(*) FROM participates WHERE LunchRestaurant_Id = ?
			) AND MaxParticipants > 0;`,
			[lunchRestaurantIdId, lunchRestaurantIdId],
		);
	},

};

module.exports = LunchRestaurant;
