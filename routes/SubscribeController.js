const Subscribe = require('../models/SubscribeModel');

const SubscribeController = {

	async getSubscriber(req, res) {
		const userId = req.token.User_Id;
		const targetId = req.params.userId;

		if (Number(userId) !== Number(targetId)) {
			res.status(403).json({
				message: 'Invalid user id.',
			});
			return;
		}

		try {
			const subscriberRow = await Subscribe.getSubscriber(targetId);

			res.json(subscriberRow.map(subscriber => ({
				userId: subscriber.User_Id,
				firstName: subscriber.Firstname,
				name: subscriber.Name,
				email: subscriber.Email,
				image: subscriber.Image,
			})));
		} catch (error) {
			res.sendStatus(500);
		}
	},

	async getSubscribed(req, res) {
		const userId = req.token.User_Id;
		const targetId = req.params.userId;

		if (Number(userId) !== Number(targetId)) {
			res.status(403).json({
				message: 'Invalid user id.',
			});
			return;
		}

		try {
			const subscribed = await Subscribe.getSubscribed(targetId);

			res.json(subscribed.map(subscriber => ({
				userId: subscriber.User_Id,
				firstName: subscriber.Firstname,
				name: subscriber.Name,
				email: subscriber.Email,
				image: subscriber.Image,
			})));
		} catch (error) {
			res.sendStatus(500);
		}
	},

	async createSubscription(req, res) {
		const userId = req.token.User_Id;
		const targetId = req.params.userId;
		const subscribedId = req.params.id;

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
		const userId = req.token.User_Id;
		const targetId = req.params.userId;
		const subscribedId = req.params.id;

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
			res.status(201).json({
				success: true,
			});
		} catch (error) {
			res.sendStatus(500);
		}
	},

};

module.exports = SubscribeController;
