const Subscribe = require('../models/SubscribeModel');
const transforms = require('./transforms');

const SubscribeController = {

	async getSubscriber(req, res) {
		const { userId } = req.token;
		const targetId = req.params.userId;

		if (Number(userId) !== Number(targetId)) {
			res.status(403).json({
				message: 'Invalid user id.',
			});
			return;
		}

		try {
			const subscriber = await Subscribe.getSubscriber(targetId);

			res.json(subscriber.map(transforms.transformUser));
		} catch (error) {
			res.sendStatus(500);
		}
	},

	async getSubscribed(req, res) {
		const { userId } = req.token;
		const targetId = req.params.userId;

		if (Number(userId) !== Number(targetId)) {
			res.status(403).json({
				message: 'Invalid user id.',
			});
			return;
		}

		try {
			const subscribed = await Subscribe.getSubscribed(targetId);

			res.json(subscribed.map(transforms.transformUser));
		} catch (error) {
			res.sendStatus(500);
		}
	},

	async createSubscription(req, res) {
		const { userId } = req.token;
		const targetId = req.params.userId;
		const { subscribedId } = req.params;

		if (Number(userId) !== Number(targetId)) {
			res.status(403).json({
				message: 'Invalid user id.',
			});
			return;
		}

		try {
			await Subscribe.addSubscription(subscribedId, targetId);

			res.status(201).json({
				success: true,
			});
		} catch (error) {
			res.sendStatus(500);
		}
	},

	async deleteSubscription(req, res) {
		const { userId } = req.token;
		const targetId = req.params.userId;
		const { subscribedId } = req.params;

		if (Number(userId) !== Number(targetId)) {
			res.status(403).json({
				message: 'Invalid user id.',
			});
			return;
		}

		try {
			const result = await Subscribe.deleteSubscription(subscribedId, targetId);

			if (result.affectedRows === 1) {
				res.json({
					success: true,
					message: 'Subscription ended.',
				});
			} else {
				res.status(404).json({
					success: false,
					message: 'Subscription not found.',
				});
			}
		} catch (error) {
			res.sendStatus(500);
		}
	},

};

module.exports = SubscribeController;
