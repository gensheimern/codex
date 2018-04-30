const Subscribe = require('../models/SubscribeModel');

SubscribeController = {

	async getSubscriber(req, res) {
		const userId = req.token.User_Id;

		try {
			let subscriber = await Subscribe.getSubscriber(userId);

			res.json(subscriber.map(subscriber => ({
				User_Id: subscriber.User_Id,
				Firstname: subscriber.Firstname,
				Name: subscriber.Name,
				Email: subscriber.Email,
				Image: subscriber.Email
			})));
		} catch (error) {
			res.sendStatus(500);
		}
	},

	async getSubscribed(req, res) {
		const userId = req.token.User_Id;

		try {
			let subscribed = await Subscribe.getSubscribed(userId);

			res.json(subscribed.map(subscriber => ({
				User_Id: subscriber.User_Id,
				Firstname: subscriber.Firstname,
				Name: subscriber.Name,
				Email: subscriber.Email,
				Image: subscriber.Email
			})));
		} catch (error) {
			res.sendStatus(500);
		}
	},

	async createSubscription(req, res) {
		const userId = req.token.User_Id;
		const subscribedId = req.params.id;

		try {
			let result = await Subscribe.addSubscription(subscribedId, userId);

			res.status(201).json({
				success: true
			});
		} catch (error) {
			res.sendStatus(500);
		}
	},

	async deleteSubscription(req, res) {
		const userId = req.token.User_Id;
		const subscribedId = req.params.id;

		try {
			let result = await Subscribe.deleteSubscription(subscribedId, userId);

			if(result.affectedRows === 1) {
				res.json({
					success: true,
					message: "Subscription ended."
				});
			}
			else {
				res.status(404).json({
					success: false,
					message: "Subscription not found."
				});
			}
			res.status(201).json({
				success: true
			});
		} catch (error) {
			res.sendStatus(500);
		}
	}

}

module.exports = SubscribeController;
