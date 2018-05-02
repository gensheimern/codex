const Participates = require('../models/participatesModel');

ParticipatesController = {

	async getParticipates(req, res) {
		const userId = req.token.User_Id;
		const activityId = req.params.id;

		try {
			let member = await Participates.getMemberOfActivity(activityId, userId);

			res.json(member.map(user => ({
				User_Id: user.User_Id,
				Firstname: user.Firstname,
				Name: user.Name,
				Email: user.Email,
				Image: user.Image
			})));
		} catch (error) {
			res.sendStatus(500);
		}
	},

	async addParticipation(req, res) {
		// TODO
	},

	async deleteParticipation(req, res) {
		// TODO
	}

}

module.exports = ParticipatesController;
