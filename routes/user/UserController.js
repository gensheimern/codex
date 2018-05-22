const UserModel = require('../../models/UserModel');
const { transformUser } = require('../transforms');
const { validUser } = require('./userValidation');

const UserController = {

	async getAllUsers(req, res) {
		const users = await UserModel.getAllUsers();

		res.json(users.map(transformUser));
	},

	async getUserById(req, res) {
		const { userId } = req.params;

		const user = await UserModel.getUserById(userId);

		if (user) {
			res.json(transformUser(user));
			return;
		}

		res.status(404).json({
			message: 'Invalid user id.',
		});
	},

	async addUser(req, res) {
		const userData = req.body;
		if (validUser(userData)) {
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

		const result = await UserModel.addUser(userData);

		res.status(201).json({
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

		if (Number(targetId) !== userId) {
			res.status(403).json({
				success: false,
				message: 'Invalid user id.',
			});
			return;
		}

		const oldUser = await UserModel.getUserById(targetId);
		const newUser = {
			...transformUser(oldUser),
			password: oldUser.Password,
			...req.body,
		};

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
