const databaseConnection = require('./DatabaseConnection');
const { hashPassword } = require('../routes/auth/Auth');

const User = {

	/**
	 * Returns all users.
	 * @returns {Promise<Array<User>>} Returns an array of all users.
	 */
	async getAllUsers() {
		return databaseConnection.queryp('SELECT * FROM User');
	},

	/**
	 * Returns specific information about one user.
	 * @param {number} userId The user id to get the information for.
	 * @returns {Promise<User>} The data of the specified user.
	 */
	async getUserById(userId) {
		return databaseConnection.querypFirst('SELECT * FROM User WHERE User_Id = ?', [userId]);
	},

	/**
	 * Returns the corresponding user for a given e-mail address.
	 * @param {string} email The email address to get the user for.
	 * @returns {Promise<User>} The data of the user with the e-mail address.
	 */
	async getUserByEmail(email) {
		return databaseConnection.querypFirst('SELECT * FROM User WHERE Email = ?', [email]);
	},

	/**
	 * Adds a new user to the database.
	 * @param {object} user The data of the new user to create.
	 * @returns {Promise<DBResult>} The result of the database insertion.
	 */
	async addUser(user) {
		return databaseConnection.queryp('INSERT INTO User (Firstname, Name, Email, Password, Image) VALUES (?,?,?,?,?)', [user.firstName, user.name, user.email.toLowerCase(), await hashPassword(user.password), user.image]);
	},

	/**
	 * Deletes the user with the id userId.
	 * @param {number} userId The id of the user to delete.
	 * @returns {Promise<DBResult>} The result of the database deletion.
	 */
	async deleteUser(userId) {
		return databaseConnection.queryp('DELETE FROM User WHERE User_Id = ?', [userId]);
	},

	/**
	 * Updates the data of a user.
	 * @param {number} userId The id of the user to update.
	 * @param {object} newUser The new data to update the user.
	 * @returns {Promise<DBResult>} The result of the database update.
	 */
	async updateUser(userId, newUser) {
		return databaseConnection.queryp('UPDATE User SET Firstname=?, Name=?, Email=?, Password=?, Image=? where User_Id=?', [newUser.firstName, newUser.name, newUser.email.toLowerCase(), newUser.password, newUser.image, userId]);
	},

	/**
	 * Returns the organization the user is currently in.
	 * @param {number} userId The id of the user to get the organization of.
	 * @returns  {Promise<DBResult>} The organization the user is currently in.
	 */
	async getOrganization(userId) {
		return new Promise((resolve, reject) => {
			databaseConnection.querypFirst('SELECT Organization_Id FROM part_of WHERE User_Id = 1 AND Active = 1', [userId])
				.then((res) => {
					resolve(res ? res.Organization_Id : null);
				})
				.catch(reject);
		});
	},

};


module.exports = User;
