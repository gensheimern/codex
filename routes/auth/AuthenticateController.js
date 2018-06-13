const User = require('../../models/UserModel');
const Auth = require('./Auth');

/**
 * Handles all requests related to authentification and resource access.
 */
const AuthenticateController = {
	/**
	 * Verifies the users credentials (email and password) with the database and sends
	 * an access token back if the credentials are valid.
	 * @param {Request} req The request of the client containing email and password.
	 * @param {Response} res The response sent back to the client.
	 */
	async authenticate(req, res) {
		// Credentials sent by the client.
		const { email, password } = req.body;

		const user = await User.getUserByEmail(email.toLowerCase());

		if (!user || !user.Password) {
			res.status(403).json({
				success: false,
				message: 'Invalid user credentials.',
			});
			return;
		}

		const validPassword = await Auth.validateHash(password, user.Password);


		// If the user doesn't exits, it will send status code 403 and the json to the client
		if (!validPassword) {
			res.status(403).json({
				success: false,
				message: 'Invalid user credentials.',
			});
			return;
		}

		// Create authentification token (json-web-token);
		const payload = {
			userId: user.User_Id,
			firstName: user.Firstname,
			name: user.Name,
			email: user.Email,
		};
		const token = await Auth.createJWT(payload);

		res.json({
			token,
			success: true,
			message: 'Valid user credentials.',
		});
	},
};

module.exports = AuthenticateController;
