const Subscribe = require('../../models/SubscribeModel');
const transforms = require('../transforms');

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

		const subscriber = await Subscribe.getSubscriber(targetId);

		res.json(subscriber.map(transforms.transformUser));
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

		const subscribed = await Subscribe.getSubscribed(targetId);

		res.json(subscribed.map(transforms.transformUser));
	},

	async createSubscription(req, res) {
		const { userId } = req.token;
		const targetId = req.params.userId;
		const { subscribedId } = req.params;

		// TODO: Check for existing subscriptions
		if (Number(userId) !== Number(targetId)) {
			res.status(403).json({
				message: 'Invalid user id.',
			});
			return;
		}

		await Subscribe.addSubscription(subscribedId, targetId);

		res.status(201).json({
			success: true,
			message: 'Subscription created.',
		});
	},

	async deleteSubscription(req, res) {
		const { userId } = req.token;
		const targetId = req.params.userId;
		const { subscribedId } = req.params;

		if (Number(userId) !== Number(targetId)) {
			res.status(403).json({
				success: false,
				message: 'Invalid user id.',
			});
			return;
		}

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
	},

};

module.exports = SubscribeController;
