const Team = require('../models/TeamModel');
const Member = require('../models/MemberModel');

const TeamController = {

	async getAllTeams(req, res) {
		const { userId } = req.token;

		try {
			const teams = await Team.getAllTeams(userId);

			res.json(teams.map(team => ({
				id: team.Team_Id,
				name: team.Teamname,
				managerName: team.Name,
				managerFirstName: team.Firstname,
			}
			)));
		} catch (error) {
			res.sendStatus(500);
		}
	},

	async getTeamById(req, res) {
		const { userId } = req.token;

		try {
			const teams = await Team.getTeamById(req.params.id, userId);

			if (teams.length === 0) {
				res.status(404).json({
					message: `Team with ID ${req.params.id} not found.`,
				});
				return;
			}

			res.json({
				id: teams[0].Team_Id,
				name: teams[0].Teamname,
				managerFirstName: teams[0].Firstname,
				managerName: teams[0].Name,
			});
		} catch (error) {
			res.sendStatus(500);
		}
	},

	async addTeam(req, res) {
		const { userId } = req.token;

		if (!req.body.name) {
			res.status(400).json({
				message: 'Invalid team name',
			});
			return;
		}

		try {
			const dbRes = await Team.addTeam(req.body.name, userId);
			await Member.addMember(userId, dbRes.insertId);

			res.status(201).json({
				teamId: dbRes.insertId,
			});
		} catch (error) {
			res.sendStatus(500);
		}
	},

	async deleteTeam(req, res) {
		const { userId } = req.token;

		try {
			const dbRes = await Team.deleteTeam(req.params.id, userId);

			if (dbRes.affectedRows === 0) {
				res.status(404).json({
					message: `Team with ID ${req.params.id} not found.`,
				});
			} else {
				res.status(200).json({
					message: 'Team deleted.',
				});
			}
		} catch (error) {
			res.sendStatus(500);
		}
	},

	async updateTeam(req, res) {
		const { userId } = req.token;

		if (!req.body.name) {
			res.status(400).json({
				success: false,
				message: 'Invalid new team name.',
			});
			return;
		}

		try {
			const dbRes = await Team.updateTeam(req.params.id, req.body.name, userId);

			if (dbRes.affectedRows === 0) {
				res.status(404).json({
					success: false,
					message: `Team with ID ${req.params.id} not found.`,
				});
			} else {
				res.status(200).json({
					success: true,
					message: 'Team information updated.',
				});
			}
		} catch (error) {
			res.sendStatus(500);
		}
	},

};

module.exports = TeamController;
