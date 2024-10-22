const Restaurant = require('../../models/RestaurantModel');
const Auth = require('./Auth');

const AuthenticateController = {
	async authenticate(req, res) {
		const { email, password } = req.body;

		const restaurant = await Restaurant.getRestaurantByEmail(email.toLowerCase());
		if (!restaurant || !restaurant.Password) {
			res.status(403).json({
				success: false,
				message: 'Invalid restaurant credentials.',
			});
			return;
		}

		const validPassord = await Auth.validateHash(password, restaurant.Password);

		if (!validPassord) {
			res.status(403).json({
				success: false,
				message: 'Invalid restaurant credentials.',
			});
			return;
		}

		const payload = {
			restaurantId: restaurant.Restaurant_Id,
			firstName: restaurant.Firstname,
			name: restaurant.Name,
			email: restaurant.Email,
		};
		const token = await Auth.createJWT(payload);

		res.json({
			token,
			success: true,
			message: 'Valid restaurant credentials.',
		});
	},
};

module.exports = AuthenticateController;
