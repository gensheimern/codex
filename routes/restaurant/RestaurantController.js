const RestaurantModel = require('../../models/RestaurantModel');
const transforms = require('../transforms');
const { hashPassword, validateHash } = require('../auth/Auth');

const RestaurantController = {

	async getAllRestaurants(req, res) {
		const { RestaurantId } = req.params;

		const Restaurants = await RestaurantModel.getAllRestaurants();
		console.log(Restaurants);
		res.json(Restaurants.map(transforms(RestaurantId).transformRestaurant));
	},

	async getRestaurantById(req, res) {
		const { RestaurantId } = req.params;

		const Restaurant = await RestaurantModel.getRestaurantById(RestaurantId);

		if (Restaurant) {
			res.json(transforms(RestaurantId).transformRestaurant(Restaurant));
			return;
		}

		res.status(404).json({
			message: 'Invalid Restaurant id.',
		});
	},

	async addRestaurant(req, res) {
		const RestaurantData = req.body;

		const Restaurant = await RestaurantModel.getRestaurantByEmail(RestaurantData.email);
		if (Restaurant) {
			res.status(409).json({
				message: 'E-Mail address already in use.',
			});
			return;
		}

		const result = await RestaurantModel.addRestaurant(RestaurantData);

		res.status(201).json({
			RestaurantId: result.insertId,
		});
	},

	async deleteRestaurant(req, res) {
		const { RestaurantId, admin } = req.token;
		const targetId = req.params.RestaurantId;

		if (!(Number(targetId) === Number(RestaurantId)
			|| admin === true)) {
			res.status(403).json({
				success: false,
				message: 'Invalid Restaurant id.',
			});
			return;
		}

		const result = await RestaurantModel.deleteRestaurant(targetId);
		// TODO delete all subscriptions

		if (result.affectedRows === 0) {
			res.status(404).json({
				success: false,
				message: 'Invalid Restaurant id.',
			});
		} else {
			res.json({
				success: true,
				message: 'Restaurant deleted.',
			});
		}
	},

	async updateRestaurant(req, res) {
		const { RestaurantId } = req.token;
		const targetId = req.params.RestaurantId;

		/* if (!validRestaurant(req.body)) {
			res.status(400).json({
				success: false,
				message: 'Invalid Restaurant information.',
			});
			return;
		} */

		if (Number(targetId) !== RestaurantId) {
			res.status(403).json({
				success: false,
				message: 'Invalid Restaurant id.',
			});
			return;
		}

		const oldRestaurant = await RestaurantModel.getRestaurantById(targetId);
		const newRestaurant = {
			...transforms().transformRestaurant(oldRestaurant),
			password: oldRestaurant.Password,
			...req.body,
		};

		const { oldPassword, password } = req.body;

		let validOldPassword = false;
		try {
			validOldPassword = await validateHash(oldPassword, oldRestaurant.Password);
		} catch (error) {
			validOldPassword = false;
		}

		if (!validOldPassword) {
			res.status(401).json({
				success: false,
				message: 'Invalid old password.',
			});
			return;
		}

		if (password) {
			newRestaurant.password = await hashPassword(password);
		} else {
			newRestaurant.password = oldRestaurant.Password;
		}

		const result = await RestaurantModel.updateRestaurant(targetId, newRestaurant);

		if (result.affectedRows === 0) {
			res.status(404).json({
				success: false,
				message: 'Invalid Restaurant id.',
			});
		} else {
			res.json({
				success: true,
				message: 'Restaurant successfully updated.',
			});
		}
	},

};

module.exports = RestaurantController;
