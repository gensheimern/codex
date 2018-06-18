const fetch = require('node-fetch');
const UserModel = require('../../models/UserModel');
const transforms = require('../transforms');
const { validUser } = require('./userValidation');
const { hashPassword, validateHash, createJWT } = require('../auth/Auth');
const config = require('../../config');

const UserController = {

	async getAllUsers(req, res) {
		const { userId } = req.params;

		const users = await UserModel.getAllUsers();

		res.json(users.map(transforms(userId).transformUser));
	},

	async getUserById(req, res) {
		const { userId } = req.params;

		const user = await UserModel.getUserById(userId);

		if (user) {
			res.json(transforms(userId).transformUser(user));
			return;
		}

		res.status(404).json({
			message: 'Invalid user id.',
		});
	},

	async addUser(req, res) {
		const userData = req.body;
		if (!validUser(userData)) {
			res.status(400).json({
				message: 'Invalid user information.',
			});
			return;
		}

		const user = await UserModel.getUserByEmail(userData.email);
		if (user) {
			res.status(409).json({
				message: 'E-Mail address already in use.',
			});
			return;
		}

		const { captcha } = req.body;
		const captchaVerification = await fetch(`
			https://www.google.com/recaptcha/api/siteverify?secret=${config.CAPTCHA_KEY}&response=${captcha}`, { method: 'POST' })
			.then(resp => resp.json());

		if (!captchaVerification.success) {
			res.status(400).json({
				message: 'Captcha not solved.',
			});
			return;
		}

		const result = await UserModel.addUser(userData);

		// Create token and login user
		const payload = {
			userId: result.insertId,
			firstName: userData.firstName,
			name: userData.name,
			email: userData.email,
		};
		const token = await createJWT(payload);

		res.status(201).json({
			token,
			userId: result.insertId,
		});
	},

	async deleteUser(req, res) {
		const { userId, admin } = req.token;
		const targetId = req.params.userId;

		if (!(Number(targetId) === Number(userId)
			|| admin === true)) {
			res.status(403).json({
				success: false,
				message: 'Invalid user id.',
			});
			return;
		}

		const result = await UserModel.deleteUser(targetId);
		// TODO delete all subscriptions

		if (result.affectedRows === 0) {
			res.status(404).json({
				success: false,
				message: 'Invalid user id.',
			});
		} else {
			res.json({
				success: true,
				message: 'User deleted.',
			});
		}
	},

	async updateUser(req, res) {
		const { userId } = req.token;
		const targetId = req.params.userId;

		/* if (!validUser(req.body)) {
			res.status(400).json({
				success: false,
				message: 'Invalid user information.',
			});
			return;
		} */

		if (Number(targetId) !== userId) {
			res.status(403).json({
				success: false,
				message: 'Invalid user id.',
			});
			return;
		}

		const oldUser = await UserModel.getUserById(targetId);
		const newUser = {
			...transforms().transformUser(oldUser),
			password: oldUser.Password,
			...req.body,
		};

		const { oldPassword, password } = req.body;

		let validOldPassword = false;
		try {
			validOldPassword = await validateHash(oldPassword, oldUser.Password);
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
			newUser.password = await hashPassword(password);
		} else {
			newUser.password = oldUser.Password;
		}

		const result = await UserModel.updateUser(targetId, newUser);

		if (result.affectedRows === 0) {
			res.status(404).json({
				success: false,
				message: 'Invalid user id.',
			});
		} else {
			res.json({
				success: true,
				message: 'User successfully updated.',
			});
		}
	},

};

module.exports = UserController;
