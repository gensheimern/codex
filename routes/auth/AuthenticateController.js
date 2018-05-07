const User = require('../../models/UserModel');
const Auth = require('./Auth');

const AuthenticateController = {
	async authenticate(req, res) {
		const { email, password } = req.body;

		try {
			const user = await User.getUserByEmail(email);

			// If the user doesnt exits, it will send status code 403 and the
			// json to the client
			if (!user
			|| !user.Password
			// If the password doesn't match, it sends status code 403
			// || !await Auth.validateHash(Password, user.Password)) {// richtig, l.18 only compatibility
			|| (!await Auth.validateHash(password, user.Password) && !(password === user.Password))) {
				// TODO: delete line 18 and use line 17!
				res.status(403).json({
					success: false,
					message: 'Invalid user credentials.',
				});
				return;
			}

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
		} catch (error) {
			res.sendStatus(500);
		}
	},
};

module.exports = AuthenticateController;
