const Participates = require('../models/participatesModel');

const ParticipatesController = {

	async getParticipates(req, res) {
		const userId = req.token.User_Id;
		const { activityId } = req.params;

		try {
			const member = await Participates.getMemberOfActivity(activityId, userId);

			res.json(member.map(user => ({
				userId: user.User_Id,
				firstName: user.Firstname,
				name: user.Name,
				email: user.Email,
				image: user.Image,
			})));
		} catch (error) {
			res.sendStatus(500);
		}
	},

	async addParticipation() {
		// TODO
	},

	async deleteParticipation() {
		// TODO
	},

};

module.exports = ParticipatesController;
