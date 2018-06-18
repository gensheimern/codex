const TeamModel = require('../../models/TeamModel');
const MemberModel = require('../../models/MemberModel');
const NotificationModel = require('../../models/NotificationModel');
const transforms = require('../transforms');
const { validTeam } = require('./teamValidation');
const LiveSync = require('../LiveSync');

const TeamController = {

	async getAllTeams(req, res) {
		const { userId } = req.token;

		const teams = await TeamModel.getAllTeams(userId);

		res.json(teams.map(transforms(userId).transformTeam));
	},

	async getTeamById(req, res) {
		const { userId } = req.token;
		const { teamId } = req.params;

		const isMember = MemberModel.isMember(teamId, userId);
		const teamPromise = TeamModel.getTeamById(teamId, userId);

		await Promise.all([isMember, teamPromise]);

		const team = await teamPromise;

		if (team === null || !(await isMember)) {
			res.status(404).json({
				message: `Team with ID ${teamId} not found.`,
			});
			return;
		}

		res.json(transforms(userId).transformTeam(team));
	},

	async addTeam(req, res) {
		const { userId } = req.token;
		const { name, description } = req.body;

		if (!validTeam(name)) {
			res.status(400).json({
				message: 'Invalid team name',
			});
			return;
		}

		const dbRes = await TeamModel.addTeam(name, description, '', userId);// TODO: Add team icon
		await MemberModel.addMember(userId, dbRes.insertId, true);

		LiveSync.teamAllChanged(dbRes.insertId);

		res.status(201).json({
			teamId: dbRes.insertId,
		});
	},

	async deleteTeam(req, res) {
		const { userId } = req.token;
		const { teamId } = req.params;

		const dbRes = await TeamModel.deleteTeam(teamId, userId);
		// TODO delete all memberships

		LiveSync.teamAllChanged(teamId);

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
	},

	async updateTeam(req, res) {
		const { userId } = req.token;
		const { teamId } = req.params;
		const newName = req.body.name;

		if (!validTeam(newName)) {
			res.status(400).json({
				success: false,
				message: 'Invalid new team name.',
			});
			return;
		}

		const dbRes = await TeamModel.updateTeam(teamId, newName, userId);

		LiveSync.teamAllChanged(teamId);

		// Notify other team members
		NotificationModel.notifyTeam(teamId, 'notification', 'Team updated', `The team ${newName} changed.`, teamId);

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
	},

};

module.exports = TeamController;
