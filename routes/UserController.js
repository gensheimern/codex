const User = require('../models/UserModel');

UserController = {

	async getAllUsers(req, res) {
		try {
			let users = await User.getAllUsers();

			res.json(users);
		} catch (error) {
			res.sendStatus(500);
		}
	},

	async getUserById(req, res) {
		try {
			let users = await User.getUserById(req.params.id);

			if(users.length === 0) {
				res.status(404).json({
					message: "Invalid user id."
				});
			}
			else {
				res.json(users[0]);
			}
		} catch (error) {
			res.sendStatus(500);
		}
	},

	userDataInvalid(user) {
		return !user.Firstname
		|| !user.Firstname instanceof String
		|| user.Firstname.length <= 0
		|| !user.Name
		|| !user.Name instanceof String
		|| user.Name.length <= 0
		|| !user.Password
		|| !user.Password instanceof String
		|| user.Password.length <= 0
		|| !user.Email
		|| !user.Email instanceof String
		|| !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(user.Email);
	},

	async addUser(req, res) {
		if(UserController.userDataInvalid(req.body)) {
			return res.status(400).json({
				message: "Invalid user information."
			});
		}

		req.body.Image = ""; // TODO Change

		try {
			let result = await User.addUser(req.body);

			res.status(201).json({
				User_Id: result.insertId
			});
		} catch (error) {
			res.sendStatus(500);
		}
	},

	deleteUser(req, res) {
		const userID = req.token.User_Id;

		if(!(parseInt(req.params.id) === parseInt(req.token.User_Id)
			|| req.token.admin === true)) {
			return res.status(403).json({
				success: false,
				message: "Invalid user id."
			});
		}

		try {
			let affectedRows = User.deleteUser(req.params.id);

			if(affectedRows === 0) {
				res.status(404).json({
					success: false,
					message: "Invalid user id."
				});
			}
			else {
				res.json({
					success: true,
					message: "User deleted."
				});
			}
		} catch (error) {
			res.sendStatus(500);
		}
	},

	async updateUser(req, res) {
		const userID = req.token.User_Id;

		if(Number(req.params.id) !== userID) {
			return res.status(403).json({
				success: false,
				message: "Invalid user id."
			});
		}

		try {
			let oldUser = await User.getUserByIdWithPw(userID);
			oldUser = oldUser[0];
			let newUser = {
				Firstname: req.body.Firstname || oldUser.Firstname,
				Name: req.body.Name || oldUser.Name,
				Email: req.body.Email || oldUser.Email,
				Password: req.body.Password || oldUser.Password
			}

			let result = await User.updateUser(userID, newUser);

			if(result.affectedRows === 0) {
				res.status(404).json({
					success: false,
					message: "Invalid user id."
				});
			}
			else {
				res.json({
					success: true,
					message: "User successfully updated."
				});
			}
		} catch (error) {
			res.sendStatus(500);
		}
	}

}

module.exports = UserController;