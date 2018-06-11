const databaseConnection = require('./DatabaseConnection');
const { hashPassword } = require('../routes/auth/Auth');

const Restaurant = {

	/**
	 * Returns all Restaurants.
	 * @returns {Promise<Array<Restaurant>>} Returns an array of all Restaurants.
	 */
	async getAllRestaurants() {
		return databaseConnection.queryp('SELECT * FROM Restaurant');
	},

	/**
	 * Returns specific information about one Restaurant.
	 * @param {number} RestaurantId The Restaurant id to get the information for.
	 * @returns {Promise<Restaurant>} The data of the specified Restaurant.
	 */
	async getRestaurantById(RestaurantId) {
		return databaseConnection.querypFirst('SELECT * FROM Restaurant WHERE Restaurant_Id = ?', [RestaurantId]);
	},

	/**
	 * Returns the corresponding Restaurant for a given e-mail address.
	 * @param {string} email The email address to get the Restaurant for.
	 * @returns {Promise<Restaurant>} The data of the Restaurant with the e-mail address.
	 */
	async getRestaurantByEmail(email) {
		return databaseConnection.querypFirst('SELECT * FROM Restaurant WHERE Email = ?', [email]);
	},

	/**
		* Adds a new Restaurant to the database.
	 	* @param {object} restaurant The data of the new Restaurant to create.
	 	* @returns {Promise<DBResult>} The result of the database insertion.
	 */
	async addRestaurant(restaurant) {
		return databaseConnection.queryp('INSERT INTO Restaurant (GooglePlaces_Id, Name, Email, Password, Place, Zipcode, Street, StreetNumber) VALUES (?,?,?,?,?,?,?,?)', [restaurant.googlePlacesId, restaurant.name, restaurant.email.toLowerCase(), await hashPassword(restaurant.password), restaurant.place, restaurant.zipcode, restaurant.street, restaurant.streetNumber]);
	},

	/**
	 * Deletes the Restaurant with the id RestaurantId.
	 * @param {number} RestaurantId The id of the Restaurant to delete.
	 * @returns {Promise<DBResult>} The result of the database deletion.
	 */
	async deleteRestaurant(RestaurantId) {
		return databaseConnection.queryp('DELETE FROM Restaurant WHERE Restaurant_Id = ?', [RestaurantId]);
	},

	/**
	 * Updates the data of a Restaurant.
	 * @param {number} RestaurantId The id of the Restaurant to update.
	 * @param {object} newRestaurant The new data to update the Restaurant.
	 * @returns {Promise<DBResult>} The result of the database update.
	 */
	async updateRestaurant(RestaurantId, newRestaurant) {
		return databaseConnection.queryp('UPDATE Restaurant SET Firstname=?, Name=?, Email=?, Password=?, Image=? where Restaurant_Id=?', [newRestaurant.firstName, newRestaurant.name, newRestaurant.email.toLowerCase(), newRestaurant.password, newRestaurant.image, RestaurantId]);
	},

};


module.exports = Restaurant;
