const jwt = require('jsonwebtoken');
const User = require('../../models/UserModel');

AuthenticateController = {
	async authenticate(req, res) {
		const {Email, Password} = req.body;

		try {
			let rows = await User.getUserByEmail(Email);
			
			// If the user doesnt exits, it will send status code 403 and the
			// json to the client
			if (!rows[0] || rows[0].Password != req.body.Password) { //If the password doesn't match, it sends status code 403
				res.status(403).json({
					success: false,
					message: "Invalid user credentials."
				});
			}
			else {
				//If the password match, send the token back to the client,
				//including expiration Date which is 24 hours
				const token = jwt.sign({
					User_Id: rows[0].User_Id,
					Firstname: rows[0].Firstname,
					Name: rows[0].Name,
					Email: rows[0].Email,
					iat: Math.floor(Date.now() / 1000),
					exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24)
				}, 'secret');
		
					//console.log(token);
				res.json({
					success: true,
					message: "Valid user credentials.",
					token: token
				});
			}
		} catch (error) {
			res.sendStatus(500);
		}
	}
}

module.exports = AuthenticateController;