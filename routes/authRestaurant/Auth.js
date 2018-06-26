const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../../config');

// The number of round the password hash is salted.
const saltRounds = 10;

const Auth = {

	/**
	 * @description Returns the hashed password.
	 * @param {string} password The password to be hashed.
	 * @returns {Promise<string>} The hash of the password.
	 */
	async hashPassword(password) {
		return bcrypt.hash(password, saltRounds);
	},

	/**
	 * @describe Checks if the password matches the hash.
	 * @param {string} password The password to check.
	 * @param {string} hash The hash to check.
	 * @returns {Promise<boolean>} Returns if the password matches the hash.
	 */
	async validateHash(password, hash) {
		return bcrypt.compare(password, hash);
	},

	/**
	 * @param {object} payload The payload contained in the token.
	 * @param {string} secret Secret to sign the token with.
	 * @param {number} validity Validity of the token after issuing in seconds. Default 24 hours.
	 * @returns {Promise<string>} Token generated from the payload and the secret.
	 */
	async createJWT(payload, validity = (60 * 60 * 24)) {
		const tokenPayload = JSON.parse(JSON.stringify(payload));
		if (!tokenPayload.iat) {
			tokenPayload.iat = Math.floor(Date.now() / 1000);
		}

		if (!tokenPayload.exp) {
			tokenPayload.exp = Math.floor(Date.now() / 1000) + validity;
		}

		return new Promise((resolve, reject) => {
			jwt.sign(tokenPayload, config.RESTAURANT_SECRET, (err, token) => {
				if (err) reject(err);
				else resolve(token);
			});
		});
	},

	/**
	 * @param {string} token The token to validate.
	 * @param {string} secret Secret to validate the token.
	 * @returns {Promise<object>} The payload that was encoded in the token.
	 */
	async validateJWT(token) {
		return new Promise((resolve, reject) => {
			jwt.verify(token, config.RESTAURANT_SECRET, (err, decoded) => {
				if (err) reject(err);
				else resolve(decoded);
			});
		});
	},

	/**
	 * @description Validated the passed JSON web token and sends status 403 if invalid.
	 * @param {Request} req The request received by the server.
	 * @param {Response} res The response sent to the client.
	 * @param {NextFunction} next A callback to handle the request.
	 */
	async verifyMiddlewareRestaurant(req, res, next) {
		const token = req.headers['x-access-token'];

		try {
			const decoded = await Auth.validateJWT(token);
			req.token = decoded;
			next();
		} catch (error) {
			res.status(401).json({
				success: false,
				message: 'Invalid verification token.',
			});
		}
	},

};

module.exports = Auth;
