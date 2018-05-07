const UserModel = require('../models/UserModel');
const { transformUser } = require('./transforms');
// const User = require('../models/User');

/* const transformUser = dbUser => ({
	id: dbUser.User_Id,
	firstName: dbUser.Firstname,
	name: dbUser.Name,
	email: dbUser.Email,
	image: dbUser.Image,
}); */

const UserController = {

	async getAllUsers(req, res) {
		try {
			const users = await UserModel.getAllUsers();

			res.json(users.map(transformUser));
		} catch (error) {
			res.sendStatus(500);
		}
	},

	async getUserById(req, res) {
		const { userId } = req.params;

		try {
			const user = await UserModel.getUserById(userId);

			if (user) {
				res.json(transformUser(user));
				return;
			}

			res.status(404).json({
				message: 'Invalid user id.',
			});
		} catch (error) {
			res.sendStatus(500);
		}
	},

	userDataInvalid(user) {
		const {
			firstName, name, email, password, image,
		} = user;

		return !firstName
		|| typeof firstName !== 'string'
		|| firstName.length <= 0
		|| !name
		|| typeof name !== 'string'
		|| name.length <= 0
		|| !password
		|| typeof password !== 'string'
		|| password.length <= 0
		|| !image
		|| typeof image !== 'string'
		|| !email
		|| typeof email !== 'string'
		|| !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
		// /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[
		// [0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	},

	async addUser(req, res) {
		if (UserController.userDataInvalid(req.body)) {
			res.status(400).json({
				message: 'Invalid user information.',
			});
			return;
		}

		// TODO: check for double email address
		try {
			const result = await UserModel.addUser(req.body);

			res.status(201).json({
				User_Id: result.insertId,
			});
		} catch (error) {
			res.sendStatus(500);
		}
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

		try {
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
		} catch (error) {
			res.sendStatus(500);
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

		try {
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
		} catch (error) {
			res.sendStatus(500);
		}
	},

};

module.exports = UserController;
