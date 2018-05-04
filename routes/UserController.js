const UserModel = require('../models/UserModel');
const User = require('../models/User');

const UserController = {

	async getAllUsers(req, res) {
		try {
			const users = await UserModel.getAllUsers();

			/* res.json(users.map(user => ({
				id: user.User_Id,
				email: user.Email,
				firstName: user.Firstname,
				name: user.Name,
			}))); */
			res.json(users.map(user => (new User(User.fromDBUser(user))).getUserWithoutPassword()));
		} catch (error) {
			res.sendStatus(500);
		}
	},

	async getUserById(req, res) {
		try {
			const users = await UserModel.getUserById(req.params.id);

			if (users.length === 0) {
				res.status(404).json({
					message: 'Invalid user id.',
				});
			} else {
				res.json((new User(User.fromDBUser(users[0]))).getUserWithoutPassword());
			}
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

		try {
			const result = await UserModel.addUser(req.body);

			res.status(201).json({
				User_Id: result.insertId,
			});
		} catch (error) {
			res.sendStatus(500);
		}
	},

	deleteUser(req, res) {
		const { userId, admin } = req.token;

		if (!(Number(req.params.id) === Number(userId)
			|| admin === true)) {
			res.status(403).json({
				success: false,
				message: 'Invalid user id.',
			});
			return;
		}

		try {
			const result = UserModel.deleteUser(req.params.id);

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

		if (Number(req.params.id) !== userId) {
			res.status(403).json({
				success: false,
				message: 'Invalid user id.',
			});
			return;
		}

		try {
			const rows = await UserModel.getUserById(userId);
			const oldUser = rows[0];
			const newUser = {
				firstName: req.body.firstName || oldUser.Firstname,
				name: req.body.name || oldUser.Name,
				email: req.body.email || oldUser.Email,
				password: req.body.password || oldUser.Password,
				image: req.body.image || oldUser.Image,
			};

			const result = await UserModel.updateUser(userId, newUser);

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
