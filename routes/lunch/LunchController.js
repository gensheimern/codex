const LunchModel = require('../../models/LunchModel');
const ParticipatesModel = require('../../models/participatesModel');
const NotificationModel = require('../../models/NotificationModel');
const transforms = require('../transforms');
const { validLunch } = require('./lunchValidation');

const LunchController = {

	async getAllLunch(req, res) {
		const { restaurantId } = req.token;
		console.log("drin");
		const lunch = await LunchModel.getAllLunch(restaurantId);
		res.json(lunch);
	},

	async getJoinedLunch(req, res) {
		const { restaurantId } = req.token;

		const lunch = await LunchModel.getJoinedLunch(restaurantId);
		res.json(lunch.map(transforms(restaurantId).transformLunch));
	},

	async getLunchById(req, res) {
		const { restaurantId } = req.token;
		const { lunchId } = req.params;

		const lunchPromise = LunchModel.getLunchById(lunchId);

		const isParticipant = await ParticipatesModel.isParticipant(restaurantId, lunchId);
		const isPrivate = await LunchModel.isPrivate(lunchId);

		if (!isParticipant && isPrivate) {
			res.status(403).json({
				message: 'Permission denied.',
			});
			return;
		}

		const lunch = await lunchPromise;

		if (lunch === null) {
			res.status(404).json({
				message: 'Lunch not found',
			});
		} else {
			res.json(transforms(restaurantId).transformLunch(lunch));
		}
	},

	async createLunch(req, res) {
		const { restaurantId } = req.token;
		const lunch = req.body;

		const result = await LunchModel.createLunchRestaurant(lunch, restaurantId);

		res.status(201).json({
			lunchId: result.insertId,
			message: 'Success. Lunch added.' ,
		});
	},

	async deleteLunch(req, res) {
		const { restaurantId } = req.token;
		const { lunchId } = req.params;

		// TODO: Check if user is admin of lunch
		const isHost = await LunchModel.isHost(restaurantId, lunchId);

		if (!isHost) {
			res.status(403).json({
				success: false,
				message: 'Invalid lunch id.',
			});
			return;
		}

		const result = await LunchModel.deleteLunch(lunchId, restaurantId);

		if (result.affectedRows === 1) {
			res.json({
				success: true,
				message: 'Lunch successfully deleted.',
			});
		} else {
			res.status(404).json({
				success: false,
				message: 'Lunch not found.',
			});
		}
	},

	async updateLunch(req, res) {
		const { restaurantId } = req.token;
		const { lunchId } = req.params;
		const newLunch = req.body;

		if (!validLunch(newLunch)) {
			res.status(400).json({
				message: 'Invalid event information.',
			});
			return;
		}

		// TODO: Check if user is admin of lunch
		const isHost = await LunchModel.isHost(restaurantId, lunchId);

		if (!isHost) {
			res.status(403).json({
				success: false,
				message: 'Lunch not found.',
			});
			return;
		}

		const result = await LunchModel.updateLunch(lunchId, newLunch);

		NotificationModel.notifyEvent(lunchId, 'notification', 'Event updated', `The event ${newLunch.name} changed.`, lunchId, null);

		if (result.affectedRows === 1) {
			res.json({
				success: true,
				message: 'Lunch successfully updated.',
			});
		} else {
			res.status(404).json({
				success: false,
				message: 'Lunch not found.',
			});
		}
	},

};

module.exports = LunchController;
