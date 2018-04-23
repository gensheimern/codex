const User = require('../models/UserModel');

UserController = {

	getAllUsers(req, res) {
		User.getAllUser(function(err, rows) {
			if (err) return res.sendStatus(500);
	
			res.json(rows.map(elem => {
				return {
					User_Id: elem.User_Id,
					Firstname: elem.Firstname,
					Name: elem.Name,
					Email: elem.Email
				};
			}));
		});
	},

	getUserById(req, res) {
		User.getUserById(req.params.id, function(err, rows) {
			if (err) return res.sendStatus(500);
			
			if(rows.length === 0) {
				res.status(404).json({
					message: "Invalid user id."
				});
			}
			else {
				rows[0].Password = undefined;
				res.json(rows[0]);
			}
		});
	},

	addUser(req, res) {
		User.addUser(req.body, function(err, count) {
			if (err) return res.sendStatus(500);
	
			res.status(201).json({
				User_Id: count.insertId
			});
		});
	},

	deleteUser(req, res) {
		User.deleteUser(req.params.id, function(err, count) {
			if (err) return res.sendStatus(500);
	
			if(count.affectedRows === 0) {
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
		});
	},

	updateUser(req, res) {
		User.updateUser(req.params.id, req.body, function(err, rows) {
			if (err) return res.sendStatus(500);
	
			if(rows.affectedRows === 0) {
				res.status(404).json({
					success: false,
					message: "Invalid user id."
				});
			}
			else {
				res.json({
					success: true,
					message: "User updated."
				});
			}
		});
	}

}

module.exports = UserController;