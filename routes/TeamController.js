const TeamModel = require('../models/TeamModel');
const MemberModel = require('../models/MemberModel');
const { transformTeam } = require('./transforms');

/* const transformTeam = dbTeam => ({
	id: dbTeam.Team_Id,
	name: dbTeam.Teamname,
	managerName: dbTeam.Name,
	managerFirstName: dbTeam.Firstname,
}); */

const TeamController = {

	async getAllTeams(req, res) {
		const { userId } = req.token;

		try {
			const teams = await TeamModel.getAllTeams(userId);

			res.json(teams.map(transformTeam));
		} catch (error) {
			res.sendStatus(500);
		}
	},

	async getTeamById(req, res) {
		const { userId } = req.token;
		const { teamId } = req.params;

		try {
			const isMember = MemberModel.isMember(teamId, userId);

			const team = await TeamModel.getTeamById(teamId, userId);

			if (team === null || !(await isMember)) {
				res.status(404).json({
					message: `Team with ID ${teamId} not found.`,
				});
				return;
			}

			res.json(transformTeam(team));
		} catch (error) {
			res.sendStatus(500);
		}
	},

	async addTeam(req, res) {
		const { userId } = req.token;

		// TODO: Check name
		if (!req.body.name) {
			res.status(400).json({
				message: 'Invalid team name',
			});
			return;
		}

		try {
			const dbRes = await TeamModel.addTeam(req.body.name, userId);
			await MemberModel.addMember(userId, dbRes.insertId);

			res.status(201).json({
				teamId: dbRes.insertId,
			});
		} catch (error) {
			res.sendStatus(500);
		}
	},

	async deleteTeam(req, res) {
		const { userId } = req.token;
		const { teamId } = req.params;

		try {
			const dbRes = await TeamModel.deleteTeam(teamId, userId);
			// TODO delete all memberships

			if (dbRes.affectedRows === 0) {
				res.status(404).json({
					success: false,
					message: `Team with ID ${teamId} not found.`,
				});
			} else {
				res.status(200).json({
					success: true,
					message: 'Team deleted.',
				});
			}
		} catch (error) {
			res.sendStatus(500);
		}
	},

	async updateTeam(req, res) {
		const { userId } = req.token;
		const { teamId } = req.params;
		const newName = req.body.name;

		// TODO: check name
		if (!newName) {
			res.status(400).json({
				success: false,
				message: 'Invalid new team name.',
			});
			return;
		}

		try {
			const dbRes = await TeamModel.updateTeam(teamId, newName, userId);

			if (dbRes.affectedRows === 0) {
				res.status(404).json({
					success: false,
					message: `Team with ID ${teamId} not found.`,
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
